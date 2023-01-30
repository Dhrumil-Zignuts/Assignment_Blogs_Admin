const express = require('express')
const router = express.Router();
const blogController = require('../controller/blogController')
const checkAuth = require('../Authentication/checkAuth')

router.get('/getAllBlogs', checkAuth, blogController.getAllBlog)
router.post('/addNewBlog', checkAuth, blogController.addNewBlog)
router.put('/:blogId', checkAuth, blogController.updateBlog)
router.delete('/:blogId', checkAuth,  blogController.deleteBlog)
router.get('/:blogId', checkAuth,  blogController.getOneBlog)


module.exports = router;