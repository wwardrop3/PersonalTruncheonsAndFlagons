import { fetchGames } from "../game/gameAccess.js"
import { fetchPlayers } from "../player/playerAccess.js"
import { fetchTeams } from "../team/teamAccess.js"
import { siteHTML } from "./GamePlay.js"


const render = () => {
    fetchGames()
    .then(fetchPlayers)
    .then(fetchTeams)
    .then(document.querySelector(".mainContainer").innerHTML = siteHTML())
}

render()