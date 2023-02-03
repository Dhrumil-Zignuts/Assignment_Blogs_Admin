const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    slug : {
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    imageurl :{
        type : String,
        required : true
    },
    image_id : {
        type : String,
        require: true
    } 
}, {
    timestamps: true
})

module.exports = mongoose.model('BloggingPlatform_blog', blogSchema)