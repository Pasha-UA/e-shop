const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList);
})

router.post(`/`, async (req, res) => {
    console.log(req.body);
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })

    category = await category.save();
    if (!category) {
        return res.status(400).send('the category not created');
    }
    res.send(category);
})

router.delete(`/:id`, (req, res) => {
    Category.findByIdAndRemove(req.params.id).then(category => {
        if (category) {
            return res.status(200).json({ success: true, message: 'the category is deleted' });
        }
        else {
            return res.status(404).json({ success: false, message: 'category not found' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err })
    })
})

router.get(`/:id`, async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
        return res.status(200).json(category);
    }
    else {
        return res.status(404).json({ success: false, message: 'category not found' });
    }
})

router.put(`/:id`, async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        { new: true }
    )
    if (!category) {
        return res.status(400).send('the category not updated');
    }
    else res.send(category);
})


module.exports = router;