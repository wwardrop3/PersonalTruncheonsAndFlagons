import { LeaderBoard } from "../game/Leaderboard.js"
import { Player } from "../player/Player.js"
import { Team } from "../team/Team.js"

export const siteHTML = () => {
    return `
    <article id = "mainContent">
        <section id = "dataContainer">
            <div id = "addTeam">
                ${Team()}
            </div>
            <div id = "newPlayer">
                ${Player()}
            </div>
            <div id = "currentGame">
            <h2>Current Game</h2>
            <p>
            <em>No game in progress...</em>
            </div>
            <div id = "leaderboard">
                ${LeaderBoard()}
            </div>
        </section>
        <section id = "gamePlayContainer">
            <h1>Truncheons and Flagons</h1>
            <div id = "gamePlay">
                <button id = "startGame">Start Game</button>
            </div>
        </section>
    `
}


