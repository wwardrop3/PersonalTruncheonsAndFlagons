import { getTeams } from "../team/teamAccess.js"


const API = "http://localhost:8088"

let appStateTeamScores = []

let currentGameScores = []

let currentRoundScores = []

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

export const getCurrentGameScores = () => {
    return currentGameScores
}




export const addTeamScore = (teamId) => {
    const teams = getTeams()
    const foundTeam = teams.find(team => {
        return parseInt(teamId) === team.id
    })
    const newTeamScore = {
        id: newId(),
        teamId: foundTeam.id,
        teamName: foundTeam.name,
        gameScore: 0,
        timestamp: ""
    }
    currentGameScores.push(newTeamScore)
}

const newId = () => {
    const lastIndex = appStateTeamScores.length -1
    const newId = appStateTeamScores[lastIndex].id +1
    return newId
}


const setTeamRoundScore = (teamId) => {
    const foundTeamScore = currentGameScores.find()
}