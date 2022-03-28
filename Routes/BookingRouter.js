const router = require("express").Router();
const Booking = require("../Models/Booking")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getBooking} = require("../Middleware/find")


// CREATE A BOOKING
router.post("/", verifyTokenAndAuthorization,  async(req, res, next)=>{
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

  // GET ONE BOOKING
router.get("/:id", [verifyTokenAndAdmin, getBooking], (req, res, next) => {
    res.send(res.booking);
  });

  //UPDATE Booking
router.put(
    "/:id",
    // [verifyTokenAndAuthorization, getBooking],
    async (req, res, next) => {
      const { username,city, date, time, email, phone, photographer_name } = req.body;
      if (username) res.user.username = username;
      if (city) res.user.city = city;
      if (date) res.user.date = date;
      if (time) res.user.time = time;
      if (email) res.user.email = email;
      if (phone) res.user.phone = phone;
      if (photographer_name) res.user.photographer_name = photographer_name;  
      try {
        const updatedBooking = await res.booking.save();
        res.status(201).send(updatedBooking);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  );

// DELETE A Booking
router.delete(
    "/:id",
    [verifyTokenAndAuthorization, getBooking],
    async (req, res, next) => {
      const booking = { id: req.params.id };
      try {
        await res.booking.remove();
        res.json({ message: "Booking deleted" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );


module.exports = router