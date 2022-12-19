const GroupService = require('../services/group.service')
const groupValidation = require('../validation/group-validation.js')

class GroupController {
  async createGroup (req, res, next) {
    res.myMethod = 'GroupController createGroup'
    const { error } = groupValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      try {
        const group = await GroupService.create(req.body)
        res.status(200).json(group)
        next(res)
      } catch (e) {
        res.e = e
        next(res)
      }
    }
  }

  async getGroups (req, res, next) {
    res.myMethod = 'GroupController getGroups'
    try {
      const groups = await GroupService.getGroups()
      res.status(200).json(groups)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }

  async getOneGroup (req, res, next) {
    res.myMethod = 'GroupController getOneGroup'
    try {
      const group = await GroupService.getOneGroup(req.params.id)
      if (!group) {
        res.status(404)
      }
      res.status(200).json(group)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }

  async updateGroup (req, res, next) {
    res.myMethod = 'GroupController updateGroup'
    const { error } = groupValidation(req.body)
    if (error) {
      console.log('from error', error)
      res.status(400).json(error.message)
    } else {
      try {
        const person = await GroupService.update(req.params.id, req.body)
        if (!person) {
          res.status(404)
        }
        res.status(200).json(person)
        next(res)
      } catch (e) {
        res.e = e
        next(res)
      }
    }
  }

  async deleteGroup (req, res, next) {
    res.myMethod = 'GroupController deleteGroup'
    try {
      const group = await GroupService.delete(req.params.id)
      if (!group) {
        res.status(404)
      }
      res.status(200).json(group)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }

  async addUserToGroup (req, res, next) {
    res.myMethod = 'GroupController addUserToGroup'
    try {
      const result = await GroupService.addUserToGroup(req.params.id, req.body)
      if (!result) {
        res.status(404)
      }
      res.status(200).json(result)
      next(res)
    } catch (e) {
      res.e = e
      next(res)
    }
  }
}

module.exports = new GroupController()
