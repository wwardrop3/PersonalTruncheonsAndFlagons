//module will produce html for teams to be selected for team select
import { getCurrentTeamScores, setCurrentTeamScore } from "../game/gameAccess.js"
import { getTeams } from "../team/teamAccess.js"



const selectedTeams = {
    "teamSelect--1": 0,
    "teamSelect--2": 0,
    "teamSelect--3": 0
}


export const GameSetUp = () => {
    let currentTeams = getTeams()
    let html = "<h2>Select 3 Unique Teams to Begin</h2>"
    for(let i = 1; i < 4; i++){
        html+=`<div class = "teamSelections">`
        html+= `<select id = "teamSelect--${i}">`
        html+= `<option value = "0">Select Team</option>`
        const listArray = currentTeams.map(team => {
            return `<option value = "${team.id}">${team.name}</option>`
        })        
        html += listArray.join("")
        html+= `</select></div>`
    }
    return html
}

document.addEventListener(
    "change",
    (changeEvent) => {
        if(changeEvent.target.id.startsWith("teamSelect")) {
            //check if the team id has already been added to current game list
            //will return true if it already exists in selected teams
            const sameCheck = checkSame(changeEvent.target.value)
            if(sameCheck===true){
                return false
            } else {
                selectedTeams[changeEvent.target.id] = parseInt(changeEvent.target.value)
                console.log(selectedTeams)
                const zeroCheck = checkZero()
                if(sameCheck === false && zeroCheck === false){
                    document.querySelector("#gamePlay").innerHTML = "GamePlay"
                }
            }
            
            
            }
            }
)

const checkSame = (teamId) => {
    const teams = getTeams()
    const selectedTeamsArray = Object.keys(selectedTeams).map(key => {
        return selectedTeams[key]
    })
    //true if it already exists
    const check = selectedTeamsArray.includes(parseInt(teamId))
    const foundTeam = teams.find(team => {
        return parseInt(teamId) === team.id
    })
    //if it does not already exist
    if (check===false){
        console.log(foundTeam)
        setCurrentTeamScore(foundTeam)
        return check
    }
}

const checkZero = () => {
    const selectedTeamsArray = Object.keys(selectedTeams).map(key => {
        return selectedTeams[key]
    })
    const checkZero = selectedTeamsArray.includes(0)
    return checkZero
}




