const User = require("../Models/User");
const Post = require("../Models/Post");
const Photographer = require("../Models/Photographer");

   // Get User function
async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
  
      if (!user) res.status(404).json({ message: "Could not find user" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.user = user;
    return next();
  }


     // Get Post function
  async function getPost(req, res, next) {
    let post;
    try {
      post = await Post.findById(req.params.id);
      if (!post) res.status(404).json({ message: "Could not find post!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.post = post;
    return next();
  } 

  // Get BOoking function
async function getBooking(req, res, next) {
  let booking;
  try {
    booking = await Booking.findById(req.params.id);
    if (!booking) res.status(404).json({ message: "Could not find booking!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.booking = booking;
  return next();
}

 // Get photographer function
async function getPhotographer(req, res, next) {
  let photographer;
  try {
    photographer = await Photographer.findById(req.params.id);

    if (!photographer)
      res.status(404).json({ message: "Could not find photographer" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.photographer = photographer;
  return next();
}

  module.exports = { getUser, getPost, getPhotographer, getBooking};