import { deleteLeaderboardTeam, getTeams } from "../team/teamAccess.js"
import { findPlayerCount } from "./Leaderboard.js";

export const leaderBoardTable = (sortedTeamScoreArray) => {
    let html = `<h2>Leaderboard</h2>
    <table>
        <th>Ranking</th>
        <th>Team</th>
        <th># of Players</th>
        <th>Total Score</th>
        <th></th>`
    let count = 1
    sortedTeamScoreArray.forEach(sortedTeamScore => {
        
        html += tableRowGenerator(sortedTeamScore, count)
        count++
        
    });
    html+=`</table>`
    return html
}


const tableRowGenerator = (teamScoreObject, count) => {
    const playerCount = findPlayerCount(teamScoreObject.teamId)
    console.log(playerCount.length)
    return `<tr>
                <td style = "text-align:center">${count}</td>
                <td>${teamScoreObject.teamName}</td>
                <td class = "playerCount">${playerCount.length}</td>
                <td class = "teamScore">${teamScoreObject.teamScore}</td>
                <td><button class = "deleteButton" id = "deleteTeam--${teamScoreObject.teamId}">Delete ${teamScoreObject.teamName}</button></td>
            </tr>`
}

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id.startsWith("deleteTeam")){
            const [,teamId] = clickEvent.target.id.split("--")
            deleteLeaderboardTeam(teamId)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
        
    }
)