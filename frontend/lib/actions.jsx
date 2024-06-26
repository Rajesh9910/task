import { serverRoutes } from "./helpers"

export const loginAction = async (form) => {
    try {
        const res = await fetch(serverRoutes.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const regiserAction = async (form) => {
    try {
        const res = await fetch(serverRoutes.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getUserAction = async (form) => {
    try {
        const res = await fetch(serverRoutes.getUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
            cache: "no-cache"
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const allUsersAction = async () => {
    const res = await fetch(serverRoutes.allUsers)
    const data = await res.json()
    return data
}

export const createTask = async (form) => {
    try {
        const res = await fetch(serverRoutes.newtask, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateTask = async (form) => {
    try {
        const res = await fetch(serverRoutes.updateTask, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const createMsg = async (form) => {
    try {
        const res = await fetch(serverRoutes.createMsg, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const allChats = async (form) => {
    try {
        const res = await fetch(serverRoutes.getMsgs, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}