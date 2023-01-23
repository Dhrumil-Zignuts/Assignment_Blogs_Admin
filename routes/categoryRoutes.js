const express = require('express')
const router = express.Router();
const categoryController = require('../controller/categoryController')

router.get('/getAllCategory', categoryController.getAllCategory)
router.post('/addNewCategory', categoryController.addNewCategory)
router.delete('/:categoryId', categoryController.deleteCategory)
router.patch('/:categoryId', categoryController.updateCategory)

module.exports = router;