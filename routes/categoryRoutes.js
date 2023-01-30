const express = require('express')
const router = express.Router();
const categoryController = require('../controller/categoryController')
const checkAuth = require('../Authentication/checkAuth')

router.get('/getAllCategory', checkAuth,  categoryController.getAllCategory)
router.post('/addNewCategory', checkAuth, categoryController.addNewCategory)
router.delete('/:categoryId', checkAuth, categoryController.deleteCategory)
router.patch('/:categoryId', checkAuth, categoryController.updateCategory)

module.exports = router;