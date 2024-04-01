// const basePath = "https://task-a4z2.onrender.com/api/v1/"
const basePath = "http://localhost:8080/api/v1/"

export const socketServer = "http://localhost:8080"

export const serverRoutes = {
    login: basePath + "auth/login",
    register: basePath + "auth/register",
    getUser: basePath + "auth/getuser",
    allUsers: basePath + "auth/users",
    newtask: basePath + "task/create",
    deleteTask: basePath + "task/delete",
    updateTask: basePath + "task/update",
    createMsg: basePath + "chat/create",
    getMsgs: basePath + "chat/get",
}

export const clientRoutes = {
    login: '/login',
    home: '/',
}


export const toast = (api, type, msg) => {
    api[type]({
        message: msg,
        placement: "topRight",
        duration: 3,
        bottom: 0
    });
}