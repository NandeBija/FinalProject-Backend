const router = require("express").Router();
const Contact = require("../Models/Contact")
const Post = require("../Models/Post")
const User = require("../Models/User")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
router.post("/", [verifyTokenAndAuthorization], async (req, res, next)=>{
    const newContact = new Contact(req.body)
    try{
        const savedContact = await newContact.save()
        res.status(200).json(savedContact)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router