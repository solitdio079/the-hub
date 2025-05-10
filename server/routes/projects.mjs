import express, { Router } from 'express'
import Projects from '../models/projects.mjs'
import { projectValidator } from '../validators/projectValidator.mjs'
import { validationResult, matchedData, checkSchema } from 'express-validator'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'
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

const checkIfAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return res.send({ error: 'Acces"s Denied!' })
  next()
}

// create project 
router.post("/", checkIfAdmin,upload.array('images', 4), checkSchema(projectValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }

    const {title, overview, deadline} = matchedData(req)

    const images = req.files.map(item => item.filename)

    try {
        const newProject = new Projects({ title, overview, deadline, images })
        await newProject.save()
        return res.send({msg: newProject})
        
    } catch (error) {
        return res.send({error: error.message})
    }

    
    
})
// Update Project

router.put('/:id', checkIfAdmin, upload.array('images', 4), checkSchema(projectValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }

    // get ol project
    const {id} = req.params

    const oldProject = await Projects.findById(id)
    if (!oldProject) {
        return res.send({error: 'Project not found!'})
    }

    // setting values
    const { title, overview, deadline } = matchedData(req)
    const images = req.files.map(item => item.filename)

   
    oldProject.images.forEach(item => {
        s.unlinkSync(destination + item)
    })
    

    try {
        oldProject.title = title
        oldProject.overview = overview
        oldProject.deadline = deadline
        oldProject.images = images

        await Projects.findByIdAndUpdate(id, oldProject)
        return res.send({msg: oldProject})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

// Get projects

router.use(express.json())
router.get("/", async (req, res) => {
    const { cursor, q, limit } = req.query
    const query = {}
    if (cursor) {
        query._id = {$gt: cursor}
    }
    if (q) {
        query.title = {$regex: q, $options: 'i'}
    }
    try {

        const allProjects = await Projects(query, null, {
          limit: Numner(limit) || 0,
        })
        return res.send(allProjects)
        
    } catch (error) {
        return res.send({error: error.message})
    }
    
    
})

// update project without images

router.patch("/:id", checkIfAdmin, checkSchema(projectValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({error: result.array()[0].msg})
    }
    // get ol Project
    const {id} = req.params
    const oldProject = await Projects.findById(id)
    if (!oldProject) return res.send({ error: 'Project not found' })
    
    // Get data matched
    const { title, overview, deadline } = matchedData(req)
    
    const images = oldProject.images

    try {
        oldProject.title = title
        oldProject.overview = overview
        oldProject.deadline = deadline
        oldProject.images = images

        await Projects.findByIdAndUpdate(id, oldProject)
        return res.send({ msg: oldProject })
        
    } catch (error) {
        return res.send({error: error.message})
    }
    
    
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const singleProject = await Projects.findById(id)
        return res.send({msg: singleProject})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

// Delete Project

router.delete("/:id", async (req, res) => {
  // get ol Project
  const { id } = req.params
  const oldProject = await Projects.findById(id)
  if (!oldProject) return res.send({ error: 'Project not found' })
    
    try {
        await Projects.findByIdAndDelete(id)
        return res.send({msg: 'Project deleted'})
    } catch (error) {
        return res.send({error: error.message} )
    }
})







export default router