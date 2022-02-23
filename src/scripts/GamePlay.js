//module produces html for gamplay

import { getCurrentGameScores } from "../game/gameAccess.js"

let roundNumber = 1
let roundTeamScores = []

export const GamePlay = () => {
    const gameScores = getCurrentGameScores()
    roundTeamScores = gameScores

    let html = `<h3 id = "roundNumber">Round #${roundNumber}</h3>`

    gameScores.forEach(teamScore => {
        html += `<div class = "teamScoreInput">
        <label for="scoreInput">${teamScore.teamName}</label>
        <input name = "scoreInput" id = "teamScore--${teamScore.teamId}"></input><p>
        </div>`

        
    });
    html+= `<p><button id="saveRound">Save Round</button>`
    roundNumber++

    return html

}



