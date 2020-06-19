# Guitar Legend

Guitar Legend is a game based on the popular videogame Guitar Hero, where the player must hit the right keys on the keyboard at the right time according to the notes being displayed. Every successful note hit, gives the player points, and these can be multiplied based on the player's note streak. This app was created using JavaScript and the Three.js library. 

## Live site demo
* Demo: [Live Demo](https://jpedrosiq.github.io/)

## Technologies
* Vanilla JavaScript for game logic 
* Webpack for compiling JavaScript modules
* Three.js library for all 3D animations throughout the game
* AWS S3 for storing the song file

## Features
* Play song on keyboard by pressing the right keys at the right timing
* Display player's current streak, along with the maximum streak 
* Get bonus score multiplier based on player's note streak 
* Display Rock Meter, allowing players to see their progress

## Displaying current and maximum streak

* Every time the player hits the note at the right time, their streak is accumulated and displayed.

### Code snippet for this feature
```javascript
    // on game_notes.js file

     checkNote(songNote) {
        if (this.key.isDown(this.key.pos[songNote.pos])) {

            this.score += 100 * Number(this.multiplier);
            this.hits += 1;
            this.streak += 1;
            if (this.rockInput < 20) {
                this.rockInput += 1;
            }

        } else {
            this.streak = 0;
            this.misses += 1;
            this.multiplier = 1;
            if (this.rockInput > -20) {
                this.rockInput -= 1;
            }
            if (this.rockInput < -10) {
                this.gameProgressEl.className = "game-progress red";
                setTimeout(() => {this.gameProgressEl.className = "game-progress";}, 75);
            }
        }

        if (this.rockInput > 19) {
            this.gameProgressEl.className = "game-progress green";
        } else if (this.rockInput > 10) {
            this.gameProgressEl.className = "game-progress yellow";
        } else if (this.rockInput > -10 && this.rockInput < 10) {
            this.gameProgressEl.className = "game-progress";
        }

        // getting max streak
        if (this.streak > this.maxStreak) {
            this.maxStreak = this.streak;
        }

        this.totalNotes += 1;

        this.scoreEl.innerHTML = `Score: ${this.score}`;
        this.maxStreakEl.innerHTML = `Max Streak: ${this.maxStreak}`;
        this.streakEl.innerHTML = `Streak: ${this.streak}`;

    } 

```

## Song notes creation
* Each note was implemented on the code based on the measure(m), beat(t) and position(pos). For the specific song, the amount of beats per measure used was 8bpm. Every position depends on the beat to check if the game note will match the song note.
* Beyond that, an optional key "hold" was implemented, in case there is a long note that needs to keep the key pressed for a while. 

### Code snippet for this feature

```javascript
// on song_intro.js file

    export default [

  {m:2, t: 8, pos: 1 },
  
  {m:3, t: 1, pos: 2 },
  {m:3, t: 2, pos: 1, hold: 4 },
  {m:3, t: 7, pos: 1 },
  {m:3, t: 8, pos: 2 },

  {m:4, t: 1, pos: 3 },
  {m:4, t: 2, pos: 2, hold: 4},
  {m:4, t: 5, pos: 2},
  {m:4, t: 6, pos: 1, hold: 4},

  {m:5, t: 1.5, pos: 1},
  {m:5, t: 2, pos: 2},
  {m:5, t: 2.5, pos: 3},
  {m:5, t: 3, pos: 2, hold: 4},
  {m:5, t: 7.5, pos: 1 },
  {m:5, t: 8, pos: 2 },
  {m:5, t: 8.5, pos: 3 },

];

```

## Challenges faced and how it was fixed

## Explaining the problem
* Having an accurate note hit according to the music is fundamental for the game, so having delays can be a problem. 
* It was noticed that after the note was hit, even if displayed in canvas according to the right song note, the score was not being increased, meaning that the note was not successfully hit. The issue was the delay between the act of pressing the key at the time the note was being displayed.

## Solving the problem
* For the function setNoteCheck, it was added a number in milliseconds, to correct the timing between the key being pressed and the note displayed to be hit.
* After trial and error, random numbers were added to the variable timeDelay, and after checking multiple times, the most accurate time to add reached was 0.5 seconds, or 500 milliseconds.

## Code snipped for the solution

```javascript
    // on game_notes.js

    setNoteCheck(songNote, time) {
        let timeDelay = 500 + this.musicDelay + time;

        setTimeout(
            () => this.checkNote(songNote),
            timeDelay
        );
    }

```
