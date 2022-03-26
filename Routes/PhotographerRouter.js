const router = require("express").Router();
const Photographer = require("../Models/Photographer")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getPhotographer} = require("../Middleware/find")


// CREATE NEW PHOTOGRAPHER 
router.post("/", [verifyTokenAndAuthorization], async(req, res, next)=>{
    const {name, rate, services, projects, role} = req.body
    const newPhotographer = await new Photographer(req.body)

    try{
        const savedPhotographer = await newPhotographer.save()
        res.status(200).json(savedPhotographer)
    }catch(error){
        res.status(500).json(error)
    }
});

// GET ALL photographers using authenticated user token
router.get("/",  verifyTokenAndAuthorization, async (req, res) => {
    const username = req.query.user   
    try {
        let photographers;
      if(username){
          photographers = await Photographer.find({username:username})
      }
    else{
        photographers = await  Photographer.find()
      }
      return res.status(200).json(photographers)
    } catch (error) {
     return  res.status(500).send({ message: error.message });
    }
  });
  
//   // GET ALL PHOTOGRAPHERS BY ID USER USING USER id
router.get("/:id", [verifyTokenAndAdmin, verifyTokenAndAuthorization , getPhotographer], async (req, res) => {
    try{
        const photographer = await Photographer.findById(req.params.id)
    res.status(200).json(photographer);}
    catch(err){
        res.status(500).json(err) 
    }
    
  });

// UPDATE AND REPLACE previous photographer information 

router.put("/:id", [verifyTokenAndAuthorization, getPhotographer], async (req, res, next) => {
  const { name , rate, services, projects } = req.body;
  if (name ) res.photographer.name  = name ;
  if (rate) res.photographer.rate = rate;
  if (services) res.photographer.services = services;

  if (projects) res.photographer.projects = projects;
  
  try {
    const updatedPhotographer = await res.photographer.save();
    res.status(201).send(updatedPhotographer);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE A Photgrapher
router.delete(
  "/:id",
  [verifyTokenAndAuthorization, getPhotographer],
  async (req, res, next) => {
    const photographer = { id: req.params.id };
    try {
      await res.photographer.remove();
      res.json({ message: "photographer deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;