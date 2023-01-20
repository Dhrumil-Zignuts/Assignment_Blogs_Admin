const mongoose = require('mongoose')
const Blogs = require('../model/blogModel')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dhrumil-zignuts",
    api_key: "192973428147176",
    api_secret : `${process.env.CLOUDNARY_S_KEY}`
})

const addNewBlog = async(req,res, next)=>{
    // console.log(req.body);
    const file = await req.files.photo;
    const result = await cloudinary.uploader.upload(file.tempFilePath)
    // console.log(result);
    
    const blogData = new Blogs({
        title : req.body.title,
        category : req.body.category,
        description: req.body.description,
        imageurl : result.url
    })

    blogData.save().then((data)=>{
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
}

module.exports = {
    addNewBlog
}