const { LoginCtrl, RegisterCtrl, getUserCtrl } = require("../controllers/AuthCtrl")

const AuthRouter = require("express").Router()

AuthRouter.post('/auth/login', LoginCtrl)
AuthRouter.post('/auth/register', RegisterCtrl)
AuthRouter.post('/auth/getuser', getUserCtrl)

module.exports = AuthRouter