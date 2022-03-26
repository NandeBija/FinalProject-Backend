const router = require("express").Router();
const PhotographerProfile = require("../Models/PhotographerProfile")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getPhotographer} = require("../Middleware/find")


// CREATE NEW PHOTOGRAPHER 
router.post("/", [verifyTokenAndAuthorization], async(req, res, next)=>{
    const {img, name, city, project_number, following_number, follower, number, about_1, about_2, about_3, proj_1, proj_2, proj_4} = req.body
    const newProfile = await new PhotographerProfile(req.body)

    try{
        const savedProfile = await newProfile.save()
        res.status(200).json(savedProfile)
    }catch(error){
        res.status(500).json(error)
    }
});



// GET ALL photographers using authenticated user token
router.get("/", [verifyTokenAndAdmin, verifyTokenAndAuthorization], async (req, res) => {
    const username = req.query.user   
    try {
        let profiles;
      if(username){
          profiles = await PhotographerProfile.find({username:username})
      }
    else{
        profiles = await  PhotographerProfile.find()
      }
      return res.status(200).json(profiles)
    } catch (error) {
     return  res.status(500).send({ message: error.message });
    }
  });
  
//   // GET ALL PHOTOGRAPHER PROFILES BY ID USER USING USER id
router.get("/:id", [verifyTokenAndAdmin, verifyTokenAndAuthorization ], async (req, res) => {
    try{
        const profile = await PhotographerProfile.findById(req.params.id)
    res.status(200).json(profile);}
    catch(err){
        res.status(500).json(err) 
    }
    
  });

// UPDATE AND REPLACE previous photographer information 

// router.put("/:id", [verifyTokenAndAuthorization, getPhotographer], async (req, res, next) => {
//   const { name , rate, services, projects } = req.body;
//   if (name ) res.photographer.name  = name ;
//   if (rate) res.photographer.rate = rate;
//   if (services) res.photographer.services = services;

//   if (projects) res.photographer.projects = projects;
  
//   try {
//     const updatedPhotographer = await res.photographer.save();
//     res.status(201).send(updatedPhotographer);
//   } catch (error) {
//     res.status(400).json({ message: error.message })
//   }
// })


module.exports = router;