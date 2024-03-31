const { createTask, updateTask } = require("../controllers/taskCtrl")


const TaskRouter = require("express").Router()

TaskRouter.post('/task/create', createTask)
TaskRouter.post('/task/update', updateTask)

module.exports = TaskRouter