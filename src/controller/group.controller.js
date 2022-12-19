const GroupService = require('../services/group.service')
const groupValidation = require('../validation/group-validation.js')

class GroupController {
  async createGroup (req, res) {
    const { error } = groupValidation(req.body)
    if (error) {
      res.status(400).json(error.message)
    } else {
      try {
        const group = await GroupService.create(req.body)
        res.status(200).json(group)
      } catch (e) {
        res.status(500).json(e)
      }
    }
  }

  async getGroups (req, res) {
    const groups = await GroupService.getGroups()
    res.status(200).json(groups)
  }

  async getOneGroup (req, res) {
    try {
      const group = await GroupService.getOneGroup(req.params.id)
      if (!group) {
        res.status(404)
      }
      res.status(200).json(group)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async updateGroup (req, res) {
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
        res.status(500).json(e)
      }
    }
  }

  async deleteGroup (req, res) {
    try {
      const group = await GroupService.delete(req.params.id)
      if (!group) {
        res.status(404)
      }
      res.status(200).json(group)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async addUserToGroup (req, res) {
    try {
      const result = await GroupService.addUserToGroup(req.params.id, req.body)
      if (!result) {
        res.status(404)
      }
      res.status(200).json(result)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

module.exports = new GroupController()
