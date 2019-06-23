
class CarComputer {
    constructor(name,isPlayer,carImageElement,xStart,yStart,currentLevel) {
        carImageElement.width = 32;
        carImageElement.height = 32;
        this.name = name;
        this.isPlayer = false;
        this.carImageElement = carImageElement;
        this.x = xStart;
        this.y = yStart;
        this.steps = [];
        this.getDirection = this.getDirection.bind(this)
        // this.init();
        this.count = 0;
        this.currentLevel = currentLevel;
        this.mapSteps = {};
        //this is for listent to key event for each player 
    
        // this.CAR_DOWN_POWER = 0.80
        // this.CAR_INCREASE_POWER = 0.7
        // this.CAR_REVERS_POWER = 0.15
        // this.CAR_INCREASE_ANGEL = 0.03

        // this.CAR_DOWN_POWER = 0.85
        // this.CAR_INCREASE_POWER = 0.75
        // this.CAR_REVERS_POWER = 0.15
        // this.CAR_INCREASE_ANGEL = 0.03

        this.CAR_DOWN_POWER = 0.85
        this.CAR_INCREASE_POWER = 0.75
        this.CAR_REVERS_POWER = 0.15
        this.CAR_INCREASE_ANGEL = 0.03

    }
    init(col,row, winCol, winRow){
        this.carSpeed = 0;
        this.carAngel = 3 * Math.PI / 2;
        this.winCol = winCol;
        this.winRow = winRow;
        this.minSteps = Math.abs(col - winCol) + Math.abs(row - winRow);
        this.steps = [];
        this.getDirection(col, row, this.steps);
        this.steps.unshift(`${col} ${row}`)
        this.collied = false;
        console.log(this.count)
        console.log(this.steps)
        console.log(this.mapSteps)
    }
    draw() {
        //TODO:: need to get it ,it's should be singletone
        canvasApi.drawBitmapCenteredWithRotation(this.carImageElement, this.x, this.y, this.carAngel);
    }
    move() {
        this.setNextMove()
        this.carSpeed *= this.CAR_DOWN_POWER;
        if (this.arrowUp) {
            this.carSpeed += this.CAR_INCREASE_POWER;
        }
        if (this.arrowDown) {
            this.carSpeed -= this.CAR_REVERS_POWER;
        }
        if (this.arrowRight) {
            this.carAngel += this.CAR_INCREASE_ANGEL;
        }
        if (this.arrowLeft) {
            this.carAngel -= this.CAR_INCREASE_ANGEL;
        }
        this.x += Math.cos(this.carAngel) * this.carSpeed;
        this.y += Math.sin(this.carAngel) * this.carSpeed;
    
    }

