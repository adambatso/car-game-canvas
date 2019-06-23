const CAR_INCREASE_POWER = 0.5;
const CAR_REVERS_POWER = 0.3;
const CAR_INCREASE_ANGEL = 0.03;
const CAR_DOWN_POWER = 0.9;

class CarPlayer {
    constructor(name,isPlayer,carImageElement,xStart,yStart,arrows) {
        this.name = name;
        this.isPlayer = isPlayer;
        this.carImageElement = carImageElement;
        this.x = xStart;
        this.y = yStart;
        this.up = arrows['up'];
        this.down = arrows['down'];
        this.right = arrows['right'];
        this.left = arrows['left'];
        this.init();
        this.onKeyPress = this.onKeyPress.bind(this);
        this.releaseKey = this.releaseKey.bind(this);
        //this is for listent to key event for each player 
        canvas.addEventListener('keydown', this.onKeyPress);
        canvas.addEventListener('keyup', this.releaseKey);

    }
    init(){
        this.carSpeed = 0;
        this.carAngel = - Math.PI / 2;
        this.arrowUp = this.arrowDown = this.arrowRight = this.arrowLeft = false;
    }
    draw() {
        //TODO:: need to get it ,it's should be singletone
        canvasApi.drawBitmapCenteredWithRotation(this.carImageElement, this.x, this.y, this.carAngel    );
    }
    move() {
        this.carSpeed *= CAR_DOWN_POWER;
        if (this.arrowUp) {
            this.carSpeed += CAR_INCREASE_POWER;
        }
        if (this.arrowDown) {
            this.carSpeed -= CAR_REVERS_POWER;
        }
        if (this.arrowRight) {
            this.carAngel += CAR_INCREASE_ANGEL;
        }
        if (this.arrowLeft) {
            this.carAngel -= CAR_INCREASE_ANGEL;
        }
        this.x += Math.cos(this.carAngel) * this.carSpeed;
        this.y += Math.sin(this.carAngel) * this.carSpeed;
    
    }
    onKeyPress(evt) {
        switch(evt.key) {
            case this.up :
                this.arrowUp = true;
                break;
            case this.down :
                this.arrowDown = true;
                break;
            case this.right :
                this.arrowRight = true;
                break;
            case this.left:
                this.arrowLeft = true
                break;
        }
    
    }
    releaseKey(evt) {
        switch(evt.key) {
            case this.up :
                this.arrowUp = false;
                break;
            case this.down :
            this.arrowDown = false;
                break;
            case this.right :
            this.arrowRight = false;
                break;
            case this.left:
            this.arrowLeft = false
                break;
        }
        console.log(evt);
        console.log(evt.keyCode)
    
    }
    
    
} 
