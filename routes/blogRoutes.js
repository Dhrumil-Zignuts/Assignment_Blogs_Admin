const express = require('express')
const router = express.Router();
const blogController = require('../controller/blogController')

router.get('/getAllBlogs', blogController.getAllBlog)
router.post('/addNewBlog', blogController.addNewBlog)
router.put('/:blogId', blogController.updateBlog)
router.delete('/:blogId', blogController.deleteBlog)
router.get('/:blogId', blogController.getOneBlog)


module.exports = router;