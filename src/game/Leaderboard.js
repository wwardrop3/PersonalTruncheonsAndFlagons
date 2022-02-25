//produces leaderboard HTML to display on the left side

import { getPlayers } from "../player/playerAccess.js"
import { deleteLeaderboardTeam, getTeams } from "../team/teamAccess.js"
import { getTeamScores } from "./gameAccess.js"


export const LeaderBoard = () => {
    const teamScores = getTeamScores()
    const teams = getTeams()
    const players = getPlayers()
    const teamTotalScores = teams.map(team => {
        const allTeamScores = teamScores.filter(teamScore => {
            return teamScore.teamId === team.id
        })
        let totalScore = 0
        allTeamScores.forEach(filteredTeamScore => {
            totalScore += filteredTeamScore.teamScore 
        });
        const leaderBoardObject = {
            teamId: team.id,
            teamName: team.name,
            teamScore: totalScore,
        }
        return leaderBoardObject
        }
    )
    
    const findPlayerCount = (teamId) => {
        const foundPlayers = players.filter(player => {
            return parseInt(player.teamId) === teamId
        }) 
        console.log(foundPlayers)
        return foundPlayers
    }
    const sortedTotalTeamScores = teamTotalScores.sort((a,b) => b.teamScore - a.teamScore)
    let html = `<h2>Leaderboard</h2><ol>`
    const sortedTotalTeamScoresArray = sortedTotalTeamScores.map(sortedTotalTeamScore => {
        const foundPlayerNumber = findPlayerCount(sortedTotalTeamScore.teamId)
        return `<li>${sortedTotalTeamScore.teamName} |  Players: ${foundPlayerNumber.length} | ${sortedTotalTeamScore.teamScore}
        <button id = "deleteTeam--${sortedTotalTeamScore.teamId}">Delete Team</button>
        </li>`
    })
    html+=sortedTotalTeamScoresArray.join("")
    html+=`</ol>`
    return html

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