const { getMsgs, createMsg } = require("../controllers/ChatCtrl")

const ChatRouter = require("express").Router()

ChatRouter.post('/chat/create', createMsg)
ChatRouter.post('/chat/get', getMsgs)

module.exports = { ChatRouter }