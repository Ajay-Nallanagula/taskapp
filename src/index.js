const express = require('express')
require('./db/mongoose')
const Task = require('./models/tasks')
const taskRouter = require('./routers/taskRouter')
const userRouter = require('./routers/userRouter')

const app = express()

app.use(express.json())
app.use('/users', userRouter)
app.use('/tasks', taskRouter)


const port = process.env.port || 3007

app.get('/', (req, res) => {
    res.send('All set for API')
})
app.listen(port, () => {
    console.log(`Node server running on port : ${port} url: http://localhost:${port}`)
})