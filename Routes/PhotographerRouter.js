const router = require("express").Router();
const Photographer = require("../Models/Photographer")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getPhotographer} = require("../Middleware/find")



// REGISTER AS A PHOTOGRAPHER
router.post("/register/", async (req, res)=>{
  const {name, email, password} = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const newUser = new User({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
          })

  try{
      const user = await newUser.save()
      try{
          const access_token = jwt.sign(
              JSON.stringify(newUser),
              process.env.ACCESS_TOKEN_SECRET
          );  
          
      res.status(201).json({  jwt: access_token})
      } catch(error){
          res.status(500).json({message: error.message})
      }
  }catch(error){
      res.status(400).json({message: error.message})

  }

})

// LOGIN AS PHOTOGRAPHER WITH EMAIL AND PASSWORD
router.patch("/login/photographer",  async (req, res, next) => {
  const { email, password } = req.body;
  const photographer = await Photographer.findOne({ email });

  if (!photographer) res.status(404).json({ message: "Could not find photographer" });
  if (await bcrypt.compare(password, photographer.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(user),
        process.env.MONGO_PASS 
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Email and password combination do not match" });
  }
}); 



// CREATE A NEW PHOTOGRAPHER PROFILE
router.post("/proifle", [verifyTokenAndAuthorization], async(req, res, next)=>{
    const {name, rate, services, projects} = req.body
    const newPhotographer = await new Photographer(req.body)

    try{
        const savedPhotographer = await newPhotographer.save()
        res.status(200).json(savedPhotographer)
    }catch(error){
        res.status(500).json(err)
    }
});





// GET ALL photographers using authenticated user token
router.get("/", [verifyTokenAndAdmin, verifyTokenAndAuthorization], async (req, res) => {
    const username = req.query.user   
    try {
        let photographers;
      if(username){
          photographers = await Photographer.find({username:username})
      }
    else{
        photographers = await  Photographer.find()
      }
      res.status(200).json(photographers)
    } catch (error) {
      res.status(500).send({ message: error.message });
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


module.exports = router;