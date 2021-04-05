const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Person', personSchema)