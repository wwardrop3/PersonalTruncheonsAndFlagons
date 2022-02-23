const API = "http://localhost:8088"

let appStateTeams = []


export const fetchTeams = () => {
    //Get score array from within json file
    return fetch(`${API}/teams`)
    //Converts from json to js array
    .then(response => response.json())
    //Stores external data in application state
    .then((teamArray) => appStateTeams.push(teamArray))
        //scoreArray is converted js objec)
}

export const getTeams = () => {
    const listArray = appStateTeams.map(team => ({...team}))
    return listArray
}

const newId = () => {
    const lastIndex = appStateTeams.length -1
    const newId = appStateTeams[lastIndex].id +1
    return newId
}

export const setTeam = (teamName) => {
    const newTeam = {
        id: newId(),
        name: teamName
    }
    sendTeam(newTeam)
}

export const sendTeam = (teamObject) => {
    const fetchOptions = {
        //POST tells the API that you want to create something new
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamObject)
    }
    return fetch(`${API}/teams`, fetchOptions)
    .then(response => response.json()) //Why doesnt this have a second parameter like the fetch method at the bottom???
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