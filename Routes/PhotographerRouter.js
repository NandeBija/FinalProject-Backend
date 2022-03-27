const router = require("express").Router();
const Photographer = require("../Models/Photographer")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getPhotographer} = require("../Middleware/find")


// CREATE NEW PHOTOGRAPHER 
router.post("/", [verifyTokenAndAuthorization], async(req, res, next)=>{
    const {name, img, insta_img, facebook_img, twitter_img, insta_link, facebook_link, twitter_link, role, city, project_number, follower_number, following_number, projects, about} = req.body
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
  const {name, img, insta_img, facebook_img, twitter_img, insta_link, facebook_link, twitter_link, role, city, project_number, follower_number, following_number, projects, about } = req.body
  if (name ) res.photographer.name  = name ;
  if (img) res.photographer.img = img;
  if (insta_img) res.photographer.insta_img = insta_img;
  if (facebook_img) res.photographer.facebook_img = facebook_img;
  if (twitter_img) res.photographer.twitter_img = twitter_img;
  if (insta_link) res.photographer.insta_link = insta_link;
  if (facebook_link) res.photographer.facebook_link = facebook_link;
  if (twitter_link) res.photographer.twitter_link = twitter_link;
  if (role) res.photographer.role = role;
  if (city) res.photographer.city = city;
  if (project_number) res.photographer.project_number = project_number;
  if (follower_number) res.photographer.follower_number = follower_number;
  if (following_number) res.photographer.following_number = following_number;
  if (projects) res.photographer.projects = projects;
  if (about) res.photographer.about = about;

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