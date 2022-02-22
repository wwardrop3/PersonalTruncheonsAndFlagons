

const API = "http://localhost:8088"

let appStateTeamScores = []

export const fetchGames = () => {
    return fetch(`${API}/teamScores`)
    .then(response => response.json())
    .then(
        (response) => appStateTeamScores = response
    )
}

export const getTeamScores = () => {
    const listArray = appStateTeamScores.map(teamScore => ({...teamScore}))
    return listArray
}