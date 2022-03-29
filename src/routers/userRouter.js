const express = require('express')
const User = require('../models/user')
const router = express.Router()

const onCreateUserPromise = (req, res) => {
    const { body } = req
    const user = new User(body)
    user.save()
        .then(result => {
            res.status(201).send(result)
        })
        .catch(error => {
            res.status(500).send(error)
        })
}

const onCreateUser = async (req, res) => {
    const { body } = req
    const user = new User(body)
    try {
        const result = await user.save()
        res.status(201).send(result)
    } catch (ex) {
        res.status(500).send(ex)
    }
}


const onGetUsersNames = async (req, res) => {
    try {
        const result = await User.find({}, { _id: 0, name: 1 })
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

const onGetUsers = async (req, res) => {
    try {
        const result = await User.find()
        res.status(201).send(result)
    } catch (err) {
        res.status(500).send(err)
    }
}

const onGetUsersById = async (req, res) => {
    const { id } = req.params
    try {
        const result = await User.findById(id)
        if (result) {
            return res.status(200).send(result)
        }
        return res.status(404).send(`No User exists with id:${id} `)

    } catch (err) {
        return res.status(500).send(err)
    }
}

const onUserFindByIdAndUpdate = async (req, res) => {
    const { id } = req.params
    const { age, password } = req.body
    try {
        //In this case the save() middleware hook will not be triggered, because mongoose internally call's the save here
        const result = await User.findByIdAndUpdate(id, { age, password })
        if (!result) {
            return res.status(404).send(`resource not found`)
        }
        const countWithAge = await User.countDocuments({ age })
        return res.status(200).send(`People with age ${age} are ${countWithAge}`)
    }
    catch (err) {
        return res.status(500).send(err)
    }

}

const onUserFindByIdAndUpdateSaveHook = async (req, res) => {
    const { id } = req.params
    const updatableFields = ['name', 'password', 'age', 'email']
    //In this case we are using pure mongo function , not the mongoose function
    const updatedUser = await User.findById(id)
    // console.log({ updatedUser })

    Object.keys(req.body).forEach((key) => {
        if (!updatableFields.includes(key)) {
            m
            return
        }
        updatedUser[key] = req.body[key]
    })
    try {
        //Hence the additional step for save is required. Now we can trigger mongoose save hook.
        const result = await updatedUser.save()
        res.status(200).send(result)
    } catch (ex) {
        console.log(ex)
        res.status(500).send(ex)
    }
}

const onUserLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findByCredentials(email, password)
        //User.findByCredentials(email, password)
        res.status(200).send(user)
    } catch (ex) {
        res.status(400).send(ex)
    }
}

router.get('/', onGetUsers)
router.post('/', onCreateUser)
router.get('/:id', onGetUsersById)
router.get('/names', onGetUsersNames)
router.put('/:id', onUserFindByIdAndUpdateSaveHook)
router.put('/age/:id', onUserFindByIdAndUpdate)
router.post('/login', onUserLogin)


module.exports = router
