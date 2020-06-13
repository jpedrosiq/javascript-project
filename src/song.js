export const beatsPerMeasure = 8;

import songIntro from "./songs/song_intro";
import songVerse from "./songs/song_verse_1";
import songChorus from "./songs/song_chorus_1";
import songSolo from "./songs/song_solo_1";

export const songNotes = songIntro.concat(
    songVerse,
    songChorus,
    songSolo
);