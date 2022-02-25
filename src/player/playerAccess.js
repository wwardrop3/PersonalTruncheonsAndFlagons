import { API } from "../scripts/main.js"

let appStatePlayers = []

export const fetchPlayers = () => {
    return fetch(`${API}/players`)
    .then(response => response.json())
    .then(
        (response) => appStatePlayers = response
    )
}

export const getPlayers = () => {
    return appStatePlayers
    
}

const newId = () => {
    let newId = 0
    if(appStatePlayers.length < 1){
        newId = 1
    } else{
        const lastIndex = appStatePlayers.length -1
        const newId = appStatePlayers[lastIndex].id +1
    }
    return newId
}



export const setPlayer = (playerObject) => {
    playerObject.id = newId()
    appStatePlayers.push(playerObject)
    sendPlayer(playerObject)
}

export const sendPlayer = (playerObject) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playerObject)
    }
    return fetch(`${API}/players`, fetchOptions)
    .then(response => response.json()) //Why doesnt this have a second parameter like the fetch method at the bottom???
}
