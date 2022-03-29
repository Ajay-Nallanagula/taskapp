const mongoose = require('mongoose')
const validator = require('validator')

const collection = 'tasks'

const taskSchema = new mongoose.Schema({
    description: { type: String, trim: true, required: true },
    completed: { type: Boolean, default: false },
})

const Task = mongoose.model('Task', taskSchema, collection)

module.exports = Task