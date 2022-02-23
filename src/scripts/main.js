import { fetchTeamScores } from "../game/gameAccess.js"
import { fetchPlayers } from "../player/playerAccess.js"
import { fetchTeams } from "../team/teamAccess.js"
import { GameSetUp } from "./GameSetUp.js"
import { siteHTML } from "./TF.js"

const render = () => {
    fetchTeamScores()
    .then(fetchPlayers)
    .then(fetchTeams)
    .then(() => document.querySelector("#mainContainer").innerHTML = siteHTML())
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