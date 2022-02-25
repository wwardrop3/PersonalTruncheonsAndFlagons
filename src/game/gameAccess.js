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
    return appStateTeamScores
}

export const getCurrentTeamScores = () => {
    return currentTeamScores
}



export const getCurrentGameScores = () => {
    return currentTeamScores
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

export const setCurrentTeamScore = (dropdownId, teamObject) => {
    const newTeamScoreObject = {
        teamId: teamObject.id,
        teamName: teamObject.name,
        teamScore: 0,
    }
    
    currentTeamScores[dropdownId] = newTeamScoreObject
    document.dispatchEvent(new CustomEvent("teamSet"))
    
}

export const getCurrentTeamScoresArray = () => {
    const teamScoresArray = Object.keys(currentTeamScores).map(key => currentTeamScores[key])
    return teamScoresArray

}

export const updateRoundScore = (teamId, teamScore) => {
    const currentScoresArray = getCurrentTeamScoresArray()
    currentScoresArray.forEach(currentTeamScore => {
        if(currentTeamScore.teamId === teamId){
            currentTeamScore.teamScore += parseInt(teamScore)
        }
        
    });
}


export const sendGame = (teamObject) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamObject)
    }
    return fetch(`${API}/teamScores`, fetchOptions)
    .then(response => response.json()) //Why doesnt this have a second parameter like the fetch method at the bottom???
}

export const resetCurrentTeamScores = () => {
    currentTeamScores = {}
    document.dispatchEvent(new CustomEvent("stateChanged"))
    console.log(currentTeamScores)
}
