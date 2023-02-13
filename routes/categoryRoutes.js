const express = require('express')
const router = express.Router();
const categoryController = require('../controller/categoryController')
const checkAuth = require('../Authentication/checkAuth')
const { check } = require('express-validator')

router.get('/getAllCategory', checkAuth, categoryController.getAllCategory)
router.post('/addNewCategory', checkAuth, [
    check('category', "Title should have min 3 character and max 20 character")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 20 })
], categoryController.addNewCategory)
router.delete('/:categoryId', checkAuth, categoryController.deleteCategory)
router.post('/:categoryId', checkAuth,[
    check('category', "Title should have min 3 character and max 20 character")
        .exists()
        .notEmpty()
        .isLength({ min: 3, max: 20 })
] ,categoryController.updateCategory)

module.exports = router;