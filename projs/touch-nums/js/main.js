
var num = +prompt('how many cells')
var size = Math.sqrt(num)
var curredNum = 1

var time;
var secondsLabel = document.getElementById("seconds");
var totalMiliSeconds = 0;
var gInterval;
var gStartTime;

function init() {
    time = 0
    curredNum = 1
    rendertable()
    time = document.querySelector('.time');
}

function rendertable() {
    var rundArray = makeRundArray(num)
    console.log('array:', rundArray)
    var strHTML = ''
    for (var i = 0; i < size; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < size; j++) {
            var currCell = rundArray.pop()

            strHTML += `<td onclick="CellClicked(this,${currCell})">${currCell}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML
}

function CellClicked(elCell, value) {
    if (value === curredNum) {
        if (value === 1) {
            gStartTime = new Date().getTime()
            gInterval = setInterval(setTime, 100);
        }
        elCell.classList.add('correct')
        if (curredNum === num) {
            clearInterval(gInterval)
        }
        curredNum++
    }
    
}

function makeRundArray(num) {
    var arr = []
    for (var i = 0; i < num; i++) {
        arr[i] = i + 1

    }
    shuffle(arr)
    console.log(arr)
    return arr
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function setTime() {
    strHTML = ''
    //++totalMiliSeconds;

    var current = new Date().getTime();
    current = current - gStartTime
    time.innerText = (current / 1000).toFixed(3)
    //   strHTML+=pad(parseInt(totalSeconds / 60))
    //   strHTML+=pad(totalSeconds % 60)
    // strHTML+=financial(pad(totalSeconds % 60))
    //   time.innerHTML = strHTML
    // secondsLabel.innerHTML = pad(totalSeconds % 60)
    // minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}
function financial(x) {
    return Number.parseFloat(x).toFixed(3);
}