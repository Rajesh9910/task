const { LoginCtrl, RegisterCtrl, getUserCtrl, allUsers } = require("../controllers/AuthCtrl")

const AuthRouter = require("express").Router()

AuthRouter.post('/auth/login', LoginCtrl)
AuthRouter.post('/auth/register', RegisterCtrl)
AuthRouter.post('/auth/getuser', getUserCtrl)
AuthRouter.get('/auth/users', allUsers)

module.exports = AuthRouter