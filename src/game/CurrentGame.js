//produce html for current game on the left side

import { getCurrentTeamScoresArray } from "./gameAccess.js"


export const CurrentGame = () => {
    const currentTeamScoresArray = getCurrentTeamScoresArray()
    let html = `<div id = "currentGame">`

    const listArray = currentTeamScoresArray.map(currentTeamScore => {
        return `<p>${currentTeamScore.teamName} currently has ${currentTeamScore.teamScore} points`
    })
    html+=listArray.join("")
    html+=`</div>`
    return html
}