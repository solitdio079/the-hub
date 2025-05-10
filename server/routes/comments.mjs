import express,{ Router } from 'express'
import { commentSchema } from '../validators/commentsValidator.mjs'
import { validationResult, matchedData, checkSchema } from 'express-validator'

import Comment from '../models/comments.mjs'
const router = Router()
router.use(express.json())

const checkIfLoggedIn = (req, res, next) => {
    if (req.user) return next()
    return res.send({error: 'You are not logged in'})
}


// Create comment 

router.post("/", checkIfLoggedIn,checkSchema(commentSchema, ['body']), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }
    // Collect the two validated fileds postId and content
    const {postId, content} = matchedData(req)
    // Collect user and parent from the req 
    const { parent } = req.body || null
    const user = { email: req.user.email, name: req.user.fullName, avatar: req.user.avatar }

    try {
        const newComment = new Comment({ content, user, postId, parent }) 
        await newComment.save()
        return res.send({msg: newComment})
    } catch (error) {
        return res.send({error: error.message})
    }
    
})

// Read part of CRUD
router.get("/", async (req, res) => {
    const { q, cursor, postId, userEmail, limit } = req.query
    const query = {}

    if (cursor) {
        query._id = {$gt: cursor}
    }
    if (q) {
        query.content = {$regex: q, $options: 'i'}
    }
    if (postId) {
        query.postId = postId
    }
    if (userEmail) {
        query.user["email"] = userEmail
    }

    try {
        const comments = await Comment.find(query, null, { limit: Number(limit) || 0 })
        return res.send(comments)
    } catch (error) {
        return res.send({error: error.message})
    }
})
// get one comment
router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const singleComment = await Comment.findById(id)
    if (!singleComment) return res.send({ error: 'Comment not found' })
    return res.send(singleComment)
    } catch (error) {
        return res.send({error: error.message} )
    }
    
})
// Update a comment

router.put(
  '/:id',
  checkIfLoggedIn,
  checkSchema(commentSchema, ['body']),
    async (req, res) => {
        // Validate inputs
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res.send({ error: result.array()[0].msg })
      }
      //get the old comment
      const { id } = req.params
      const oldComment = await Comment.findById(id)
      if (!oldComment) return res.send({ error: 'Comment does not exists' })
        //set the new comment values
      const { postId, content } = matchedData(req)
        const { parent } = req.body || null
        const user = {
          email: req.user.email,
          name: req.user.fullName,
          avatar: req.user.avatar,
        }
        try {
            oldComment.user = user 
            oldComment.postId = postId
            oldComment.parent = parent
            await Comment.findByIdAndUpdate(id, oldComment)
            return res.send({msg: oldComment})
        } catch (error) {
            return res.send({error: error.message})
        }
     
  }
)

// dELETE 

router.delete("/:id", async (req, res) => {
  //get the old comment
  const { id } = req.params
  const oldComment = await Comment.findById(id)
    if (!oldComment) return res.send({ error: 'Comment does not exists' })
    
    try {
        await Comment.findByIdAndDelete(id)
        return res.send({msg: oldComment})
    } catch (error) {
        return res.send({error: error.message})
    }
})

export default router
