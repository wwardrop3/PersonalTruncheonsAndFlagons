///this module will display the team selections to start the game

import { getCurrentGameScores, getCurrentTeamScores, getCurrentTeamScoresArray, getTeamScores, setCurrentTeamScore } from "../game/gameAccess.js"
import { getTeams } from "../team/teamAccess.js"
import { GamePlay } from "./GamePlay.js"

// let tempObject = {
//     "dropdownId--1": 0,
//     "dropdownId--2": 0,
//     "dropdownId--3": 0,
// }

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

//once a dropdown option is changed, check to see if the team has already been chosen or if options have yet to be selected
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
                
                return false
            }
            // const [,dropdownId] = changeEvent.target.id.split("--")
            // //this locates identifies the dropdown values in the temp object and resets value
            // tempObject[changeEvent.target.id] = parseInt(changeEvent.target.value)
            // const unique = checkUnique(tempObject)
            // if(unique === true){
            //     document.dispatchEvent(new CustomEvent("uniqueTeamsSelected"))
            // } 

        }
    }
)

const checkCurrentTeamScores = () => {
    const currentTeamScoreArray = getCurrentTeamScoresArray()
    // let checkLength = ""
    // if(currentTeamScoreArray.length > 2){
    //     checkLength = true
    // } else {
    //     checkLength = false
    // }

    let checkUnique = ""
    let checkZero = ""
    console.log(currentTeamScoreArray)
    if(currentTeamScoreArray[0].teamId === currentTeamScoreArray[1].teamId || currentTeamScoreArray[0].teamId===currentTeamScoreArray[2].teamId || currentTeamScoreArray[1].teamId === currentTeamScoreArray[2].teamId){
        checkUnique = false
    } else {
        checkUnique = true
    }
    
    currentTeamScoreArray.forEach(currentTeamScore => {
        if(currentTeamScore.teamId === 0){
            checkZero = true
        } else {
            checkZero = false
        }
        
    })
    
    if(checkUnique === true && checkZero === false){
        return true
    } else {
        return false
    }
}

