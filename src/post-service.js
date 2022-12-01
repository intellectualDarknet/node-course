import Post from './post.js'

class PostService {
  async create (post) {
    const createdPost = await Post.create(post)
    return createdPost
  }

  async getAll (req, res) {
    try {
      const posts = await Post.find()
      return res.json(posts)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getOne (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        res.status(400).json({ message: 'Id не указан' })
      }
      const post = await Post.findById(id)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async update (req, res) {
    try {
      const post = req.body
      if (!post._id) {
        res.status(400).json({ message: 'Id не указан' })
      }
      const updatePost = await Post.findByIdAndUpdate(post._id, post, { new: true })
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
      const post = await Post.findByIdAndDelete(id)
      return res.json(post)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}

export default new PostService()