    //TODO:: if there was a collision we need to save the collision tile and then we need to change the direction we can do it by forsing the car to do a direction that we need 
    // we need to do it until we finish to move 
    setNextMove() {
        const col = Math.floor(this.y / brickHeight);
        const row = Math.floor(this.x / brickWidth)
        const nextStepIndex = this.steps.indexOf(`${col} ${row}`);
        this.arrowUp = false;
        this.arrowLeft = false;
        this.arrowRight = false;
        this.arrowDown = false;

        if (this.collied) {
            console.log('in collied')
            this.collied =false;
            this.lastRowCollision = row;
            this.lastColCollision = col;
            this.steps = [];
            this.count = 0;
            this.minSteps = Math.abs(col - this.winCol) + Math.abs(row - this.winRow);
            console.log(col,' ', row)
            console.log(this.mapSteps);
            this.getDirection(col, row , this.steps)
            console.log(this.steps, 'check')
        }
        // if (this.nextRow && this.nextCol && row === this.nextRow && this.nextCol === col) {
            if (nextStepIndex === -1 || this.steps.length === nextStepIndex +1) {
                console.log(col,row)
                            //TODO need to fix get direction function
                            if (this.mapSteps.hasOwnProperty(`${col} ${row}`)) {
                                
                                this.steps = this.mapSteps[`${col} ${row}`];
                                this.steps.unshift(`${col} ${row}`);
                                console.log('mapsteppp found', this.steps);
                                return;
                            }
                            this.steps = [];
                            console.log('here');
                            this.getDirection(col, row , this.steps)
                            console.log('after')
                            console.log(this.steps);
                            return;
                        }
        // }
    
        const nextStep = this.steps[nextStepIndex + 1].split(' ');
        const nextCol = nextStep[0];
        const nextRow = nextStep[1];
        const colDifference = nextCol - col;
        const rowDifference = nextRow - row;
    
        this.nextCol = nextCol;
        this.nextRow = nextRow;
    
        const angelDif = 0.02   ;
        //down
        let carAngelInDegrees = ((this.carAngel / Math.PI) * 180 );
        if (carAngelInDegrees > 0) {
            carAngelInDegrees -= Math.trunc(carAngelInDegrees / 360) * 360
        }
        else {
            carAngelInDegrees += (Math.abs(Math.trunc(carAngelInDegrees / 360)) +1) * 360
        }

        let carAngel = this.carAngel;
        if (this.carAngel < 0) {
            
            carAngel += (Math.abs(Math.trunc(carAngel / (2*Math.PI))) +1) * 2*Math.PI
        }
        
        //In case we have collection we need to take reverse 
        if (this.lastRowCollision === row && this.lastColCollision === col) {
            const angelDifference = (carAngel - Math.PI) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);

            if (angelDifference < angelDif && angelDifference > - angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees > 180) {
                    this.arrowLeft = true;
                }
                else {
                    this.arrowRight = true;
                }
            }   
            return;
            
        }
        //diagonal right down
        if (colDifference === 1 && rowDifference === 1) {
            
            const angelDifference = (carAngel - Math.PI / 4) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);
            
            if (angelDifference < angelDif && angelDifference > -angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees >= 225) {
                    this.arrowRight = true;
                }
                else if (carAngelInDegrees <= 45){
                    this.arrowRight = true;
                }
                else {
                    this.arrowLeft = true;
                }
            } 
           return; 
        }
        //diagnol right up
        else if (colDifference === -1 && rowDifference === 1) {
            
            const angelDifference = (carAngel - 7 * Math.PI / 4) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);
            
            if (angelDifference < angelDif && angelDifference > -angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees >= 315) {
                    this.arrowLeft = true;
                }
                else if (carAngelInDegrees >= 135){
                    this.arrowRight = true;
                }
                else {
                    this.arrowLeft = true;
                }
            } 
           return; 
        }
        //diagnol down left
        else if (colDifference === 1 && rowDifference === -1) {
            let angelDifference = (carAngel - 3 * Math.PI / 4) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);
            
            this.lastRowCollision = false;
            this.lastColCollision = false;
            if (angelDifference < angelDif && angelDifference > -angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees >= 315) {
                    this.arrowRight = true;
                }
                else if (carAngelInDegrees >= 135){
                    this.arrowLeft = true;
                }
                else {
                    this.arrowRight = true;
                }
            } 
            return;     
        
        
        
        }
        //diagnol up left
        else if (colDifference === -1 && rowDifference === -1) {
            
            const angelDifference = (carAngel - 5 * Math.PI / 4) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);
            
            if (angelDifference < angelDif && angelDifference > -angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees >= 225) {
                    this.arrowLeft = true;
                }
                else if (carAngelInDegrees >= 45){
                    this.arrowRight = true;
                }
                else {
                    this.arrowLeft = true;
                }
            } 
           return; 
        }
        //down
        if (colDifference === 1) {
            const angelDifference = (carAngel - Math.PI / 2) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);

            if (angelDifference < angelDif && angelDifference > -angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees >= 270) {
                    this.arrowRight = true;
                }
                else if (carAngelInDegrees >= 90){
                    this.arrowLeft = true;
                }
                else {
                    this.arrowRight = true;
                }
            }   
        }
        //up
        else if (colDifference === -1) {
            const angelDifference = (carAngel - 3 * Math.PI / 2) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);
            if (angelDifference < angelDif && angelDifference > -angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees >= 270) {
                    this.arrowLeft = true;
                }
                else if (carAngelInDegrees >= 90){
                    this.arrowRight = true;
                }
                else {
                    this.arrowLeft = true;
                }
            }   
        }
        //Right
        if (rowDifference === 1) {
            const angelDifference = carAngel - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);
            if (angelDifference < angelDif && angelDifference > - angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees >= 180) {
                    this.arrowRight = true;
                }
                else {
                    this.arrowLeft = true;
                }
            }   
        }
        //Left
        else if (rowDifference === -1) {
            const angelDifference = (carAngel - Math.PI) - (Math.trunc((carAngel) /(2*Math.PI)) * 2*Math.PI);

            if (angelDifference < angelDif && angelDifference > - angelDif) {
                this.arrowUp = true;
            }
            else {
                if (carAngelInDegrees > 180) {
                    this.arrowLeft = true;
                }
                else {
                    this.arrowRight = true;
                }
            }   
        }
        
    }

    getDirection(col, row, steps, keyStepFunc) {
        if (this.steps.length > 0 && this.minSteps >= this.steps.length) {
            console.log('minsteps',this.minSteps)
            return false;
        }
        
        if (this.count > 1000000) { return false} else {this.count++}
        
        // it's mean that we found faster way 
        if (this.steps.length > 0 && this.steps.length <= steps.length) {
            console.log('faster');
            return false;
        }
        if (this.currentLevel[col][row] === 4) {
            console.log('found')
            return true
        }
        if (checkIfBump(col, row, this.currentLevel)) {
            console.log('bump')
            return false;
        }

        const keyStep = keyStepFunc || `${col} ${row}`;    
        if (this.mapSteps.hasOwnProperty(keyStep)) {
            console.log('adssadsadasdas')
            console.log('keySte', keyStep)
            return this.mapSteps[keyStep];
        }
        
        this.mapSteps[keyStep] = false;
        if (!(row >= this.currentLevel[col].length)) {
            const nextKeyStep = `${col} ${row + 1} r`;
            const nextCol = col;
            const nextRow = row + 1;
            this.calculatePath(steps, `${col} ${row + 1}`, nextKeyStep, keyStep, col, row, nextCol, nextRow)

        }

        if (!(col >= this.currentLevel.length)) {
            const nextKeyStep = `${col + 1} ${row} u`;
            const nextCol = col + 1;
            const nextRow = row;
            this.calculatePath(steps, `${col + 1} ${row}`, nextKeyStep, keyStep, col, row, nextCol, nextRow)
        }

        if (!(col <= 0)) {
            const nextKeyStep = `${col - 1} ${row} d`;
            const nextCol = col - 1;
            const nextRow = row;
            this.calculatePath(steps, `${col -1} ${row}`, nextKeyStep, keyStep, col, row, nextCol, nextRow)
        }

    
        if (!(row <= 0)) {
            const nextKeyStep = `${col} ${row - 1} l`;
            const nextCol = col;
            const nextRow = row - 1;
            console.log(col, ' ', row, ' ', 'left', steps.length, ' this.stetps', this.steps.length);
            this.calculatePath(steps, `${col} ${row - 1}`, nextKeyStep, keyStep, col, row, nextCol, nextRow)
        }

        //TODO need to check last diagonal  
        if (!(col >= this.currentLevel.length) && !(row >= this.currentLevel[col].length)) {
            const nextKeyStep = `${col + 1} ${row + 1} dru`;
            const nextCol = col + 1;
            const nextRow = row + 1;
            this.calculatePath(steps, `${col + 1} ${row + 1}`, nextKeyStep, keyStep, col, row, nextCol, nextRow)

        }
        if (!(col <= 0) && !(row >= this.currentLevel[col].length)) {
            const nextKeyStep = `${col - 1} ${row + 1} drd`;
            const nextCol = col - 1;
            const nextRow = row + 1;
            this.calculatePath(steps, `${col - 1} ${row + 1}`, nextKeyStep, keyStep, col, row, nextCol, nextRow)

        }
        if (!(col >= this.currentLevel.length) && !(row <= 0)) {
            const nextKeyStep = `${col + 1} ${row - 1} dld`;
            const nextCol = col + 1;
            const nextRow = row - 1;
            this.calculatePath(steps, `${col + 1} ${row - 1}`, nextKeyStep, keyStep, col, row, nextCol, nextRow)

        }
        
        if(this.mapSteps[keyStep].length > 0) {
            return this.mapSteps[keyStep];
            
        }
        //It mean that in the current position it's not the goal
        return false;

    }

    calculatePath(steps, nextStepKey, nextKeyStep, keyStep, col, row, nextCol, nextRow) {
        if (steps.indexOf(nextStepKey) === -1) {
            let stepDirection = steps.slice();
            stepDirection.push(nextStepKey);
            const funcResult = this.getDirection(nextCol, nextRow, stepDirection, nextKeyStep); 
           
            if (funcResult) {

                if (funcResult.length > 0) {
                    stepDirection = stepDirection.concat(funcResult);
                }
                const knowPath = stepDirection.slice(stepDirection.indexOf(`${col} ${row}`)+1);
                if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                    this.mapSteps[keyStep] = knowPath;
                }
                if (this.steps.length === 0 || this.steps.length > stepDirection.length) {
                    this.steps = stepDirection.slice();
                    // console.log('found')
                    // console.log(this.steps)
                    // console.log('length  ',this.steps.length)
                }
            }
        }
    }
   
} 
