const mongoose  = require('mongoose')

let BookSchema = new mongoose.Schema({
  title: String,
  comments: Array,
  commentcount: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('Books', BookSchema)