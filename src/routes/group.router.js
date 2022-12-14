const Router = require('express')
const GroupController = require('../controller/group.controller.js')
const GroupRouter = new Router()

GroupRouter.post('/group', GroupController.createGroup)
GroupRouter.get('/group', GroupController.getGroups)
GroupRouter.get('/group/:id', GroupController.getOneGroup)
GroupRouter.put('/group/:id', GroupController.updateGroup)
GroupRouter.delete('/group/:id', GroupController.deleteGroup)

module.exports = GroupRouter
