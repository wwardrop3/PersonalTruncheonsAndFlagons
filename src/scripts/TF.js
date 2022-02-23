import { GameSetUp } from "./GameSetUp.js"

export const siteHTML = () => {
    return `
    <article class = "mainContent"
        <section class = "data">

            <div class = "teamInput">
                <h2>Add Team</h2>

            </div>
            <div class = "playerInput">
                <h2>Add Player</h2>

            </div>
            <div class = "currentGame">
                <h2>Current Game</h2>

            </div>
            <div class = "leaderboard">
                <h2>Leaderboard</h2>

            </div>
        </section>

        <section class = "gameArea">
            <h1>Truncheons and Flagons</h1>
            <section class = "gamePlay">
                <button id = "startGame">Start Game</button>
            </section>
        </section>
    </article>`
}


