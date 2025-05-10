import express, { Router } from 'express'
import Users from '../models/users.mjs'
import Projects from '../models/projects.mjs'
import Posts from '../models/posts.mjs'
const router = Router()
const checkIfAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin)
      return res.send({ error: 'Access Denied!' })
    next()
}
const checkIfLoggedIn = (req, res, next) => {
  if (req.user) return next()
  return res.send({ error: 'You are not logged in' })
}

// Check for daily entity counts
const dailyEntity = (Model) => {
    const dailyData = Model.aggregate([
        {
            $set: {
                dayOfCreation:  {$dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
            }
        },
        {
            $group: { _id:'$dayOfCreation', qty: {$count: {}}}
        }
    ])

    return dailyData
}

// Get count of entire collection
const countEntity = (Model) => {
    const entityCount = Model.aggregate([
        {
            $count: "total_count"
        }
    ])
}

export default router