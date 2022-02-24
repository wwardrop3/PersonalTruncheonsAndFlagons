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
            Current Game
            <p>
            <em>No game in progress...</em>
            </div>
            <div id = "leaderBoard">
            Leader Board
            </div>
        </section>
        <section id = "gamePlayContainer">
            <h1>Truncheons and Flagons</h1>
            <div id = "gamePlay">
                <button id = "startGame">Start Game</button>
            </div>
    `
}
