const express = require('express')
const router = express.Router();
const blogController = require('../controller/blogController')




router.post('/addNewBlog', blogController.addNewBlog);



module.exports = router;