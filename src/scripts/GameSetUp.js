///this module will display the team selections to start the game

import { addTeamScore, getCurrentGameScores, getTeamScores } from "../game/gameAccess.js"
import { getTeams } from "../team/teamAccess.js"
import { GamePlay } from "./GamePlay.js"

let tempObject = {
    "dropdownId--1": 0,
    "dropdownId--2": 0,
    "dropdownId--3": 0,
}

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id === "startGame"){
            document.querySelector(".gamePlay").innerHTML = GameSetUp()
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



//once a dropdown option is changed, check to see if the team has already been chosen or if options have yet to be selected
document.addEventListener(
    "change",
    (changeEvent) => {
        if(changeEvent.target.id.startsWith("dropdownId")){
            const [,dropdownId] = changeEvent.target.id.split("--")
            //this locates identifies the dropdown values in the temp object and resets value
            tempObject[changeEvent.target.id] = parseInt(changeEvent.target.value)
            const unique = checkUnique(tempObject)
            if(unique === true){
                document.dispatchEvent(new CustomEvent("uniqueTeamsSelected"))
            } 

        }
    }
)

const checkUnique = (tempObject) => {
    let tempArray = [tempObject["dropdownId--1"],tempObject["dropdownId--2"],tempObject["dropdownId--3"]]
    const checkZero = tempArray.includes(0)
    const checkSame = () => {
        if(tempArray[0] === tempArray[1] || tempArray[0]===tempArray[2] || tempArray[1] === tempArray[2]){
            return true
        } else {
            return false
        }}
    const duplicate = checkSame()

    if(duplicate === false && checkZero === false){
        return true
    }
    }



document.addEventListener(
    "uniqueTeamsSelected",
    (customEvent) => {
        console.log("unique teams selected")
        let teamIdArray = Object.keys(tempObject).map(key => {
            return tempObject[key]
        })
        console.log(teamIdArray)
        for(const teamId of teamIdArray){
            addTeamScore(teamId)
        }
        console.log(getCurrentGameScores())
        document.querySelector(".gamePlay").innerHTML = GamePlay()
        
    }
)