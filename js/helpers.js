function checkIfBump(col, row, level){
    const tileType = level[col][row];
    const carBumpTiles = [1, 2, 3]
    if (carBumpTiles.indexOf(tileType) > -1) {
        return true;
    } 
    return false;
}

function getDirection(col, row, steps) {
    if (this.steps.length > 0 && this.minSteps >= this.steps.length) {
        return false;
    }
    if (this.count > 1000000) { return false} else {this.count++}
    // console.log('length  ',this.steps.length)
    // it's mean that we found faster way 
    if (this.steps.length > 0 && this.steps.length <= steps.length) {
        // console.log('out')
        return false;
    }
    if (this.currentLevel[col][row] === 4) {
        return true
    }
    if (checkIfBump(col, row, this.currentLevel)) {

        return false;
    }
    const keyStep = `${col} ${row}`;    
    if (this.mapSteps.hasOwnProperty(keyStep)) {
        // console.log(keyStep, this.mapSteps)
        return this.mapSteps[keyStep];
    }
    let stepUp = steps.slice();
    let stepDown = steps.slice();
    let stepRight = steps.slice();
    let stepLeft = steps.slice();
    let result = false;
    this.mapSteps[keyStep] = false;
    if (!(row >= this.currentLevel[col].length) && steps.indexOf(`${col} ${row + 1}`) === -1) {
        
        stepRight.push(`${col} ${row + 1}`);
        const funcResult = this.getDirection(col, row + 1, stepRight)
        if (funcResult) {
            // console.log(stepRight)
            // console.log(this.steps.length)
            // console.log(stepRight.length)
            
            if (funcResult.length > 0) {
                stepRight = stepRight.concat(funcResult);
            }
            const knowPath = stepRight.slice(stepRight.indexOf(keyStep)+1)
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath;
                // console.log('jhkh', this.mapSteps[keyStep])
            }
            if (this.steps.length === 0 || this.steps.length > stepRight.length) {
                this.steps = stepRight.slice();
                result = true;
                console.log('found')
                console.log(this.steps)
                console.log('length  ',this.steps.length)
            }
        }
    }
    if (!(col >= this.currentLevel.length) && steps.indexOf(`${col + 1} ${row}`) === -1) {
        
        stepUp.push(`${col+1} ${row}`);
        const funcResult = this.getDirection(col +1, row, stepUp); 
        if (funcResult) {

            if (funcResult.length > 0) {
                stepUp = stepUp.concat(funcResult);
            }
            const knowPath = stepUp.slice(stepUp.indexOf(keyStep)+1);
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath;
            }
            if (this.steps.length === 0 || this.steps.length > stepUp.length) {
                this.steps = stepUp.slice();
                result = true;
                console.log('found')
                console.log(this.steps)
                console.log('length  ',this.steps.length)
            }
        }
    }

    if (!(col <= 0) && steps.indexOf(`${col -1} ${row}`) === -1) {
        
        stepDown.push( `${col - 1} ${row}`);
        const funcResult = this.getDirection(col - 1, row, stepDown)
        if(funcResult){
            if (funcResult.length > 0) {
                stepDown = stepDown.concat(funcResult);
            }
            
            const knowPath = stepDown.slice(stepDown.indexOf(keyStep)+1);
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath;
            }
            if (this.steps.length === 0 || this.steps.length > stepDown.length) {
                this.steps = stepDown.slice();
                result = true;
                console.log('found')
                console.log(this.steps)
                console.log('length  ',this.steps.length)
            }
        }
    }


    if (!(row <= 0) && steps.indexOf(`${col} ${row - 1}`) === -1) {
    
        stepLeft.push(`${col} ${row - 1}`);
        const funcResult = this.getDirection(col, row - 1, stepLeft);
        if (funcResult) {

            if (funcResult.length > 0) {
                stepLeft = stepLeft.concat(funcResult);
            }
            const knowPath = stepLeft.slice(stepLeft.indexOf(keyStep)+1);
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath
            }
            if (this.steps.length === 0 || this.steps.length > stepLeft.length) {
                this.steps = stepLeft.slice();
                result = true;
                console.log('found')
                console.log(this.steps)
                console.log('length  ',this.steps.length)
            }
        }
    }

    if(this.mapSteps[keyStep].length > 0) {
        return this.mapSteps[keyStep];
        
    }
    //It mean that in the current position it's not the goal
    return false;

}

