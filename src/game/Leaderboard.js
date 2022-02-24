//produces leaderboard HTML to display on the left side

import { getTeams } from "../team/teamAccess.js"
import { getTeamScores } from "./gameAccess.js"


export const LeaderBoard = () => {
    const teamScores = getTeamScores()
    const teams = getTeams()
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
    const sortedTotalTeamScores = teamTotalScores.sort((a,b) => b.teamScore - a.teamScore)
    let html = `<h2>Leaderboard</h2><ol>`
    const sortedTotalTeamScoresArray = sortedTotalTeamScores.map(sortedTotalTeamScore => {
        return `<li>${sortedTotalTeamScore.teamName} | ${sortedTotalTeamScore.teamScore}</li>`
    })
    html+=sortedTotalTeamScoresArray.join("")
    html+=`</ol>`
    return html

}