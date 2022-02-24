import { getTeams } from "../team/teamAccess.js"


const API = "http://localhost:8088"

let appStateTeamScores = []

let currentTeamScores = {}

export const fetchTeamScores = () => {
    return fetch(`${API}/teamScores`)
    .then(response => response.json())
    .then(
        (response) => {appStateTeamScores = response
        return response}
    )
}

export const getTeamScores = () => {
    return appStateTeamScores()
}

export const getCurrentTeamScores = () => {
    return currentTeamScores
}


const newId = () => {
    const lastIndex = appStateTeamScores.length -1
    const newId = appStateTeamScores[lastIndex].id +1
    return newId
}

export const setCurrentTeamScore = (dropdownId, teamObject) => {
    currentTeamScores[dropdownId] = teamObject
    console.log(currentTeamScores)
}