function getDirectionBetter(col, row, steps, keyStepFunc) {
    if (this.steps.length > 0 && this.minSteps >= this.steps.length) {
        return false;
    }
    
    if (this.count > 1000000) { return false} else {this.count++}
    // console.log('length  ',this.steps.length)
    // it's mean that we found faster way 
    if (this.steps.length > 0 && this.steps.length <= steps.length) {
        // console.log('out')
        return false;
    }
    if (this.currentLevel[col][row] === 4) {
        return true
    }
    if (checkIfBump(col, row, this.currentLevel)) {

        return false;
    }

    const keyStep = keyStepFunc || `${col} ${row}`;    
    if (this.mapSteps.hasOwnProperty(keyStep)) {
        // console.log(keyStep, this.mapSteps)
        return this.mapSteps[keyStep];
    }
    
    let stepUp = steps.slice();
    let stepDown = steps.slice();
    let stepRight = steps.slice();
    let stepLeft = steps.slice();
    let result = false;
    this.mapSteps[keyStep] = false;
    if (!(row >= this.currentLevel[col].length) && steps.indexOf(`${col} ${row + 1}`) === -1) {
        const keyToFunc = `${col} ${row + 1} r`;
        stepRight.push(`${col} ${row + 1}`);
        const funcResult = this.getDirection(col, row + 1, stepRight, keyToFunc)
        if (funcResult) {
            // console.log(stepRight)
            // console.log(this.steps.length)
            // console.log(stepRight.length)
            
            if (funcResult.length > 0) {
                stepRight = stepRight.concat(funcResult);
            }
            const knowPath = stepRight.slice(stepRight.indexOf(`${col} ${row}`)+1)
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath;
                // console.log('jhkh', this.mapSteps[keyStep])
            }
            if (this.steps.length === 0 || this.steps.length > stepRight.length) {
                this.steps = stepRight.slice();
                result = true;
                // console.log('found')
                // console.log(this.steps)
                // console.log('length  ',this.steps.length)
            }
        }
    }
    if (row === 9) {
        console.log(col,' ', row)
        console.log(col >= this.currentLevel.length);
        console.log(steps)
        console.log(steps.indexOf(`${col + 1} ${row}`))
    }
    if (!(col >= this.currentLevel.length) && steps.indexOf(`${col + 1} ${row}`) === -1) {
        const keyToFunc = `${col + 1} ${row} u`;
        stepUp.push(`${col+1} ${row}`);
        const funcResult = this.getDirection(col +1, row, stepUp, keyToFunc); 
        if (row === 9) {
            console.log(keyStep, funcResult)
        }
        if (funcResult) {

            if (funcResult.length > 0) {
                stepUp = stepUp.concat(funcResult);
            }
            const knowPath = stepUp.slice(stepUp.indexOf(`${col} ${row}`)+1);
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath;
            }
            if (this.steps.length === 0 || this.steps.length > stepUp.length) {
                this.steps = stepUp.slice();
                result = true;
                // console.log('found')
                // console.log(this.steps)
                // console.log('length  ',this.steps.length)
            }
        }
    }

    if (!(col <= 0) && steps.indexOf(`${col -1} ${row}`) === -1) {
        const keyToFunc = `${col - 1} ${row} d`;
        stepDown.push( `${col - 1} ${row}`);
        const funcResult = this.getDirection(col - 1, row, stepDown, keyToFunc)
        if(funcResult){
            if (funcResult.length > 0) {
                stepDown = stepDown.concat(funcResult);
            }
            
            const knowPath = stepDown.slice(stepDown.indexOf(`${col} ${row}`)+1);
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath;
            }
            if (this.steps.length === 0 || this.steps.length > stepDown.length) {
                this.steps = stepDown.slice();
                result = true;
                // console.log('found')
                // console.log(this.steps)
                // console.log('length  ',this.steps.length)
            }
        }
    }


    if (!(row <= 0) && steps.indexOf(`${col} ${row - 1}`) === -1) {
        const keyToFunc = `${col} ${row - 1} l`;
        stepLeft.push(`${col} ${row - 1}`);
        const funcResult = this.getDirection(col, row - 1, stepLeft, keyToFunc);
        if (funcResult) {

            if (funcResult.length > 0) {
                stepLeft = stepLeft.concat(funcResult);
            }
            const knowPath = stepLeft.slice(stepLeft.indexOf(`${col} ${row}`)+1);
            if (!this.mapSteps[keyStep] || (this.mapSteps[keyStep].length >= knowPath.length)) {
                this.mapSteps[keyStep] = knowPath
            }
            if (this.steps.length === 0 || this.steps.length > stepLeft.length) {
                this.steps = stepLeft.slice();
                result = true;
                // console.log('found')
                // console.log(this.steps)
                // console.log('length  ',this.steps.length)
            }
        }
    }

    if(this.mapSteps[keyStep].length > 0) {
        return this.mapSteps[keyStep];
        
    }
    //It mean that in the current position it's not the goal
    return false;

}

