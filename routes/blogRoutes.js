const express = require('express')
const router = express.Router();
const blogController = require('../controller/blogController')
const checkAuth = require('../Authentication/checkAuth');
const { check } = require('express-validator');

// All Routes and Validation from express-validator
router.get('/getAllBlogs', checkAuth, blogController.getAllBlog)
router.post('/addNewBlog', checkAuth, [ 
    check('title', "Title should have min 3 character and max 20 character")
    .exists()
    .notEmpty()
    .isLength({min : 3, max : 20}),
    check('description', 'Please Insert Atlest 20 character')
    .exists()
    .notEmpty()
    .isLength({min : 20})
] ,blogController.addNewBlog)
router.put('/:blogId', checkAuth, [
    check('title', "title should have min 3 character and max 20 character")
    .exists()
    .notEmpty()
    .isLength({min : 3, max : 20}),
    check('description', 'in the Blog Description Please Insert Atlest 20 character')
    .exists()
    .notEmpty()
    .isLength({min : 20})
],blogController.updateBlog)
router.delete('/:blogId', checkAuth,  blogController.deleteBlog)
router.get('/:blogId', checkAuth, blogController.getOneBlog)
router.post('/updateImage/:imageId', checkAuth, blogController.updateImage)


module.exports = router;