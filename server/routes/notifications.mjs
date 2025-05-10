import express, { response, Router } from 'express'
import { notificationValidator } from '../validators/notificationValidator.mjs'
import { validationResult, matchedData, checkSchema } from 'express-validator'
import Notifications from '../models/notifications.mjs'



const router = Router()

// create Notification
router.post("/", checkSchema(notificationValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }

    const { title, content } = matchedData(req)
    const {target} = req.body || null
    try {
        const newNotification = new Notifications({ title, content, target })
        await newNotification.save()
        return res.send({msg: newNotification})
    } catch (error) {
        return res.send({error: error.message})
    }    
})

// Get notifications
router.get("/", async (req, res) => {
    const { cursor, limit, target } = req.query
    const query = {}
    if (cursor) {
        query._id = {$gt: cursor}
    }
    if (target) {
        query.target = target
    }

    try {
        const allNotifications = await Notifications.find(query, null, { limit: Number(limit) || 0 })
        return res.send(allNotifications)
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const oldNotification = await Notifications.findById(id)
        if (!oldNotification) return res.send({ error: 'Notification not found!' })
        
        return res.send(oldNotification)
        
    } catch (error) {
        return response.end({error: error.message})
    }
})

// update Notification
router.put("/:id", checkSchema(notificationValidator), async (req, res) => {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res.send({ error: result.array()[0].msg })
      }
    const { id } = req.params 
    const oldNotification = await Notifications.findById(id)
    if (!oldNotification) return res.send({ error: 'Notification not found!' })
    
    const { title, content } = matchedData(req)
    const { target } = req.body || null
    try {
        oldNotification.title = title
        oldNotification.content = content
        oldNotification.target = target 
        await Notifications.findByIdAndUpdate(id, oldNotification)
        return res.send({msg: oldNotification})
    } catch (error) {
      return res.send({ error: error.message })
    }    
})

// delete Notification 
router.delete("/:id", async (req, res) => {
     const { id } = req.params
     const oldNotification = await Notifications.findById(id)
    if (!oldNotification) return res.send({ error: 'Notification not found!' })
    try {
        await Notifications.findByIdAndDelete(id)
        return res.send({msg: oldNotification})
    } catch (error) {
        return res.send({error: error.message})
    }
})
export default router