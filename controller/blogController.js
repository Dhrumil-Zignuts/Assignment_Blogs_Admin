const { render } = require('ejs');
const mongoose = require('mongoose')
const slugify = require('slugify')
const Blogs = require('../model/blogModel')
const Category = require('../model/categpryModel')
// const Categorys = require('../model/categpryModel')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dhrumil-zignuts",
    api_key: "192973428147176",
    api_secret : `${process.env.CLOUDNARY_S_KEY}`
})

// Get All Blogs
const getAllBlog = async (req,res)=>{
    try{
        const allBlogs = await Blogs.find({})
        // res.status(200).json({
        //     message : "Here are All Blogs",
        //     data : allBlogs
        // })
        // const allCategory = await Categorys.find({})
        res.render('dashboard', {blogs : allBlogs});
    }catch(error){
        res.status(500).json({
            message : "All Blogs are not shown",
            error : error
        })
    }
}

const getOneBlog = async (req,res)=>{
    console.log(`This is a GetOneBlog Data params ID :${req.params.blogId}`);
    const id = req.params.blogId
    try{
        const oneBlog = await Blogs.findOne({_id : id })
        const category = await Category.find({})
        // console.log(oneBlog);
        res.render('updateBlogPage', {blog : oneBlog, category: category});
    }catch(error){
        res.status(500).json({
            Message : 'This error in GetOneBlog Contriller',
            error : error
        })
    }
    
}
// Add New Blogs
const addNewBlog = async(req,res, next)=>{
    console.log(req.body);
    const file = await req.files.photo;
    const result = await cloudinary.uploader.upload(file.tempFilePath)
    // console.log(result);
    
    const blogData = new Blogs({
        title : req.body.title,
        slug : slugify(req.body.title, {
            replacement: '-', 
            remove: /[*+~.()'"!:@]/g,
            lower: true,   
        }),
        category : req.body.category,
        description: req.body.description,
        imageurl : result.url
    })
    try{
        const addedBlog = await blogData.save()
        // res.status(200).json({
        //     message : "Blog is successfully Added",
        //     addedBlog : addedBlog
        // })
        res.redirect('/addNewBlog')
    }catch(error){
        res.status(500).json({
            message : "Blog is not Added",
            error : err
        })
    }
}

// Delete Blogs
const deleteBlog = async (req,res)=>{
    const id = req.params.blogId;

    try{
        const deletedBlog = await Blogs.deleteOne({_id : id})
        res.status(200).json({
            message : "Blog is Deleted Successfully",
            deletedData : deletedBlog
        })
        // res.render('dashboard')
        // res.redirect('/blogs/getAllBlogs')
    }catch(error){
        console.log(error);
        res.status(500).json({
            message : "Blog is not Deleted",
            error : error
        })
    }
}

// update Blogs
const updateBlog = async (req,res)=>{

    const id = req.params.blogId.trim();
    const { title, description, category } = req.body;
    // console.log(`This is a ID in Update Page: ${id}`);
    // console.log(` This is a body in update Field : ${(req.body.title)}`)

    try{
        const updatedBlog = await Blogs.updateOne({_id : id}, {$set : { title, description, category }})
        res.status(200).json({
            message : "Blog is Updated",
            data : updatedBlog
        })
    }catch(error){
        res.status(500).json({
            message : "Blog is not Updated",
            error : error
        })
    }
}
module.exports = {
    addNewBlog,
    deleteBlog,
    getAllBlog,
    updateBlog,
    getOneBlog
}