function setNextMove() {
    const col = Math.floor(this.y / brickHeight);
    const row = Math.floor(this.x / brickWidth)
    const nextStepIdex = this.steps.indexOf(`${col} ${row}`);
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.arrowDown = false;
    if (nextStepIdex === -1 || this.steps.length === nextStepIdex +1) {
        return;
    }
    const nextStep = this.steps[nextStepIdex + 1].split(' ');
    const nextCol = nextStep[0];
    const nextRow = nextStep[1];
    const colDifference = nextCol - col;
    const rowDifference = nextRow - row;


    const angelDif = 0.02   ;
    //down
    if (colDifference === 1) {
        const angelDifference = (this.carAngel - Math.PI / 2) //- (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 3*Math.PI) {
                this.arrowRight = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowLeft = true;
            }
        }   
    }
    //up
    else if (colDifference === -1) {
        const angelDifference = (this.carAngel - 3 * Math.PI / 2) //- (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > Math.PI /2) {
                this.arrowRight = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowLeft = true;
            }
        }   
    }
    //Right
    if (rowDifference === 1) {
        const angelDifference = this.carAngel //- (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > Math.PI) {
                this.arrowRight = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowLeft = true;
            }
        }   
    }
    //Left
    else if (rowDifference === -1) {
        const angelDifference = (this.carAngel - Math.PI) //- (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 0) {
                this.arrowRight = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowLeft = true;
            }
        }   
    }
}




function setNextMoveGood() {
    const col = Math.floor(this.y / brickHeight);
    const row = Math.floor(this.x / brickWidth)
    const nextStepIdex = this.steps.indexOf(`${col} ${row}`);
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.arrowDown = false;
    if (nextStepIdex === -1 || this.steps.length === nextStepIdex +1) {
        return;
    }
    const nextStep = this.steps[nextStepIdex + 1].split(' ');
    const nextCol = nextStep[0];
    const nextRow = nextStep[1];
    const colDifference = nextCol - col;
    const rowDifference = nextRow - row;


    const angelDif = 0.02;
    //down
    if (colDifference === 1) {
        const angelDifference = this.carAngel - Math.PI / 2;
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 0) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
    //up
    else if (colDifference === -1) {
        const angelDifference = this.carAngel - 3 * Math.PI / 2;
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 0) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
    //Right
    if (rowDifference === 1) {
        const angelDifference = this.carAngel;
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 0) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
    //Left
    else if (rowDifference === -1) {
        const angelDifference = this.carAngel + Math.PI ;
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 0) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
}







