///this module will display the team selections to start the game

import { setCurrentTeamScore, getCurrentTeamScores, getTeamScores } from "../game/gameAccess.js"
import { getTeams } from "../team/teamAccess.js"
import { GamePlay } from "./GamePlay.js"



document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id === "startGame"){
            document.querySelector("#gamePlay").innerHTML = GameSetUp()
    }}
)


export const GameSetUp = () => {
    const teams = getTeams()
    let html =`<div class = "teamSelections"><h2>Select Teams</h2>`

    for(let i=1; i < 4; i++){
        let html2 = `<select class = "teamDropDown" id = "dropdownId--${i}">
        <option value = "0">Select Team...</option>`
        const listArray = teams.map(team => {
            return `<option value = "${team.id}">${team.name}</option>`
        })
        html2+= listArray.join("")
        html2+=`</select>`
        html+= html2
    }
    
    html+=`</div>`
    return html
}


//event listener that listens for id that starts with "dropdownId"
document.addEventListener(
    "change",
    (changeEvent) => {
        if(changeEvent.target.id.startsWith("dropdownId")){
            //if the dropdown is selected, find the object of that teamId
            const teams = getTeams()
            const foundTeam = teams.find(team => {
                return parseInt(changeEvent.target.value) === team.id
            })
            //set the team object to the current teamScores array with the property name of the dropdownId
            setCurrentTeamScore(changeEvent.target.id, foundTeam)
            //check the currentTeamScores to see if 1) there are 3 properties in the object and 2)all of the property objects are unique
            const check = checkCurrentTeamScores()
            if(check === true){
                document.querySelector("#gamePlay").innerHTML = GamePlay()
            }
            else{
                
                console.log("not yet")
                return false
            }
        }
    }
)

const checkCurrentTeamScores = () => {
    const currentTeamScores = getCurrentTeamScores()
    const currentTeamScoreArray = Object.keys(currentTeamScores).map((key) => currentTeamScores[key])
    let checkLength = ""
    if(currentTeamScoreArray.length > 2){
        checkLength = true
    } else {
        checkLength = false
    }

    let checkUnique = ""
    console.log(currentTeamScoreArray)
    if(currentTeamScoreArray[0]===currentTeamScoreArray[1] || currentTeamScoreArray[0]===currentTeamScoreArray[2] || currentTeamScoreArray[1] === currentTeamScoreArray[2]){
        checkUnique = false
    } else {
        checkUnique = true
    }

    if(checkLength === true && checkUnique === true){
        return true
    } else {
        return false
    }
}


