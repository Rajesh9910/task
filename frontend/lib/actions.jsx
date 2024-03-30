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
            body: JSON.stringify(form)
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
} 