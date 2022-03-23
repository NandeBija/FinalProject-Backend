const router = require("express").Router();
const Booking = require("../Models/Booking")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getPost} = require("../Middleware/find")


// CREATE A BOOKING
router.post("/",  async(req, res, next)=>{
    const {username, city, date, time, email, phone, photographer_name} = req.body
    const newBooking = await new Booking(req.body)

    try{
        const savedBooking = await newBooking.save()
        res.status(200).json(savedBooking)
    }catch(error){
        res.status(500).json(error)
    }
});

// GET ALL BOOKINGS

router.get("/", [verifyTokenAndAdmin, verifyTokenAndAuthorization], async (req, res) => {
    const username = req.query.user   
    try {
        let bookings;
      if(username){
          bookings = await Booking.find({username:username})
      }
    else{
        bookings = await  Booking.find()
      }
      res.status(200).json(bookings)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });


module.exports = router