import { getTeams } from "../team/teamAccess.js"


const API = "http://localhost:8088"

let appStateTeamScores = []

let currentTeamScores = {
    "dropdownId--1":{
        teamId: 0,
        teamName: "Team 1",
        teamScore: 0,
        },
    "dropdownId--2":{
        teamId: 0,
        teamName: "Team 2",
        teamScore: 0,
        },
    "dropdownId--3":{
        teamId: 0,
        teamName: "Team 3",
        teamScore: 0,
    }
}

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
    
    currentTeamScores[dropdownId] = newTeamScoreObject //uses dropdown id to match current team score object to passed in object
    document.dispatchEvent(new CustomEvent("teamSet"))

    
}

export const getCurrentTeamScoresArray = () => {
    const teamScoresArray = Object.keys(currentTeamScores).map(key => currentTeamScores[key])
    console.log(currentTeamScores)
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
