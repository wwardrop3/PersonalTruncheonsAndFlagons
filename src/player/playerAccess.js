const API = "http://localhost:8088"

let appStatePlayers = []

export const fetchPlayers = () => {
    return fetch(`${API}/players`)
    .then(response => response.json())
    .then(
        (response) => appStatePlayers = response
    )
}

export const getPlayers = () => {
    const listArray = appStatePlayers.map(player => ({...player}))
    return listArray
}