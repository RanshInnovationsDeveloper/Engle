const nodemailer = require("nodemailer");
require("dotenv").config();
const { body, validationResult } = require('express-validator');


const contact = [
// Validate request body
body('name').notEmpty().withMessage('Name is required'),
body('subject').notEmpty().withMessage('Subject is required'),
body('message').notEmpty().withMessage('Message is required'),
body('email').isEmail().withMessage('Email is not valid'),

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    // Successful Submision
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    //Unscuccessfull Submission
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
]

module.exports = contact;
