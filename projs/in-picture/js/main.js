

var gCurrQuestIdx = 0
var gQuests = [
    { id: 1, opts: ['papaia', 'guava'], correctOptIndex: 1 },
    { id: 2, opts: ['watermelon', 'melon'], correctOptIndex: 1 },
    { id: 3, opts: ['avokado', 'pumpkin'], correctOptIndex: 0 }]

    
            createQuestion(1,['papaia', 'guava'], 1 )
    
    

    function createQuestion(id,options,currAnsIdx,imgSrc){
        return{
            id:id,
            opts:options,
            correctOptIndex:currAnsIdx,
            imgSrc:imgSrc
        }

    }



function renderQuest() {
        if (gCurrQuestIdx !== gQuests.length) {
            
            var elButton1 = document.querySelector(".buttonStyle1")
            var elButton2 = document.querySelector(".buttonStyle2")
            var elImg = document.querySelector("img")
            elButton1.innerText = gQuests[gCurrQuestIdx].opts[0]
            elButton2.innerText = gQuests[gCurrQuestIdx].opts[1]

            elImg.src = `${gCurrQuestIdx}.jpg`
            
        }
        else{
            var elRestartBtn = document.querySelector(".btn")
            elRestartBtn.style.display = 'block'
            alert('victorious!!')
            
        }

    }







function chekAnswer(elbtn) {
    if (gQuests[gCurrQuestIdx].opts[gQuests[gCurrQuestIdx].correctOptIndex] === elbtn.innerText) {
        gCurrQuestIdx++
        renderQuest()
    }
}


function restart(){
    gCurrQuestIdx = 0
    // createQuestion(1,['papaia', 'guava'], 1 )
    renderQuest()
    var elRestartBtn = document.querySelector(".btn")
    elRestartBtn.style.display = 'none'
    
    



}


