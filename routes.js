const express = require('express')
const routes = express.Router()

const tasksController = require("./controllers/tasks")

routes.get('/allTaks', tasksController.showAll)
routes.get('/tasks/create', tasksController.add)
routes.post('/tasks', tasksController.post)
routes.get('/tasks/:id/edit', tasksController.edit)
routes.put('/tasks', tasksController.update)
routes.delete('/tasks', tasksController.delete)