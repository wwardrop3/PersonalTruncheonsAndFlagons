const API = "http://localhost:8088"

let appStateTeams = []


export const fetchTeams = () => {
    return fetch(`${API}/teams`)
    .then(response => response.json())
    .then(
        (response) => appStateTeams = response
    )
}

export const getTeams = () => {
    return appStateTeams
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

