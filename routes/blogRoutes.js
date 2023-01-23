const express = require('express')
const router = express.Router();
const blogController = require('../controller/blogController')

router.get('/getAllBlogs', blogController.getAllBlog)
router.post('/addNewBlog', blogController.addNewBlog)
router.patch('/:blogId', blogController.updateBlog)
router.delete('/:blogId', blogController.deleteBlog)


module.exports = router;