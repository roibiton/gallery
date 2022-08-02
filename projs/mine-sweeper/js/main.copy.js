
var audioBomb = new Audio('sound/bomb.wav')
var MINE = '💥'

var gLives = 3
var time;
var gInterval;
var gStartTime;

var mines = 2
var SIZE = 4
var gBoard = []


var gLevel = {
    SIZE: 4,
    MINES: 2
};

gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    time = 0
    time = document.querySelector('.time');
    gBoard = buildBoard();
    renderBoard(gBoard)


}

function buildBoard() {
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {

            board[i][j] = {
                minesAround: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            if ((i === 2 && j === 2) || (i === 1 && j === 1) || (i === 3 && j === 3)) {
                board[i][j].isMine = true
            }

        }
    }
    return board
}
function cellClicked(elCell, idxI, idxJ) {

    gStartTime = new Date().getTime()
    gInterval = setInterval(setTime, 100)

    var minesAround = countMinesAround(gBoard, idxI, idxJ)
    if (gBoard[idxI][idxJ].isMine === true && gBoard[idxI][idxJ].isMarked === false && gBoard[idxI][idxJ].isShown === false) {
        audioBomb.play()
        gameOver(elCell, idxI, idxJ)
    }
    if (gBoard[idxI][idxJ].isShown || gBoard[idxI][idxJ].isMarked) return
    else if (minesAround > 0) {

        gBoard[idxI][idxJ].minesAround = minesAround
        gBoard[idxI][idxJ].isShown = true
        renderBoard(gBoard)

    }
    else
        expandShown(gBoard, elCell, idxI, idxJ)
}

function rightCellClicked(elcell, idxI, idxJ) {
    if (gBoard[idxI][idxJ].isMarked === false) {
        gBoard[idxI][idxJ].isMarked = true
        renderBoard(gBoard)
    }
    else {
        gBoard[idxI][idxJ].isMarked = false
        renderBoard(gBoard)
    }
}

function renderBoard(board) {
    // var rundArray = makeRundArray(num)
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var show = '🎃'
            var currCell = board[i][j]
            var cellClass = getClassName({ i: i, j: j })
            if (currCell.isMine === true && currCell.isShown === true) {
                show = MINE
            }
            else if (currCell.isShown === true) {
                show = currCell.minesAround
            }
            else if (currCell.isMarked === true) {
                show = '📌'
            }


            strHTML += `\t<td class="cell ${cellClass}"  oncontextmenu="rightCellClicked(this,${i},${j});return false;" onclick="cellClicked(this,${i},${j})">${show}\n`;

        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}


function countMinesAround(board, rowIdx, colIdx) {
    var minesAroundCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine === true) minesAroundCount++
        }
    }
    return minesAroundCount
}
//location(i,j)
function getClassName(location) {
    var cellClass = `cell-${location.i}-${location.j}`;
    return cellClass;
}

function gameOver(elCell, idxI, idxJ) {
    gLives--
    gBoard[idxI][idxJ].isShown = true
    if (gLives === 0) {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                gBoard[i][j].isShown = true
                gBoard[i][j].minesAround = countMinesAround(gBoard, i, j)
            }
        }
        alert('you loose')
        clearInterval(gInterval)
    }
    renderBoard(gBoard)
}

function setTime() {
    strHTML = ''

    var current = new Date().getTime();
    current = current - gStartTime
    time.innerText = (current / 1000).toFixed(3)
}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerText = value;
}

function expandShown(board, elCell, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            board[i][j].isShown = true
            board[i][j].minesAround = countMinesAround(board, i, j)
            renderBoard(board)
        }
    }
}
