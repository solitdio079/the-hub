import express, { Router } from 'express'
import { todoValidator } from '../validators/todoValidator.mjs'
import { matchedData, checkSchema, validationResult } from 'express-validator'
import Todos from '../models/todos.mjs'

const router = Router()

const checkIfAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin)
    return res.send({ error: 'Acces"s Denied!' })
  next()
}
router.use(express.json())
// create a todo entry
router.post("/", checkIfAdmin,checkSchema(todoValidator),async (req, res) => {
    const result = validationResult(req)
    if (!result) {
        return res.send({error: result.array()[0].msg})
    }

    const { content, isDone, projectId } = matchedData(req)
    const { parent } = req.body || null 
    try {
        const newTodo = new Todos({ content, isDone, projectId, parent })
        await newTodo.save()
        return res.send({msg: newTodo})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

// get a Todo
router.get("/", async (req, res) => {
    const { cursor, limit, projectId, parent } = req.query
    const query = {}

    if (cursor) {
        query._id = {$gt: cursor}
    }
    if (parent) {
        query.parent = parent
    }
    if (projectId) {
        query.projectId = projectId
    }

    try {
        const allTodos = await Todos.find(query, null, { limit: Number(limit) || 0 })
        return res.send(allTodos)
    } catch (error) {
        return res.send({error: error.message})
    }
    
})


router.get("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const singleTodo = await Todos.findById(id)
        if (!singleTodo) return res.send({ error: 'Todo not found!' })
        return res.send(singleTodo)
    } catch (error) {
        return res.send({error: error.message})
    }
   
})

// update todo
router.put("/:id", checkIfAdmin, checkSchema(todoValidator), async (req, res) => {
    const result = validationResult(req)
    if (!result) {
      return res.send({ error: result.array()[0].msg })
    }
    const { id } = req.params 
    const oldTodo = await Todos.findById(id)
    if (!oldTodo) return res.send({ error: 'Todo not found!' })
    const { content, isDone, projectId } = matchedData(req)
    const { parent } = req.body || null 
    try {
        oldTodo.content = content
        oldTodo.isDone = isDone
        oldTodo.projectId = projectId
        oldTodo.parent = parent

        await Todos.findByIdAndUpdate(id, oldTodo)
        return res.send({msg: oldTodo})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

// delete todo
router.delete("/:id", async (req, res) => {
     const { id } = req.params
     const oldTodo = await Todos.findById(id)
    if (!oldTodo) return res.send({ error: 'Todo not found!' })
    try {
        await Todos.findByIdAndDelete(id)
        return res.send({msg: oldTodo})
        
    } catch (error) {
        return res.send({error: error.message})
    }
})

export default router