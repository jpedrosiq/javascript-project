class Key {

    constructor() {
        this._pressed = {};
        this._pressedVisual = {};
        this.pos = {
            1: 65,
            2: 83,
            3: 74,
            4: 75,
            5: 76
        };
        this.A = 65;
        this.S = 83;
        this.J = 74;
        this.K = 75;
        this.L = 76;
        
        this.addKeyListeners();
    }

    onKeyDown(e) {
        this._pressed[e.keyCode] = true;
        this._pressedVisual[e.keyCode] = true;
    }

    onKeyUp(e) {
        delete this._pressedVisual[e.keyCode];
        let buffer = 300;   // CHANGE IT TO TEST IT 
        setTimeout( () => {
            delete this._pressed[e.keyCode];
        }, buffer);
    }

    addKeyListeners() {
        window.addEventListener("keydown", (e) => {
            this.onKeyDown(e);
            //keydown is fired whenever a key is pressed down
        });
        window.addEventListener("keyup", (e) => {
            this.onKeyUp(e);
            //keyup is fired whenever a key is released
        });
    }

    isDown(keyCode) {
        return this._pressed[keyCode];
    }

    isDownVisual(keyCode) {
        return this._pressedVisual[keyCode];
    }

}

export default Key;