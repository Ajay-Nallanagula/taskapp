const mongodb = require('mongodb')
const { MongoClient, ObjectId } = mongodb
const { errorMsg, infoMsg, warningMsg } = require('./utils/messages')
const connectionUrl = 'mongodb://127.0.0.1:27017' //localhost is 127.0.0.1
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return errorMsg('Error while connecting database')
    }

    // const id = new ObjectId()
    // console.log(id)
    // console.log(id.toString())
    // console.log(id.getTimestamp())

    const db = client.db(databaseName)
    const usersDb = db.collection('users')

    usersDb.findOne({_id: new ObjectId("622f1112b971b3ab88c37825")}, (error, document) => {
        if (error) {
            return errorMsg('Error while fetching document')
        }

        console.log(document)
    })
    // usersDb.insertOne({
    //     name: 'Ajay Nallanagula',
    //     age: '36',
    //     _id: id
    // }, (error, result) => {
    //     if (error) {
    //         return errorMsg('Error while inserting the record')
    //     }
    //     console.log(result.ops)
    //     infoMsg(`the inserted record is ${result.insertedId}`)
    // })

    const usersArray = [{
        name: 'Name11',
        age: '11'
    },
    {
        name: 'Name3',
        age: '23'
    },
    {
        name: 'Name4',
        age: '33'
    }]

    // usersDb.insertMany(usersArray, (error, result) => {
    //     if (error) {
    //         return errorMsg('Error while inserting the record')
    //     }
    //     console.log(result)
    //     infoMsg(`the inserted record is ${result.insertedCount}`)
    // })
})