function setNextMoveAlmostPerfect() {
    const col = Math.floor(this.y / brickHeight);
    const row = Math.floor(this.x / brickWidth)
    const nextStepIdex = this.steps.indexOf(`${col} ${row}`);
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.arrowDown = false;
    if (nextStepIdex === -1 || this.steps.length === nextStepIdex +1) {
        return;
    }
    const nextStep = this.steps[nextStepIdex + 1].split(' ');
    const nextCol = nextStep[0];
    const nextRow = nextStep[1];
    const colDifference = nextCol - col;
    const rowDifference = nextRow - row;


    const angelDif = 0.02   ;
    //down
    if (colDifference === 1) {
        const angelDifference = (this.carAngel - Math.PI / 2) - (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 3*Math.PI) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
    //up
    else if (colDifference === -1) {
        const angelDifference = (this.carAngel - 3 * Math.PI / 2) - (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > Math.PI /2) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
    //Right
    if (rowDifference === 1) {
        const angelDifference = this.carAngel - (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > Math.PI) {
                // console.log('sadasdasdasd')
                this.arrowRight = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowLeft = true;
            }
        }   
    }
    //Left
    else if (rowDifference === -1) {
        const angelDifference = (this.carAngel - Math.PI) - (Math.floor((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        console.log(this.carAngel, 'carAngel')
        console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (angelDifference > 0) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
}




function setNextMoveOneStepBefore() {
    const col = Math.floor(this.y / brickHeight);
    const row = Math.floor(this.x / brickWidth)
    const nextStepIdex = this.steps.indexOf(`${col} ${row}`);
    this.arrowUp = false;
    this.arrowLeft = false;
    this.arrowRight = false;
    this.arrowDown = false;
    if (nextStepIdex === -1 || this.steps.length === nextStepIdex +1) {
        return;
    }
    const nextStep = this.steps[nextStepIdex + 1].split(' ');
    const nextCol = nextStep[0];
    const nextRow = nextStep[1];
    const colDifference = nextCol - col;
    const rowDifference = nextRow - row;


    const angelDif = 0.02   ;
    //down
    let carAngelInDegrees = ((this.carAngel / Math.PI) * 180 );
    if (carAngelInDegrees > 0) {
        // console.log(Math.trunc(carAngelInDegrees / 360) * 360,'Math.floor(carAngelInDegrees / 360) * 360')
        carAngelInDegrees -= Math.trunc(carAngelInDegrees / 360) * 360
    }
    else {
        // console.log(carAngelInDegrees, 'carAngelInDegrees222222 before')
        carAngelInDegrees += (Math.abs(Math.trunc(carAngelInDegrees / 360)) +1) * 360
        // console.log(carAngelInDegrees, 'carAngelInDegrees222222 after')
    }

    const carAngel = this.carAngel;
    if (this.carAngel < 0) {
        console.log('negative')
        this.carAngel = ( numberOfCirceles + 1 ) * 2*Math.PI
    }
    // console.log(carAngelInDegrees, 'carAngelInDegrees222222')
    console.log(this.carAngel, 'this.carAngel')
    if (colDifference === 1) {
        const angelDifference = (this.carAngel - Math.PI / 2) - (Math.trunc((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        // console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (carAngelInDegrees >= 270) {
                this.arrowRight = true;
            }
            else if (carAngelInDegrees >= 90){
                //TODO need to  check what i need lkeft or right 
                this.arrowLeft = true;
            }
            else {
                this.arrowRight = true;
            }
        }   
    }
    //up
    else if (colDifference === -1) {
        const angelDifference = (this.carAngel - 3 * Math.PI / 2) - (Math.trunc((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        // console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > -angelDif) {
            this.arrowUp = true;
        }
        else {
            if (carAngelInDegrees >= 270) {
                this.arrowLeft = true;
            }
            else if (carAngelInDegrees >= 90){
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
            else {
                this.arrowLeft = true;
            }
        }   
    }
    //Right
    if (rowDifference === 1) {
        const angelDifference = this.carAngel - (Math.trunc((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        // console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (carAngelInDegrees >= 180) {
                // console.log('sadasdasdasd')
                this.arrowRight = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowLeft = true;
            }
        }   
    }
    //Left
    else if (rowDifference === -1) {
        const angelDifference = (this.carAngel - Math.PI) - (Math.trunc((this.carAngel) /(2*Math.PI)) * 2*Math.PI);
        // console.log(this.carAngel, 'carAngel')
        // console.log(angelDifference,'angelDifference')
        if (angelDifference < angelDif && angelDifference > - angelDif) {
            this.arrowUp = true;
        }
        else {
            if (carAngelInDegrees > 180) {
                this.arrowLeft = true;
            }
            else {
                //TODO need to  check what i need lkeft or right 
                this.arrowRight = true;
            }
        }   
    }
}