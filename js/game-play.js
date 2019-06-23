class GamePlay {
    

    constructor(ImageUtilsInstace) {
        this.levels = new Levels();
        this.imagesMap = {
            0: 'track_road.png',
            1: 'track_wall.png',
            2: 'track_flag.png',
            3: 'track_tree.png',
            4: 'track_goal.png'
        }
        this.carBumpTiles = [1, 2, 3];
        this.ImageUtils = ImageUtilsInstace;
        const playerOneController = {
            up: 'ArrowUp',
            down: 'ArrowDown',
            right: 'ArrowRight',
            left: 'ArrowLeft',
        }

        this.brickTextUpdate = this.brickTextUpdate.bind(this);
        this.drawGame = this.drawGame.bind(this);
        this.playerOne = new CarPlayer('adam', true,this.ImageUtils.imagesElements['player1car.png'],0,0, playerOneController)
        this.playerComputer = new CarComputer('comp', false,this.ImageUtils.imagesElements['car.png'],0,0, this.levels.currentLevel)
        this.mouseXPosition = 0;
        this.mouseYPosition = 0;
        window.document.addEventListener('mousemove', this.brickTextUpdate);
        this.initGame();
    };

    drawGame() {
        this.moveAll();
     
        this.checkCollision();
        //TODO:: need to fix this that if there is a collision we need
        this.checkCollisionComp();
        this.drawAll();
    }

    moveAll() {
        this.playerOne.move();
        this.playerComputer.move();
    }

    drawAll() {
        this.drawTiles();
        this.playerOne.draw();
        this.playerComputer.draw();
        this.drawColRowText();
    }

    drawTiles() {
        for (let col = 0; col < this.levels.currentLevel.length; col++) {
            for ( let row = 0; row < this.levels.currentLevel[col].length; row++) {
                const imageX = row * brickWidth;
                const imageY = col * brickHeight;
                if (this.imagesMap.hasOwnProperty(this.levels.currentLevel[col][row])) {
                    const imageKey = this.imagesMap[this.levels.currentLevel[col][row]];
                    canvasContext.drawImage(this.ImageUtils.imagesElements[imageKey], imageX, imageY);
                }
                
            }
        }
    }
    checkCollision() {
        const row = Math.floor(this.playerOne.x / brickWidth);
        const col = Math.floor(this.playerOne.y / brickHeight);
        //It's mean that there is a grid that need to break
        //TODO fix that
        if (this._checkIfBump(col, row)) {
            this.playerOne.x -= Math.cos(this.playerOne.carAngel) * this.playerOne.carSpeed;
            this.playerOne.y -= Math.sin(this.playerOne.carAngel) * this.playerOne.carSpeed;
            this.playerOne.carSpeed = this.playerOne.carSpeed * -0.5;

        }
        else if(this.levels.currentLevel[col][row] === 4) {
            if(this.levels.nextLevel()) {
                this.initGame();
            }
            //TODO:: need to go to the main menu
            else {
                console.log('weqweqwe')
                this.levels.currentLevelIndex = 0;
                this.levels.initLevel();
                this.initGame();
            }
        }
    
    }

    checkCollisionComp() {
        const row = Math.floor(this.playerComputer.x / brickWidth);
        const col = Math.floor(this.playerComputer.y / brickHeight);
        //It's mean that there is a grid that need to break
        //TODO fix that
        if (this._checkIfBump(col, row)) {
            
            this.playerComputer.x -= Math.cos(this.playerComputer.carAngel) * this.playerComputer.carSpeed;
            this.playerComputer.y -= Math.sin(this.playerComputer.carAngel) * this.playerComputer.carSpeed;
            this.playerComputer.carSpeed = this.playerComputer.carSpeed * -0.5;
            this.playerComputer.collied = true; 
        }
        else if(this.levels.currentLevel[col][row] === 4) {
            if(this.levels.nextLevel()) {
                this.initGame();
            }
            //TODO:: need to go to the main menu
            else {
                console.log('weqweqwe')
                this.levels.currentLevelIndex = 0;
                this.levels.initLevel();
                this.initGame();
            }
        }
    
    }
    _checkIfBump(col, row){
        const tileType = this.levels.currentLevel[col][row];
        if (this.carBumpTiles.indexOf(tileType) > -1) {
            return true;
        } 
        return false;
    }
    initGame() {
        let computerRow =null;
        let computerCol = null;
        let winRow = null;
        let winCol = null
        for (let col = 0; col < this.levels.currentLevel.length; col++) {
            for ( let row = 0; row < this.levels.currentLevel[col].length; row++) {
                if (this.levels.currentLevel[col][row] === 5){
                    this.playerOne.x = row * brickWidth + brickWidth / 2 ;
                    this.playerOne.y = col * brickHeight + brickHeight / 2;
                    this.playerOne.init();
                    this.levels.currentLevel[col][row] = 0;
                }
                else if (this.levels.currentLevel[col][row] === 6){
                    this.playerComputer.x = row * brickWidth + brickWidth / 2 ;
                    this.playerComputer.y = col * brickHeight + brickHeight / 2;
                    console.log(`computer ${ col }, ${ row}`)
                    computerRow = row;
                    computerCol = col;
                    this.levels.currentLevel[col][row] = 0;
                    
                }
                else if (this.levels.currentLevel[col][row] === 4) {
                    console.log(`winnnn ${ col }, ${ row}`)
                    winCol = col;
                    winRow = row
                }
            }
        }
        if (computerCol !== null && winCol !== null) {
            this.playerComputer.currentLevel = this.levels.currentLevel;
            this.playerComputer.init(computerCol, computerRow, winCol, winRow);
            
        }
    }

    brickTextUpdate(evt) {
        const mouseX = evt.clientX;
        const mousey = evt.clientY;

        const rect = canvas.getBoundingClientRect();
        const doc = document.documentElement;
        
        const xPotion = mouseX - rect.left - doc.scrollLeft;
        const yPotion = mousey- rect.top - doc.scrollTop;
        
        this.mouseXPosition = xPotion;
        this.mouseYPosition = yPotion;
    } 
    drawColRowText() {
        const row = Math.floor(this.mouseXPosition / brickWidth);
        const col = Math.floor(this.mouseYPosition / brickHeight);
        
        canvasApi.drawText(col + ', ' + row, this.mouseXPosition, this.mouseYPosition, 'yellow')
    }
}