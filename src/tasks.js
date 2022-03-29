const mongodb = require('mongodb')
const { MongoClient, ObjectId } = mongodb
const { errorMsg, infoMsg, warningMsg } = require('./utils/messages')
const connectionUrl = 'mongodb://127.0.0.1:27017' //localhost is 127.0.0.1
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, (error, client) => {
    if (error) {
        return errorMsg('Error while connecting database')
    }

    const tasksDb = client.db(databaseName)
    const tasksCollection = tasksDb.collection('tasks')

    const tasks = [{
        task: 'Read Node',
        description: 'JS Backend course',
        completed: false
    },
    {
        task: 'Read React',
        description: 'JS Frontend course',
        completed: true
    },
    {
        task: 'Read Core Javascript',
        description: 'JS foundation concepts',
        completed: true
    }
    ]

    // tasksCollection.insertMany(tasks, (error, result) => {
    //     if (error) {
    //         return errorMsg('Error while inserting in database')
    //     }

    //     infoMsg(`the inserted record is ${result.insertedCount}`)
    // })

    // tasksCollection.find({ _id: ObjectId("622f4da5a09806f19a23618f") }, (error, result) => {
    //     console.log({ result })
    // })

    tasksCollection.find({ completed: true }).toArray((error, document) => {
        if (error) {
            return errorMsg('Error while fetching document')
        }

        console.log(document)
    })

})