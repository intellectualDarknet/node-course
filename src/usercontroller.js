import UserService from './user-service.js'
import User from './user.js'

class UserController {
  async create (req, res) {
    try {
      const user = await UserService.create(req.body)
      res.json(user)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getAll (req, res) {
    try {
      const users = await UserService.getAll()
      return res.json(users)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAutoSuggestedUsers (req, res) {
    try {
      const users = await UserService.getAutoSuggestedUsers(req.query)
      res.json(users)
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

  async getOne (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'Id не указан' })
      }
      const user = await User.findById(id)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update (req, res) {
    try {
      const user = req.body
      if (!user._id) {
        res.status(400).json({ message: 'Id не указан' })
      }
      const updatePost = await User.findByIdAndUpdate(user._id, user, { new: true })
      return res.json(updatePost)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'ID не указан' })
      }
      const user = await User.findByIdAndDelete(id)
      return res.json(user)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new UserController()
