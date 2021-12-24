const express = require('express');
const router = express.Router()
const Category = require('../models/Category')
const checkAuth = require('../middleware/checkAuth')

//Write code here
router.get('/:id?', checkAuth.isAdmin, async (req, res) => {

    if (req.params.id) {
        const category = await Category.findById(req.params.id)
        try {
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send(error)
        }
    } else {
        const categories = await Category.find({})
        try {
            res.status(200).send(categories)
        } catch (error) {
            res.status(500).send(error)
        }
    }

});


router.post('/create', checkAuth.isAdmin, async (req, res) => {
    const category = new Category(req.body)

    try {
        await category.save();
        res.status(200).send(category)
    } catch (err) {
        res.status(500).send(error)
    }


})

router.put('/update/:id', checkAuth.isAdmin, async (req, res) => {

    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body)

        if (!updatedCategory) {
            res.status(404).send("No item found!")
        } else {
            res.status(200).send("Category updated.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/delete/:id', checkAuth.isAdmin, async (req, res) => {

    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id)

        if (!deletedCategory) {
            res.status(404).send("No item found!")
        } else {
            res.status(200).send("Category Deleted.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router
