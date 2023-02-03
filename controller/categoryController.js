// const express = require(express)
const Category = require('../model/categpryModel')
const { check, validationResult } = require('express-validator');


// Get All Category
const getAllCategory = async (req, res) => {
    try {
        const allCategory = await Category.find({})
        res.render('allCategory', { category: allCategory })
    } catch (error) {
        res.status(500).json({
            message: "All Category is not shown",
            error: error
        })
    }
}

// Add New Category
const addNewCategory = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        res.render('errorPage', { alert })
    } else {
        const newCategory = new Category({
            newCategory: req.body.category
        })

        try {
            const addedCategory = await newCategory.save()
            res.redirect('/addNewCategory')
        } catch (error) {
            res.status(500).json({
                message: "category is not added ",
                error: error
            })
        }
    }
}
// Delete Category
const deleteCategory = async (req, res) => {
    const id = req.params.categoryId;

    try {
        const deleteedCategory = await Category.deleteOne({ _id: id })
        res.status(200).json({
            message: "Category is deleted",
            deletedData: deleteedCategory
        })
    } catch (error) {
        res.status(500).json({
            message: "Category id not Deleted",
            error: err
        })
    }
}

// Update Category
const updateCategory = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        res.render('errorPage', { alert })
    } else {
        console.log(req.body);
        console.log(req.params);
        const id = req.params.categoryId;
        try {
            const updatedCategory = await Category.updateOne({ _id: id }, { $set: { newCategory: req.body.editedCategory } })
            res.status(200).json({
                message: "Category is successfully Updated",
                updatedData: updatedCategory
            })
        } catch (error) {
            res.status(500).json({
                message: "Categorry is not updated..!",
                error: error
            })
        }
    }
}

// Exports Functions
module.exports = {
    getAllCategory,
    addNewCategory,
    deleteCategory,
    updateCategory
}