//module produces html for gamplay

import { CurrentGame } from "../game/CurrentGame.js"
import { getCurrentTeamScoresArray, resetCurrentTeamScores, sendGame, updateRoundScore } from "../game/gameAccess.js"
import { GameSetUp } from "./GameSetUp.js"

let roundNumber = 1
let roundTeamScores = []

export const GamePlay = () => {
    const currentTeamScores = getCurrentTeamScoresArray()
    roundTeamScores = currentTeamScores

    let html = `<h3 id = "roundNumber">Round #${roundNumber}</h3>`

    currentTeamScores.forEach(teamScore => {
        html += `<div class = "teamScoreInput">
        <label for="scoreInput">${teamScore.teamName}</label>
        <input name = "scoreInput" id = "teamScore--${teamScore.teamId}"></input><p>
        </div>`

        
    });
    html+= `<p><button id="saveRound">Save Round</button>`
    roundNumber++

    return html
}

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id === "saveRound"){
            const currentTeamScores = getCurrentTeamScoresArray()
            if(roundNumber < 4){
                //add scores to currentTeamScores
                
                currentTeamScores.forEach(currentTeamScore => {
                    const team = document.querySelector(`#teamScore--${currentTeamScore.teamId}`)
                    const teamScore = team.value
                    updateRoundScore(currentTeamScore.teamId, teamScore)
                });
                //refresh gamePlay
                document.querySelector("#gamePlay").innerHTML = GamePlay()
                document.querySelector("#currentGame").innerHTML = CurrentGame()
            } else {
                currentTeamScores.forEach(currentTeamScore => {
                    const team = document.querySelector(`#teamScore--${currentTeamScore.teamId}`)
                    const teamScore = team.value
                    updateRoundScore(currentTeamScore.teamId, teamScore)
                });
                document.querySelector("#currentGame").innerHTML = CurrentGame()
                const finalTeamScores = getCurrentTeamScoresArray()
                //determine who won
                const sortedFinalTeamScores = finalTeamScores.sort((a,b) => b.teamScore - a.teamScore)
                //window alert who won
                window.alert(`${sortedFinalTeamScores[0].teamName} wins with ${sortedFinalTeamScores[0].teamScore} points!`)
                
                
                //start new game (Gamesetup)
                document.querySelector("#gamePlay").innerHTML = GameSetUp()
                
                
                //send current teamscores to teamscores database
                const currentTeamScoreArray = getCurrentTeamScoresArray()
                currentTeamScoreArray.forEach(currentTeamScore => {
                    sendGame(currentTeamScore)
                });
                resetCurrentTeamScores()
            }
            
        }
    }
)




