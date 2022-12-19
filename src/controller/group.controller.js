const GroupService = require('../services/group.service')
const groupValidation = require('../validation/group-validation.js')
const logger = require('../logger/logger.js')

class GroupController {
  async createGroup (req, res, next) {
    logger.inform(`GroupService.create ${req.body}`)
    const { error } = groupValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      try {
        const group = await GroupService.create(req.body)
        res.status(200).json(group)
      } catch (e) {
        next(e)
      }
    }
  }

  async getGroups (req, res, next) {
    logger.inform('GroupService.getGroups')
    try {
      const groups = await GroupService.getGroups()
      res.status(200).json(groups)
    } catch (e) {
      next(e)
    }
  }

  async getOneGroup (req, res, next) {
    try {
      const group = await GroupService.getOneGroup(req.params.id)
      if (!group) {
        res.status(404)
      }
      res.status(200).json(group)
    } catch (e) {
      next(e)
    }
  }

  async updateGroup (req, res, next) {
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
      } catch (e) {
        next(e)
      }
    }
  }

  async deleteGroup (req, res, next) {
    try {
      const group = await GroupService.delete(req.params.id)
      if (!group) {
        res.status(404)
      }
      res.status(200).json(group)
    } catch (e) {
      next(e)
    }
  }

  async addUserToGroup (req, res, next) {
    try {
      const result = await GroupService.addUserToGroup(req.params.id, req.body)
      if (!result) {
        res.status(404)
      }
      res.status(200).json(result)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new GroupController()
