//Thiis is the controller for contact us page
//Various Imports
const nodemailer = require("nodemailer");
require("dotenv").config();
const { body, validationResult } = require('express-validator');


//This controller is for the contact us page and will handle the mail sending feature of contact us page
const contact = [
  // Validate and sanitize request body
  //trim removes whitespaces
  //escape replaces HTML special characters
  //normalizeEmail to normalize email 
  body('name').notEmpty().withMessage('Name is required').trim().escape(),
  body('subject').notEmpty().withMessage('Subject is required').trim().escape(),
  body('message').notEmpty().withMessage('Message is required').trim().escape(),
  body('email').isEmail().withMessage('Email is not valid').normalizeEmail(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", error: errors.array() });
    }
    try {
      const { name, subject, message, email } = req.body;

      const hostemail = process.env.HOSTEMAIL;
      const hostpass = process.env.HOSTPASSWORD;

      // transporter
      const transporter = nodemailer.createTransport({

        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        logger: true,
        debug: false,
        secureconnection: true,
        auth: {
          user: hostemail,
          pass: hostpass,
        },

      });
      //Setting up mail options for node mailer
      try {
        const mailOptions = {
          from: email,
          to: hostemail,
          subject: subject,
          html: `<p>Name: ${name}</p>
               <p>User Email: ${email}</p>
               <p>Message: ${message}</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ status: "success", message: "We will get back to you soon " });
      }
      catch (error) {
        res.status(500).json({ status: "error", message: error?.message });
      }
    }
    catch (error) {
      //Unscuccessfull Submission
      res.status(500).json({ status: "error", message: error?.message });
    }

  }
]
//Exporting the contact controller 
module.exports = contact;
