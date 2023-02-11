const mongoose  = require('mongoose')

let BookSchema = new mongoose.Schema({
    title: String
}, {
    versionKey: false
})

module.exports = mongoose.model('Books', BookSchema)