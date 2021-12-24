const express = require('express');
const router = express.Router()
const Location = require('../models/Location')
const checkAuth = require('../middleware/checkAuth')
//Write code here
router.get('/:id?', checkAuth.isAdmin, async (req, res) => {

    if (req.params.id) {

        try {
            const location = await Location.findById(req.params.id)
            res.status(200).send(location)
        } catch (error) {
            res.status(500).send(error)
        }
    } else {

        try {
            const locations = await Location.find({})
            res.status(200).send(locations)
        } catch (error) {
            res.status(500).send(error)
        }
    }

});


router.post('/create', checkAuth.isAdmin, async (req, res) => {
    const location = new Location(req.body)

    try {
        await location.save();
        res.status(200).send(location)
    } catch (err) {
        res.status(500).send(err)
    }

})

router.put('/update/:id', checkAuth.isAdmin, async (req, res) => {

    try {
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body)

        if (!updatedLocation) {
            res.status(404).send("No item found!")
        } else {
            res.status(200).send("Location updated.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/delete/:id', checkAuth.isAdmin, async (req, res) => {

    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id)

        if (!deletedLocation) {
            res.status(404).send("No item found!")
        } else {
            res.status(200).send("Location Deleted.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router