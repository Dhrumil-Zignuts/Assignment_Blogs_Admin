const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    newCategory : {
        type : String,
        required : true,
        // unique : true
    }
})

module.exports = mongoose.model('BloggingPlatform_category', categorySchema);