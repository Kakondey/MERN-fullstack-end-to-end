const express = require('express');
const router = express.Router()
const Event = require('../models/Event')
const Comment = require('../models/Comment');
const checkAuth = require('../middleware/checkAuth');
const { verifyToken } = require('../middleware/checkAuth');
//Write code here
router.get('/:id?', async (req, res) => {


   if (req.params.id) {
      try {
         await Event.findById(req.params.id).populate('categories').populate('location').exec((err, result) => {
            if (err) {
               return res.json({ error: err })
            }
            res.status(200).send(result)
         })

      } catch (error) {
         res.status(500).send(error)
      }
   } else {

      try {
         await Event.find({}).exec((err, result) => {
            if (err) {
               return res.json({ error: err })
            }
            res.status(200).send(result)

         })

      } catch (error) {
         res.status(500).send(error)
      }
   }

});


router.post('/create', checkAuth.isAdmin, async (req, res) => {
   const event = new Event(req.body)

   try {
      await event.save();
      res.status(201).send(event)
   } catch (err) {
      res.status(500).send(err)
   }

})


router.patch('/update/:id', checkAuth.isAdmin, async (req, res) => {

   try {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body)

      if (!updatedEvent) {
         res.status(404).send("No item found!")
      } else {
         res.status(200).send("Event updated.")
      }
   } catch (error) {
      res.status(500).send(error)
   }
})


router.delete('/delete/:id', checkAuth.isAdmin, async (req, res) => {

   try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id)

      if (!deletedEvent) {
         res.status(404).send("No item found!")
      } else {
         res.status(200).send("Event Deleted.")
      }
   } catch (error) {
      res.status(500).send(error)
   }
})

router.get('/comments/:eventId', async (req, res) => {
   try {

      const comments = await Comment.find({ event: req.params.eventId }).sort('-createdAt').populate('user')
      res.status(200).send(comments)
   } catch (err) {
      res.status(500).send("comments not found")
   }
})

router.post('/comments/create', checkAuth.verifyToken, async (req, res) => {
   const comment = new Comment(req.body)

   try {
      await comment.save();
      res.status(201).send(comment)
   } catch (err) {
      res.status(500).send(err)
   }
})

module.exports = router