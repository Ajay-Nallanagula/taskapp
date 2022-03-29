const mongoose = require('mongoose')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const database = 'task-manager-api'

mongoose.connect(`${connectionUrl}/${database}`)

// const Task = mongoose.model('Task', {
//     description: { type: String, trim: true, required: true },
//     completed: Boolean,
// })

// const task2 = new Task({ description: '             Ajay Nallanagula                   ', completed: true })

// task1.save()
//     .then((result) => {
//         console.log(result)
//     })
//     .catch(err => {
//         console.log('Error', err)
//     })

// async function saveModel(task) {
//     const result = await task.save()
//     console.log(result)
// }

// try {
//     saveModel(task2)

// } catch (err) {
//     console.log(err)
// }
