const Router = require('express')
const GroupController = require('../controller/group.controller.js')
const GroupRouter = new Router()

GroupRouter.post('', GroupController.createGroup)
GroupRouter.get('', GroupController.getGroups)
GroupRouter.get('/:id', GroupController.getOneGroup)
GroupRouter.put('/:id', GroupController.updateGroup)
GroupRouter.delete('/:id', GroupController.deleteGroup)
GroupRouter.put('/:id/add-users', GroupController.addUserToGroup)

module.exports = GroupRouter
