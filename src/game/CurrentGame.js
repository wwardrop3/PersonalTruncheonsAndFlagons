//produce html for current game on the left side

import { getCurrentTeamScoresArray } from "./gameAccess.js"

export const GameSetUpTeams = () => {
    const currentTeamScoresArray = getCurrentTeamScoresArray()
    let html = `<h2>Current Game</h2>`

    const listArray = currentTeamScoresArray.map(currentTeamScore => {
        return `<p>${currentTeamScore.teamName}`
    })
    html+=listArray.join("")
    html+=`</div>`
    return html
}


export const CurrentGame = () => {
    const currentTeamScoresArray = getCurrentTeamScoresArray()
    let html = `<h2>Current Game</h2>`

    const listArray = currentTeamScoresArray.map(currentTeamScore => {
        return `<p>${currentTeamScore.teamName} currently has ${currentTeamScore.teamScore} points`
    })
    html+=listArray.join("")
    html+=`</div>`
    return html
}