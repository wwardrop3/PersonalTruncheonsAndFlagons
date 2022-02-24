//module produces html for gamplay

import { getCurrentTeamScores, getCurrentTeamScoresArray } from "../game/gameAccess.js"

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




