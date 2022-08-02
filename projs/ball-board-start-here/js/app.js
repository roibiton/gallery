var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var GLUE = 'GLUE'
var isGlue = false

var audioPop = new Audio('sound/pop.wav');
var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
// var GLUE_IMG = '<img src="img/glue.png" />';
var GLUE_IMG = '🧪';

var gInterval;
var gBoard;
var gGamerPos;
var counter = 0
var gLastGLuePos;
var gBtn = document.querySelector(".btn")
function initGame() {
    gGamerPos = { i: 2, j: 9 };
    gBoard = buildBoard();
    renderBoard(gBoard);
    getEmptyCells(gBoard)
    // gBtn.style.display = 'none'
    counter = 0
    gInterval = setInterval(addBall, 5000)
}

function addBall() {


    var emptyCellsArray = getEmptyCells()
    var num = getRandomInt(emptyCellsArray.length)
    if (emptyCellsArray.length === (gBoard[0].length - 2) * (gBoard.length - 2) - 1) {
        clearInterval(gInterval)

        gBtn.style.display = 'block'
    }
    var locationIToAdd = emptyCellsArray[num].i
    var locationjToAdd = emptyCellsArray[num].j
    var pos = { i: locationIToAdd, j: locationjToAdd }
    gBoard[locationIToAdd][locationjToAdd].gameElement = BALL
    renderCell(pos, BALL_IMG)
    addGlue()
}

function addGlue() {


    var emptyCellsArray = getEmptyCells()
    var num = getRandomInt(emptyCellsArray.length)

    var locationIToAdd = emptyCellsArray[num].i
    var locationjToAdd = emptyCellsArray[num].j
    gLastGLuePos = { i: locationIToAdd, j: locationjToAdd }
    gBoard[locationIToAdd][locationjToAdd].type = GLUE
    renderCell(gLastGLuePos, GLUE_IMG)
    setTimeout(removeGlue, 3000)
}
function removeGlue() {
    isGlue = false
    gBoard[gLastGLuePos.i][gLastGLuePos.j].type = null

    if( gBoard[gLastGLuePos.i][gLastGLuePos.j].gameElement!==GAMER){
    renderCell(gLastGLuePos, ' ')
    }
}
function buildBoard() {
    // Create the Matrix
    var board = createMat(10, 12)


    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            // Put FLOOR in a regular cell
            var cell = { type: FLOOR, gameElement: null };

            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }
            board[i][j] = cell;

            // Add created cell to The game board

        }
    }


    // Place the gamer at selected position
    board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

    // Place the Balls (currently randomly chosen positions)
    board[3][8].gameElement = BALL;
    board[7][4].gameElement = BALL;
    board[0][5].type = FLOOR;
    board[9][5].type = FLOOR;
    board[5][0].type = FLOOR;
    board[5][11].type = FLOOR;


    console.log(board);
    return board;
}

// Render the board to an HTML table
function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];

            var cellClass = getClassName({ i: i, j: j })

            // TODO - change to short if statement
            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';

            strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;

            // TODO - change to switch case statement
            if (currCell.gameElement === GAMER) {
                strHTML += GAMER_IMG;
            } else if (currCell.gameElement === BALL) {
                strHTML += BALL_IMG;
            }

            strHTML += '\t</td>\n';
        }
        strHTML += '</tr>\n';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j, allowJump = false) {

    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL || isGlue) return;


    // Calculate distance to make sure we are moving to a neighbor cell
    var iAbsDiff = Math.abs(i - gGamerPos.i);
    var jAbsDiff = Math.abs(j - gGamerPos.j);

    // If the clicked Cell is one of the four allowed
    if ((allowJump && (iAbsDiff === 0 || jAbsDiff === 0))
        || ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0))) {
        if (targetCell.gameElement === BALL) {
            audioPop.play()
            var elCounter = document.querySelector(".counter")
            counter++
            elCounter.innerText = counter
        }
        if (targetCell.type === GLUE) {
            isGlue = true
            // setTimeout(removeGlue, 3000)
        }

        // MOVING from current position
        // Model:
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
        // Dom:
        renderCell(gGamerPos, '');

        // MOVING to selected position
        // Model:
        gGamerPos.i = i;
        gGamerPos.j = j;
        gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
        // DOM:
        renderCell(gGamerPos, GAMER_IMG);

    } // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            if (i === 5 && j === 0)
                moveTo(5, 11, true)
            else
                moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            if (i === 5 && j === 11)
                moveTo(5, 0, true)
            else
                moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            if (i === 0 && j === 5)
                moveTo(9, 5, true)
            else
                moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            if (i === 9 && j === 5)
                moveTo(0, 5, true)
            else
                moveTo(i + 1, j);

            break;

    }

}


function getEmptyCells() {
    var emptyCellsArray = []
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[0].length - 1; j++) {
            if (gBoard[i][j].gameElement !== GAMER && gBoard[i][j].gameElement !== BALL) {
                var emptyCell = { i: i, j: j }
                emptyCellsArray.push(emptyCell)
            }
        }
    }
    return emptyCellsArray
}

// Returns the class name for a specific cell
function getClassName(location) {
    var cellClass = `cell-${location.i}-${location.j}`;
    return cellClass;
}

