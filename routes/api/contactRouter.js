const express = require('express');
const contactRouter = express.Router();
const Message = require('../../models/message');

// @route POST api/contact
// @desc Send a message to website developer
// @access Public
contactRouter.post('/',
   async (req, res) => {
      const {name, email, message} = req.body;

      try {
         let newMessage = await Message.create({author_name: name, author_email: email, content: message});
         res.json(newMessage);

      } catch (err) {
         console.log(err.message);
         res.status(500).send('Server error');
      }
   });

module.exports = contactRouter;
