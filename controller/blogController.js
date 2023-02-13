const { render } = require('ejs');
const mongoose = require('mongoose')
const slugify = require('slugify');
const { findOne } = require('../model/blogModel');
const Blogs = require('../model/blogModel')
const Category = require('../model/categpryModel')
// const Categorys = require('../model/categpryModel')
const cloudinary = require('cloudinary').v2;
const { check, validationResult } = require('express-validator');


// Cloudnary Config Code
cloudinary.config({
    cloud_name: "dhrumil-zignuts",
    api_key: "API KEY",
    api_secret: `${process.env.CLOUDNARY_S_KEY}`
})

// Get All Blogs
const getAllBlog = async (req, res) => {
    try {
        const allBlogs = await Blogs.find({})
        res.render('dashboard', { blogs: allBlogs });
    } catch (error) {
        res.status(500).json({
            message: "All Blogs are not shown",
            error: error
        })
    }
}

// Get One Blogdata
const getOneBlog = async (req, res) => {
    console.log(`This is a GetOneBlog Data params ID :${req.params.blogId}`);
    const id = req.params.blogId
    try {
        const oneBlog = await Blogs.findOne({ _id: id })
        const category = await Category.find({})
        res.render('updateBlogPage', { blog: oneBlog, category: category });
    } catch (error) {
        res.status(500).json({
            Message: 'This error in GetOneBlog Contriller',
            error: error
        })
    }

}
// Add New Blogs
const addNewBlog = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        console.log(alert);
        // res.status(422).jsonp(alert)
        res.render('errorPage', { alert })
    } else {
        const file = await req.files.photo;
        const result = await cloudinary.uploader.upload(file.tempFilePath)

        const blogData = new Blogs({
            title: req.body.title,
            slug: slugify(req.body.title, {
                replacement: '-',
                remove: /[*+~.()'"!:@]/g,
                lower: true,
            }),
            category: req.body.category,
            description: req.body.description,
            imageurl: result.url,
            image_id: result.public_id
        })
        try {
            const addedBlog = await blogData.save()
            res.redirect('/addNewBlog')
        } catch (error) {
            res.status(500).json({
                message: "Blog is not Added",
                error: error
            })
        }
    }



}

// Delete Blogs
const deleteBlog = async (req, res) => {
    const id = req.params.blogId;

    try {
        const findBlog = await Blogs.findOne({ _id: id })
        const deleteImage = await cloudinary.uploader.destroy(findBlog.image_id)
        const deletedBlog = await Blogs.deleteOne({ _id: id })
        res.status(200).json({
            message: "Blog is Deleted Successfully",
            deletedData: deletedBlog
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Blog is not Deleted",
            error: error
        })
    }
}

// update Blogs
const updateBlog = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        // res.status(422).json(alert)
        res.render('errorPage', { alert })
    } else {
        const id = req.params.blogId.trim();
        const { title, description, category } = req.body;
        const slug = slugify(req.body.title, {
            replacement: '-',
            remove: /[*+~.()'"!:@]/g,
            lower: true,
        })

        try {
            const updatedBlog = await Blogs.updateOne({ _id: id }, { $set: { title, description, category, slug } })
            res.status(200).json({
                message: "Blog is Updated",
                data: updatedBlog
            })
        } catch (error) {
            res.status(500).json({
                message: "Blog is not Updated",
                error: error
            })
        }
    }



}

// Update Image
const updateImage = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        // res.status(422).jsonp(errors.array())
        res.render('errorPage', { alert })
    } else {
        const id = req.params.imageId;
        console.log(`This is a Update Image Id: ${id}`);

        const file = await req.files.photo;
        const result = await cloudinary.uploader.upload(file.tempFilePath)

        try {
            const findBlog = await Blogs.findOne({ _id: id })
            const deletedImage = await cloudinary.uploader.destroy(findBlog.image_id)
            console.log(`Id Is Deleted`);
            const updateImage = await Blogs.updateOne({ _id: id }, { $set: { imageurl: result.url, image_id: result.public_id } })
            console.log(`image is Updates`);
            res.redirect('/blogs/getAllBlogs')
        } catch (err) {
            res.status(500).json({
                message: "Image is not Updated",
                error: err
            })
        }
    }


}
module.exports = {
    addNewBlog,
    deleteBlog,
    getAllBlog,
    updateBlog,
    getOneBlog,
    updateImage
}
