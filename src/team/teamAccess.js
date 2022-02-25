import { sendGame } from "../game/gameAccess.js"
import { getPlayers } from "../player/playerAccess.js"

const API = "https://personal-truncheons-api-vba5r.ondigitalocean.app"

let appStateTeams = []
let currentTeams = []

export const fetchTeams = () => {
    return fetch(`${API}/teams`)
    .then(response => response.json())
    .then(
        (response) => appStateTeams = response
    )
}

export const getTeams = () => {
    return appStateTeams
}

export const getCurrentTeams = () => {
    return currentTeams
}



const newId = () => {
    const lastIndex = appStateTeams.length -1
    const newId = appStateTeams[lastIndex].id +1
    return newId
}

export const setTeam = (teamName) => {
    const newTeam = {
        id: newId(),
        name: teamName
    }
    sendTeam(newTeam)
    sendInitialTeamScore(newTeam)
    
}

export const sendTeam = (teamObject) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamObject)
    }
    return fetch(`${API}/teams`, fetchOptions)
    .then(response => response.json())
    .then(document.dispatchEvent(new CustomEvent("stateChanged")))
}

export const sendInitialTeamScore = (teamObject) => {
    const newInitialTeamScore = {
        teamId: teamObject.id,
        teamName: teamObject.name,
        teamScore: 0
    }
    sendGame(newInitialTeamScore)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const deleteLeaderboardTeam = (teamId) => {
    const players = getPlayers()
    const foundPlayersArray = players.filter(player => {
        return player.teamId === teamId
    })
    foundPlayersArray.forEach(foundPlayer => {
        deletePlayer(foundPlayer.id)
        console.log(`Deleted player ${foundPlayer.name}`)
    });
    deleteTeam(teamId)
}

export const deletePlayer = (playerId) => {
    return fetch(`${API}/players/${playerId}`, {method: "DELETE"})
}

export const deleteTeam = (teamId) => {
    return fetch(`${API}/teams/${teamId}`, {method: "DELETE"})
    
    }