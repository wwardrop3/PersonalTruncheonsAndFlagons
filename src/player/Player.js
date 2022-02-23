//module produces html form for adding a player

import { getTeams } from "../team/teamAccess.js"
import { setPlayer } from "./playerAccess.js"


export const Player = () => {
    return `
    <h2>Add Player</h2>
    <div id = "firstName">
        <label for = "firstName">First Name</label>
        <input id = "addFirstName" name = "firstName" placeholder = "Enter First Name">
    </div>
    <div id = "lastName">
        <label for = "lastName">Last Name</label>
        <input id = "addLastName" name = "lastName" placeholder = "Enter Last Name">
    </div>
    ${selectTeam()}

    `
}


const selectTeam = () => {
    const teams = getTeams()
    let html = `<select id = "selectPlayerTeam">
    <option value = "0">Select Team...</option>`
    const listArray = teams.map(team => {
        return `<option value = "${team.id}">${team.name}</option>`
    })

    html+= listArray.join("")
    html+= `</select>`
    html+= `<button id = "addNewPlayer">Save New Player</button>`
    return html
}


document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id === "addNewPlayer"){
            const playerTeam = document.querySelector("#selectPlayerTeam").value
            const playerFirstName = document.querySelector("#addFirstName").value
            const playerLastName = document.querySelector("#addLastName").value
            
            const newPlayerObject = {
                playerFirstName: playerFirstName,
                playerLastName: playerLastName,
                playerTeam: playerTeam
            }
            setPlayer(newPlayerObject)
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
        }
       
)