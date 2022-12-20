const GroupService = require('../services/group.service')
const groupValidation = require('../validation/group-validation.js')

const tryCatchHandler = require('../utils/handle.async')

class GroupController {
  createGroup = tryCatchHandler(async (req, res, next) => {
    res.myMethod = 'GroupController createGroup'
    const { error } = groupValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      const group = await GroupService.create(req.body)
      res.status(200).json(group)
      next(res)
    }
  })

  getGroups = tryCatchHandler(async (req, res, next) => {
    res.myMethod = 'GroupController getGroups'
    const groups = await GroupService.getGroups()
    res.status(200).json(groups)
    next(res)
  })

  getOneGroup = tryCatchHandler(async (req, res, next) => {
    res.myMethod = 'GroupController getOneGroup'
    const group = await GroupService.getOneGroup(req.params.id)
    if (!group) {
      res.status(404)
    }
    res.status(200).json(group)
    next(res)
  })

  updateGroup = tryCatchHandler(async (req, res, next) => {
    res.myMethod = 'GroupController updateGroup'
    const { error } = groupValidation(req.body)
    if (error) {
      console.log('from error', error)
      res.status(400).json(error.message)
    } else {
      const person = await GroupService.update(req.params.id, req.body)
      if (!person) {
        res.status(404)
      }
      res.status(200).json(person)
      next(res)
    }
  })

  deleteGroup = tryCatchHandler(async (req, res, next) => {
    res.myMethod = 'GroupController deleteGroup'
    const group = await GroupService.delete(req.params.id)
    if (!group) {
      res.status(404)
    }
    res.status(200).json(group)
    next(res)
  })

  addUserToGroup = tryCatchHandler(async (req, res, next) => {
    res.myMethod = 'GroupController addUserToGroup'
    const result = await GroupService.addUserToGroup(req.params.id, req.body)
    if (!result) {
      res.status(404)
    }
    res.status(200).json(result)
    next(res)
  })
}

module.exports = new GroupController()
