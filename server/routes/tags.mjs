import express, { Router } from 'express'
import Tags from '../models/tags.mjs'
import { tagValidator } from '../validators/tagValidator.mjs'
import { validationResult,matchedData, checkSchema } from 'express-validator'



const router = Router()

router.use(express.json())

// Create a new tag
router.post("/", checkSchema(tagValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }
    const { name } = matchedData(req)
    try {
        const newTag = new Tags({ name })
        await newTag.save()
        return res.send({msg: newTag})
        
    } catch (error) {
        return res.send({error: error.message})
    }
    
})

// Get tags

router.get("/", async (req, res) => {
    const { cursor, limit, q} = req.query
    const query = {}

    if (cursor) {
        query._id = {$gt: cursor}
    }
    if (q) {
        query.name = { $regex: q, $options: 'i' }
    }

    try {
        const allTags = await Tags.find(query, null, { limit: Number(limit) || 0 })
        return res.send(allTags)
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    
    try {
        const singleTweet = await Tags.findById(id)
        if (!singleTweet) return res.send({ error: 'Tweet not found' })
        return res.send({msg: singleTweet})
    } catch (error) {
        return res.send({error: error.message})
    }
})

// update Tags
router.put("/:id", checkSchema(tagValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }
    const { id } = req.params
    const oldTweet = await Tags.findById(id)
    if (!oldTweet) return res.send({ error: 'Tweet not found' })
    
    const {name} = matchedData(req)
    try {
        await Tags.findByIdAndUpdate(id,{name})
        
    } catch (error) {
        return {error: error.message}
    }

})

// Delete Tags
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const oldTweet = await Tags.findById(id)
    if (!oldTweet) return res.send({ error: 'Tweet not found' })
    try {
        await Tags.findByIdAndDelete(id)
    } catch (error) {
        return res.send({error: error.message})
    }
    
})


export default router