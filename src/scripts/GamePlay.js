import { getCurrentTeamScores } from "../game/gameAccess.js"

//module produces html for gamplay
export const GamePlay = () => {
    const teamScores = getCurrentTeamScores()
    return teamScores
}



