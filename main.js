
var ballX = 400;
var ballY = 400;
var ballSpeedX = 5; //TODO:: return to 5
var ballSpeedY = 7; //TODO:: return to 7
var cardSpeed = 0;
var cardAngel = - Math.PI /2;
var mouseXPosition = 0;
var mouseYPosition = 0; 
const brickGap = 2;
const brickHeightGap = 100;
const brickWidth = 40;
const brickHeight = 40;
var brickGrid = [];
var numberOfColumns = null;
var numberOfRows = null;
var firstColumn = 0
const paddleWidth = 100;
const paddleThickness = 10;
let paddleX = 400; //the center of the canvas

var canvasApi = null;
const imagesMap = {
    0: 'track_road.png',
    1: 'track_wall.png',
    2: 'track_flag.png',
    3: 'track_tree.png',
    4: 'track_goal.png'
}
const phaseStracture = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,2,2,3,3,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,1],
            [1,0,6,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
            [1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
            [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            ]
const drawGame = () => {
    moveAll();
 
    checkBallCollision(ballX, ballY);
    drawAll(canvas, canvasContext);
}

function moveAll() {
    playerOne.move();

}

function drawAll(canvas,canvasContext) {
	// canvasApi.drawReactangle(0,0, canvas.width,canvas.height, 'black'); // clear screen
    drawTiles();
    playerOne.draw();
    
    // drawBricks();
    

    const row = Math.floor(mouseXPosition / brickWidth);
    const col = Math.floor(mouseYPosition / brickHeight);
    canvasApi.drawText(row + ', ' + col, mouseXPosition, mouseYPosition, 'yellow')
    

}

function drawTiles() {
    for (let col = 0; col < numberOfColumns; col++) {
        for ( let row = 0; row < numberOfRows; row++) {
            const imageX = row * brickWidth;
            const imageY = col * brickHeight;
            if (imagesMap.hasOwnProperty(currentLevel[col][row])) {
                const imageKey = imagesMap[currentLevel[col][row]];
                canvasContext.drawImage(ImageUtils.getInstace().imagesElements[imageKey], imageX, imageY);
            }
            
        }
    }
}

let canvas;
let canvasContext;
let numberOfImages = null;
var loadingProgress = null;
window.onload = () => {
    canvas = document.getElementById('canvas-ball-game');
    canvasContext = canvas.getContext('2d');
    canvasApi = new CommonGraphicApi(canvasContext);


    const height = canvas.height; 
    const width = canvas.width;
    ImageUtils.getInstace().onLoadCallback = onLoadCallback;
    numberOfImages = ImageUtils.getInstace().numerOfImagesToLoad;
    ImageUtils.getInstace().loadImages(startGame);
    loadingProgress = new ProgressLoading(200, canvas.height / 2, 400, 40, 100,0,'white','blue');

    loadingProgress.drawLoading();
}

function onLoadCallback(numberOfImagesLeft) {
    const currentPresentage = ((numberOfImages - numberOfImagesLeft) * 100) / numberOfImages;
    
    loadingProgress.currentPresentage = currentPresentage;
}

var currentLevel = [];
var playerOne = null;

function startGame() {
    const framesPerSecond = 60;
    // carPic.onload = function() {
	// 	carPicLoaded = true;
	// }
    // carPic.src = "./images/player1car.png";
    // carPic.width = 35;
    // carPic.height = 35;
    playerOneController = {
        up: 'ArrowUp',
        down: 'ArrowDown',
        right: 'ArrowRight',
        left: 'ArrowLeft',
    }
    currentLevel = phaseStracture.slice();
    playerOne = new CarPlayer('adam', true,ImageUtils.getInstace().imagesElements['player1car.png'],0,0, playerOneController)
    console.log(playerOne)
    numberOfRows = phaseStracture[0].length; //TODO:: need to check it
    numberOfColumns = phaseStracture.length;
    resetBrickGrid();
    canvas.style.outline = "none";
    canvas.tabIndex = 1000;
    canvas.focus();
    const game = new GamePlay(ImageUtils.getInstace());
    setInterval(game.drawGame, 1000/framesPerSecond);
}

var loadingHeight = 38;
var maxHeight = false;

resetBrickGrid = () => {
    for (let col = 0; col < numberOfColumns; col++) {
        brickGrid.push([]);
        for ( let row = 0; row < numberOfRows; row++) {
            if (phaseStracture[col][row] === 1){
                brickGrid[col].push(true);
            }
            else if (phaseStracture[col][row] === 5){
                playerOne.x = row * brickWidth + brickWidth / 2 ;
                playerOne.y = col * brickHeight + brickHeight / 2;
                currentLevel[col][row] = 0;
                brickGrid[col].push(false);
            }
            else {
                brickGrid[col].push(false);
            }
        }
    }
}

drawBricks = () => {
    for (let col = 0; col < numberOfColumns; col++) {
        for ( let row = 0; row < numberOfRows; row++) {
            if (brickGrid[col][row]) {
                canvasApi.drawReactangle(brickWidth * row, brickHeight * col, brickWidth - brickGap, brickHeight - brickGap, 'blue');
            }
        }
    }
}

getRow = (x) => {
    const row = Math.floor(x / brickWidth);
    if (row < 0 || row >= numberOfRows) {
        return false;
    }
    console.log(numberOfRows)
    return row;
}
getCol = (y) => {
    const col = Math.floor(y / brickHeight);
    console.log(numberOfColumns);
    // it's mean that the ball hit the edage column
    if (col >= numberOfColumns && col < firstColumn) {
        return false
    }
    return col;
}
checkBallCollision = () => {
    const row = Math.floor(playerOne.x / brickWidth);
    const col = Math.floor(playerOne.y / brickHeight);
    //It's mean that there is a grid that need to break
    //TODO fix that
    if (brickGrid[col] && brickGrid[col][row]) {

        playerOne.x -= Math.cos(playerOne.carAngel) * playerOne.carSpeed;
        playerOne.y -= Math.sin(playerOne.carAngel) * playerOne.carSpeed;
        console.log('ballx ', ballX, 'ballY ', ballY)
        playerOne.carSpeed = playerOne.carSpeed * -0.5;
        // console.log('prev ',prevCol, ' , ' ,prevRow );
        // brickGrid[col][row] = false; //TODO need to check
    } 

}
updatePaddle = (evt) => {
    const mouseX = evt.clientX;
    const mousey = evt.clientY;
    // ballX = mouseX; //TODO:: remove this 
    // ballY = mousey;
    const rect = canvas.getBoundingClientRect();
    const doc = document.documentElement;
    const mouseXtoMove = mouseX - rect.left - doc.scrollLeft - (paddleWidth / 2);
    const xPotion = mouseX - rect.left - doc.scrollLeft;
    const yPotion = mousey- rect.top - doc.scrollTop;
    const paddleXOutOfRightBounds = xPotion + (paddleWidth / 2);
    const paddleXOutFromLeft = xPotion - (paddleWidth /2);
    if (paddleXOutOfRightBounds <= canvas.width && paddleXOutFromLeft >= 0) {
        paddleX = mouseXtoMove;
    }
    mouseXPosition = xPotion;
    mouseYPosition = yPotion;
} 
