import { getTeams } from "../team/teamAccess.js"


const API = "http://localhost:8088"

let appStateTeamScores = []

export const fetchGames = () => {
    return fetch(`${API}/teamScores`)
    .then(response => response.json())
    .then(
        (response) => appStateTeamScores = response
    )
}


const newId = () => {
    const lastIndex = appStateTeamScores.length -1
    const newId = appStateTeamScores[lastIndex].id +1
    return newId
}
