const mongoose  = require('mongoose')

let BookSchema = new mongoose.Schema({
  title: String,
  comment: [String],
  commentcount: Number
}, {
    versionKey: false
})

module.exports = mongoose.model('Books', BookSchema)