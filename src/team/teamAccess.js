const API = "http://localhost:8088"

let appStateTeams = []

export const fetchTeams = () => {
    return fetch(`${API}/teams`)
    .then(response => response.json())
    .then(
        (response) => appStateTeams = response
    )
}

export const getTeams = () => {
    const listArray = appStateTeams.map(team => ({...team}))
    return listArray
}