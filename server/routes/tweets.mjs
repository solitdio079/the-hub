import express, { Router } from 'express'
import Tweets from '../models/tweets.mjs'
import { validationResult, matchedData, checkSchema } from 'express-validator'
import { tweetValidator } from '../validators/tweetValidator.mjs'

const router = Router()

router.use(express.json())
const checkIfLoggedIn = (req, res, next) => {
    if (req.user) return next()
    return res.send({error: 'You are not logged in!'})
}

// Create a Tweet
router.post("/", checkIfLoggedIn,checkSchema(tweetValidator),async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }
    // Get the data for twwet
    const { content } = matchedData(req)
    const { parent } = req.body || null 

    const user = { email: req.user.email, name: req.user.name, avatar: req.user.avatar }
    
    try {
        const newTweet = new Tweets({ user, content, parent })
        await newTweet.save()
        return res.send({msg: newTweet})
        
    } catch (error) {
        return res.send({error: error.message})
    }
    
})

// Get tweet

router.get("/", async (req, res) => {
    const { cursor, limit, userEmail, q } = req.query
    const query = {}

    if (cursor) {
        query._id = {$gt:cursor}
    }
    if (userEmail) {
        query.user.email = userEmail
    }
    if (q) {
        query.content = {$regex: q, $options: 'i'}
    }

    try {
        const allTweets = await Tweets.find(query, null, {limit: Number(limit) || 0})
        return res.send(allTweets)
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
          const singleTweet = await Tweets.findById(id)
          if (!singleTweet) return res.send({ error: 'Tweet not found' })

          return res.send(singleTweet)
    } catch (error) {
        return res.send({error: error.message})
    }
  
}) 


// update tweet

router.put("/:id", checkSchema(tweetValidator), async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.send({ error: result.array()[0].msg })
  }

  const { id } = req.params
  const oldTweet = await Tweets.findById8id
  if (!oldTweet) return res.send({ error: 'No tweet found!' })
  // Get the data for twwet
  const { content } = matchedData(req)
  const { parent } = req.body || null

  const user = {
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar,
  }
    try {
        oldTweet.content = content
        oldTweet.parent = parent
        oldTweet.user = user

        await Tweets.findByIdAndUpdate(id, oldTweet)
        return res.send({msg: oldTweet})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})


// Delete Tweets

router.delete("/:id", async (req, res) => {
    const { id } = req.params 
     const oldTweet = await Tweets.findById8id
    if (!oldTweet) return res.send({ error: 'No tweet found!' })
    
    try {
        await Tweets.findByIdAndDelete(id)
        
    } catch (error) {
        return res.send({error: error.message})
    }
    
})



export default router