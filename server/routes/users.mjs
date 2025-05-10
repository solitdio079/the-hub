import express, { Router} from 'express'
import { userValidator } from "../validators/usersValidator.mjs"
import { validationResult, matchedData, checkSchema } from "express-validator"
import Users from '../models/users.mjs'
import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'
const checkIfAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return res.send({ error: 'Access Denied!' })
  next()
}
// upload images
// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/')

// Initializing multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) 
    let extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})

const upload = multer({ storage })
const router = Router()


//Change profile photo
router.put("/:id", upload.single("avatar"), checkSchema(userValidator), async (req, res) => {
    const { id } = req.params
    
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: error.message})
    }
    const oldUser = await Users.findById(id)
    if (!oldUser) return res.send({ error: 'User not found!' })
    
    const avatar = req.file.filename
    const {email, fullName} = matchedData(req)
    // delete old avatar if exists
    if (oldUser.avatar) fs.unlinkSync(destination + oldUser.avatar)
    
    try {
        oldUser.avatar = avatar
        oldUser.email = email
        oldUser.fullName = fullName 
        await Users.findByIdAndUpdate(id, oldUser)
        return res.send({msg: 'User updated!'})
    } catch (error) {
        return res.send({error: error.message })
    }
    
})

router.use(express.json())
// get Users
router.get("/", async (req, res) => {
    const { cursor, limit } = req.query
    const query = {}
    if (cursor) {
        query._id = {$gt: cursor}
    }
    try {
        const allUsers = await Users.find(query, null, {limit: Number(limit)|| 0})
        return res.send(allUsers)
    } catch (error) {
        return res.send({error: error.message})
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
           const oldUser = await Users.findById(id)
           if (!oldUser) return res.send({ error: 'User not found!' })
           return res.send(oldUser)
    } catch (error) {
        return res.send({error:error.message})
    }
 
})

// deleteUser

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const oldUser = await Users.findById(id)
    if (!oldUser) return res.send({ error: 'User not found!' })
    
    try {
        await Users.findByIdAndDelete(id)
    } catch (error) {
        return res.send({error: error.message})
    }
})


export default router