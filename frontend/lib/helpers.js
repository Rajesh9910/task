const basePath = "http://localhost:8080/api/v1/"

export const serverRoutes = {
    login: basePath + "auth/login",
    register: basePath + "auth/register",
    getUser: basePath + "auth/getuser",
    updateUser: basePath + "auth/update",
    newtask: basePath + "task/create",
    deleteTask: basePath + "task/delete",
    updateTask: basePath + "task/update",
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