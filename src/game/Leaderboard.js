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



   
// //import function from scoreList
// import { TeamRows } from "./score/ScoreList.js";

// // function for leaderboard
// export const Leaderboard = () => {
//     //interpolate html by invoking scoreList function
//     //return html
//     // set up table properly for scroll ability
//     return `
// <h2>Leaderboard</h2>
// <table id="leaderboardTable">
//     <thead>
//         <tr class="leaderboardHeaders">
//             <th scope="col" class="leaderboardHeader">Name</th>
//             <th scope="col" class="leaderboardHeaderPlayer">Players</th>
//             <th scope="col" class="leaderboardHeaderScore">Score</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td colspan="3">
//                 <div class="teamRows">
//                     <table>
//                         <tbody>
//                             ${TeamRows()}
//                         </tbody>
//                     </table>
//                 </div>
//             </td>
//         </tr>
//     </tbody>
// </table>
// `
// }

// export const TeamRows = () => {
//     const teams = getTeams()
//     //make a copy of teams array and save their totalScore as a property
//     const totalTeamScores = teams.map((team) => ({
//         ...team,
//         totalScore: totalScore(team.id)
//     }))

//     //sort all teams by their totalScore property so the leaderboard is displayed in the right order
//     const sortedTeams = totalTeamScores.sort((team1, team2) => team2.totalScore - team1.totalScore)
//     let html = ""
//     for (const team of sortedTeams) {
//         //interpolate string for each team that displays team name, totalScore, and playerCount
//         html += `<tr class="leaderboardRows">
//                     <td class="leaderboardTeam">${team.teamName}</td>
//                     <td class="playerCount">${PlayerCount(team.id)}</td>
//                     <td class="score">${totalScore(team.id)}</td>
//                 </tr>`
//     }
    
//     //return html
//     return html
// }