const mongoose = require('mongoose')
const { isAlpha, isEmail } = require('validator')
const bcrypt = require('bcrypt')

const collection = 'users'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: (value) => {
            return isAlpha(value)
        },
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    email: {
        type: String,
        unique: true, //This will add an UNIQUE Index to DB, but exisiting DB has to be dropped for this to tak effect
        required: true,
        lowercase: true,
        validate: (value) => {
            return isEmail(value)
        }
    },
    age: {
        type: Number,
        default: 0,
        max: 80
    }
});



//Mongoose accepts middlewares, these middlewares are hooks in the events cycles 
//arrow functions, object destructure doesn't work here
userSchema.pre('save', async function (next) {
    let user = this
    console.log({ user })
    if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 8)
        console.log('TODO:  SHOULD HASH THE PWD HERE', user.password, hashedPassword)
        user.password = hashedPassword
    }

    next()
})

// userSchema.post('save', () => {

// })
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email }) //pwd is already hashed
    if (!user) {
        new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        new Error('Unable to Login')
    }
    return user
}

const User = mongoose.model('User', userSchema, collection)

module.exports = User