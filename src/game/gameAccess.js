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

export const sendGameScores = () => {
    const currentTeamScoresArray = getCurrentTeamScoresArray()
    currentTeamScoresArray.forEach(currentTeamScore => {
        const sendGame = (teamScoreObject) => {
            const fetchOptions = {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json()"
                },
                "body": JSON.stringify(teamScoreObject) 
            }
            return fetch(`${API}/teamScores`, fetchOptions)
            .then(response => response.json())
        }
        sendGame(currentTeamScore)
        

    });
    currentTeamScores = {}
    console.log(currentTeamScores)
    
}