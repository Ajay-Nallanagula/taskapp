const express = require('express')
const taskRouter = express.Router()
const Task = require('../models/tasks')

const onCreateTask = async (req, res) => {
    const { body } = req
    const task = new Task(body)
    try {
        const result = await task.save()
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

const onGetTasksDescriptions = async (req, res) => {
    try {
        const result = await Task.find({/*selection Criteria */ }, { description: 1, _id: 0 })//.select('description')
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

const onGetTasks = async (req, res) => {
    try {
        const result = await Task.find()
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

const onGetTaskById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await Task.findById(id)
        if (result) {
            return res.status(200).send(result)
        }
        return res.status(404).send(`No Task exists with id:${id} `)

    } catch (err) {
        res.status(500).send(err)
    }
}

const onRemoveCompletedTask = async (req, res) => {
    try {
        const removed = await Task.findOneAndDelete({ completed: true })
        console.log({ removed })
        const incompleteTasks = await Task.countDocuments({ completed: false })
        return res.status(200).send(`Incompeted tasks are ${incompleteTasks}`)
    } catch (err) {
        return res.status(500).send(`error occurred while deletion`)
    }
}

taskRouter.get('/', onGetTasks)
taskRouter.post('/', onCreateTask)
taskRouter.get('/:id', onGetTaskById)
taskRouter.get('/descriptions', onGetTasksDescriptions)
taskRouter.delete('/completed', onRemoveCompletedTask)

module.exports = taskRouter
