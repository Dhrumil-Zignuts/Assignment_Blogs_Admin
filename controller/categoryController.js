const express = require(express)
const Category = require('../model/categpryModel')

const addNewCategory = async (req,res)=>{

    const newCategory = new Category({
        newCategory : req.body.category
    })

    newCategory.save().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send(err)
    })
}
const deleteCategory = async (req,res) =>{
    const id = req.params.categoryId;
    
}
module.exports = {
    addNewCategory
}