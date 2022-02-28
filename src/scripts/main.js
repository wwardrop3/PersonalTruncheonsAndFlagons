import { CurrentGame } from "../game/CurrentGame.js"
import { fetchTeamScores } from "../game/gameAccess.js"
import { fetchPlayers } from "../player/playerAccess.js"
import { teamEventListener } from "../team/Team.js"
import { fetchTeams, setTeam } from "../team/teamAccess.js"
import { GameSetUp } from "./GameSetUp.js"
import { siteHTML } from "./TF.js"

export const API = "https://personal-truncheons-api-vba5r.ondigitalocean.app"

// "https://personal-truncheons-api-vba5r.ondigitalocean.app"

const render = () => {
    fetchTeamScores()
    .then(() => fetchPlayers())
    .then(() =>fetchTeams())
    .then(() => document.querySelector("#mainContainer").innerHTML = siteHTML())
    .then(teamEventListener)
    
}

render()

document.addEventListener(
    "stateChanged",
    (customEvent) => {
        render()
    }
)

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id ==="startGame"){
            document.querySelector("#gamePlay").innerHTML = GameSetUp()
        }
    }
)

document.addEventListener(
    "teamSet",
    (customEvent) => {
        document.querySelector("#currentGame").innerHTML = CurrentGame()
    }
)

document.addEventListener(
    "click",
    (clickEvent) => {
        if(clickEvent.target.id ==="startGame"){
            document.querySelector("#gamePlay").innerHTML = GameSetUp()
        }
    }
)

document.addEventListener(
    "gameCompleted",
    (customEvent) => {
        render()
    }
)