const router = require("express").Router();
const Contact = require("../Models/Contact")
const Post = require("../Models/Post")
const User = require("../Models/User")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const dotenv = require('dotenv');
dotenv.config();

// Setting up nodemailer
// async function mainMail(name, email, subject, message) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.PASSWORD,
//     },
//   });
//   const mailOption = {
//     from: process.env.GMAIL_USER,
//     to: process.env.EMAIL,
//     subject: subject,
//     html: `You got a message from 
//     Email : ${email}
//     Name: ${name}
//     Message: ${message}`,
//   };
//   try {
//     await transporter.sendMail(mailOption);
//     return Promise.resolve("Message Sent Successfully!");
//   } catch (error) {
//     console.log(error)
//     return Promise.reject(error);
//   }
// }

// GET ALL CONTACTS BY USERNAME
router.get("/", [ verifyTokenAndAdmin], async (req, res) => {
    const username = req.query.user
    try {
        let contacts;
      if(username){
          contacts = await Contact.find({username:username})
      }
    else{
          contacts = await  Contact.find()
      }
      res.status(200).json(contacts)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

// GET ALL CONTACTS BY ONE USER USING USER id
router.get("/:id",  [ verifyTokenAndAdmin], async (req, res) => {
    try{
        const contact = await Contact.findById(req.params.id)
    res.status(200).json(contact);}
    catch(err){
        res.status(500).json(err)
    }
    
  });

// WRITE TO US/ CREATE A MESSAGE.
router.post("/",  async (req, res, next)=>{
    // Setting up nodemailer
// async function mainMail(name, email, subject, message) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.PASSWORD,
//     },
//   });
//   const mailOption = {
//     from: process.env.GMAIL_USER,
//     to: process.env.EMAIL,
//     subject: subject,
//     html: `You got a message from 
//     Email : ${email}
//     Name: ${name}
//     Message: ${message}`,
//   };
//   try {
//     await transporter.sendMail(mailOption);
//     return Promise.resolve("Message Sent Successfully!");
//   } catch (error) {
//     console.log(error)
//     return Promise.reject(error);
//   }
// }
});
//   try {
//     await transporter.sendMail(mailOption);
//     return Promise.resolve("Message Sent Successfully!");
//   } catch (error) {
//     console.log(error)
//     return Promise.reject(error);
//   }

// })


module.exports = router