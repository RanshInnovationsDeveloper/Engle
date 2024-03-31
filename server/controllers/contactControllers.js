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
    return res.status(400).json({ status:"error",error: errors.array() });
  }
  try {
    const { name, subject, message, email } = req.body;
    

    //Setting Up nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: String(process.env.EMAIL),
        clientId: String(process.env.CLIENT_ID),
        clientSecret: String(process.env.CLIENT_SECRET),
        refreshToken: String(process.env.REFRESH_TOKEN),
        accessToken: String(process.env.ACCESS_TOKEN),
      },
    });

    //Setting up mail options for node mailer
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    // Successful Submission
    res.status(200).json({status:"success", message: "We will get back to you soon " });
  } 
  catch (error) {
    //Unscuccessfull Submission
    res.status(500).json({status:"error", error: "Internal Server Error While Submiting" });
  }

}
]
//Exporting the contact controller 
module.exports = contact;
