//module will produce html for teams to be selected for team select
import { getCurrentTeamScores, setCurrentTeamScore } from "../game/gameAccess.js"
import { getTeams } from "../team/teamAccess.js"



const selectedTeams = {
    "teamSelect--1": 0,
    "teamSelect--2": 0,
    "teamSelect--3": 0
}

const selectedTeamsArray = []


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
            const uniqueCheck = checkUnique(changeEvent.target.value)
            selectedTeams[changeEvent.target.id] = parseInt(changeEvent.target.value)
            console.log(selectedTeams)
            const zeroCheck = checkZero()
            if(uniqueCheck === false && zeroCheck === false){
                document.querySelector("#gamePlay").innerHTML = "GamePlay"
                console.log("asdfasd")
            }
            
            }
            }
)

const checkUnique = (teamId) => {
    const teams = getTeams()
    const selectedTeamsArray = Object.keys(selectedTeams).map(key => {
        return selectedTeams[key]
    })
    const check = selectedTeamsArray.includes(parseInt(teamId))
    //if it is unique, add it to the currentteamscore table
    const foundTeam = teams.find(team => {
        return parseInt(teamId) === team.id
    })
    
    if (check===false){
        addCurrentTeamScore(foundTeam)
    }
    return check
}

const checkZero = () => {
    const checkZero = selectedTeamsArray.includes(0)
    return checkZero
}



const addCurrentTeamScore = (teamId) => {
    const teams = getTeams()
    const foundTeam = teams.find(team => {
        return team.id === parseInt(teamId)
    })
    setCurrentTeamScore(foundTeam)
    }
    

