'use strict'

var audioBomb = new Audio('sound/bomb.wav')
var MINE = '💥'
var gLives = 3
var gInterval
var gFlagCount = 0
var gSafeClick = 3
//array of mats⬇⬇
var gBoardsCopy = []

var gLevel = {
    SIZE: 4,
    MINES: 3
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoard = []

function initGame() {
    var elImg = document.querySelector('.image')
    elImg.src = "img/bg.gif"
    gBoard = buildBoard()
    renderBoard(gBoard)


}

function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAround: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    return board
}

function cellClicked(elCell, idxI, idxJ) {
    var elImg = document.querySelector('.image')
    elImg.src = "img/bg.gif"
    if (gGame.secsPassed === 0) {
        gGame.secsPassed++
        gGame.isOn = true
        gInterval = setInterval(setTime, 1000)
        locateRandMine(gLevel.MINES)
        setMinesCount()
        var elBtnSafe = document.querySelector('.safe')
        elBtnSafe.hidden = false

    }
    copyBoard(gBoard)
    if (gGame.isOn) {


        if (gBoard[idxI][idxJ].isMine && gBoard[idxI][idxJ].isMarked === false && !gBoard[idxI][idxJ].isShown) {
            audioBomb.play()
            gameOver(elCell, idxI, idxJ)
        }
        if (gBoard[idxI][idxJ].isShown || gBoard[idxI][idxJ].isMarked) return
        else if (gBoard[idxI][idxJ].minesAround > 0) {
            gBoard[idxI][idxJ].isShown = true
            renderBoard(gBoard)
        }
        else if (gBoard[idxI][idxJ].minesAround === 0) {
            expandShown(gBoard, idxI, idxJ)
            gBoard[idxI][idxJ].isShown = true
            renderBoard(gBoard)
        }
    }
    checkWin()
}

function rightCellClicked(elcell, idxI, idxJ) {
    if (gBoard[idxI][idxJ].isMarked === false) {
        gBoard[idxI][idxJ].isMarked = true
        renderBoard(gBoard)
        gFlagCount++
        checkWin()
    }
    else {
        gBoard[idxI][idxJ].isMarked = false
        renderBoard(gBoard)
        gFlagCount--
        checkWin()
    }
}

function renderBoard(board) {
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board.length; j++) {
            var show = '&nbsp;'
            var currCell = board[i][j]
            var cellClass = getClassName({ i: i, j: j })
            if (currCell.isMine === true && currCell.isShown === true) {
                show = MINE
                cellClass += ' mine-shown'
            }
            else if (currCell.isShown === true) {
                if (currCell.minesAround > 0) {
                    show = currCell.minesAround
                    cellClass += ' shown'
                }
                else {
                    show = '&nbsp;'
                    cellClass += ' shown'
                }
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
//location(i,j)
function getClassName(location) {
    var cellClass = `cell-${location.i}-${location.j}`;
    return cellClass;
}

function gameOver(elCell, idxI, idxJ) {
    gLives--
    setLives()
    gBoard[idxI][idxJ].isShown = true
    if (gLives === 0) {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                gBoard[i][j].isShown = true
                gBoard[i][j].minesAround = countMinesAround(gBoard, i, j)
            }
        }
        var elImg = document.querySelector('.image')
        elImg.src = "img/loose.gif"
        clearInterval(gInterval)
    }
    renderBoard(gBoard)
}

function setTime() {
    var elTime = document.querySelector('.time');
    gGame.secsPassed++
    elTime.innerText = gGame.secsPassed
}

function locateRandMine(minesNum) {
    for (var i = 0; i < minesNum; i++) {

        var rowsIdx = getRandomIntInclusive(0, gBoard.length - 1)
        var colIdx = getRandomIntInclusive(0, gBoard[0].length - 1)
        if (!gBoard[rowsIdx][colIdx].isMine) {
            gBoard[rowsIdx][colIdx].isMine = true
        }
        else {
            i--
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);

}

function setMinesCount() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].minesAround = countMinesAround(gBoard, i, j)
        }
    }
}
function countMinesAround(board, rowIdx, colIdx) {
    var minesAroundCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) minesAroundCount++
        }
    }

    return minesAroundCount
}
function expandShown(board, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[0].length) continue


            board[i][j].minesAround = countMinesAround(board, i, j)
            if (i === rowIdx && j === colIdx) continue

            if (board[i][j].minesAround === 0 && !board[i][j].isShown) {
                board[i][j].isShown = true
                expandShown(board, i, j)
            } else {
                board[i][j].isShown = true
            }
        }
    }

}
function setLives() {
    var elLives = document.querySelector('.lives')
    elLives.innerText = '❤'.repeat(gLives)
}
function copyBoard(board) {
    var boardCopy = []

    for (var i = 0; i < board.length; i++) {
        boardCopy.push([])
        for (var j = 0; j < board.length; j++) {
            var originalCell = gBoard[i][j]
            boardCopy[i][j] = {
                minesAround: originalCell.minesAround,
                isShown: originalCell.isShown,
                isMine: originalCell.isMine,
                isMarked: originalCell.isMarked
            }
        }
    }
    gBoardsCopy.push(boardCopy)
}

function undo() {
    if (gBoardsCopy.length > 0) {
        var previosBoard = gBoardsCopy.pop()
        gBoard = previosBoard
        renderBoard(gBoard)
    }
}

function checkWin() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) return
            else if (gBoard[i][j].isMine === false && gBoard[i][j].isMarked) {
                return
            }
            else if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
                return

            }
        }
    }
    if (gLives > 0) {
        var elimg = document.querySelector('.image')
        elimg.src = "img/win.gif"
        console.log('u won')
    }
}
function restartGame() {

    gLives = 3
    gSafeClick = 3
    setLives()
    gFlagCount = 0
    gGame.isOn = false
    clearInterval(gInterval)
    gGame.secsPassed = 0
    var elBtnSafe = document.querySelector('.safe')
    elBtnSafe.hidden = true
    var elTime = document.querySelector('.time');
    elTime.innerText = gGame.secsPassed
    initGame()
}
function safeClick() {
    if (gSafeClick > 0) {
        lookForSafe()
    }
    else {
        var elimg = document.querySelector('.image')
        elimg.src = "img/oversafe.gif"
    }
}
function lookForSafe() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                if (gBoard[i][j].minesAround === 0) {
                    expandShown(gBoard, i, j)
                }
                gBoard[i][j].isShown = true
                renderBoard(gBoard)
                gSafeClick--
                i = gBoard.length
                j = gBoard.length

            }


        }
    }
}

function level1() {
    gLevel.SIZE = 4
    gLevel.MINES = 3
    var elTd = document.querySelector('.board td')
    elTd.classList.add = 'level1'
    restartGame()
}
function level2() {
    gLevel.SIZE = 6
    gLevel.MINES = 5
    var elTd = document.querySelector('.board td')
    elTd.classList.add = 'level2'
    restartGame()
}
function level3() {
    gLevel.SIZE = 9
    gLevel.MINES = 10
    var elTd = document.querySelector('.board td')
    elTd.classList.add = 'level3'
    restartGame()
}
