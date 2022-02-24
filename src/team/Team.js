import { sendGame } from "../game/gameAccess.js"
import { setTeam } from "./teamAccess.js"


export const Team  = () => {
    return `
                <h2>Add Team</h2>
                <label for = "newTeam">Add Team</label>
                <input type = "text" id = "newTeamInput" name = "newTeam" placeholder = "Enter Team Name"></input>
                <button id = "teamAdded">Add Team</button>`
}

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id === "teamAdded"){
            const input = document.querySelector("#newTeamInput").value
            setTeam(input)
            document.dispatchEvent(new CustomEvent("stateChanged"))
            
        }
        
    }
)