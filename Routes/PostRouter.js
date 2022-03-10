const router = require("express").Router();
const Post = require("../Models/Post")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getPost} = require("../Middleware/find")

// GET ALL POSTS
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

// GET ONE POST
router.get("/:id", getPost, (req, res, next) => {
    const post = req.params.id
    res.send(res.post);
  });

// REGISTER
router.post("/register", async (req, res)=>{
    const {title, description, categories} = req.body

    const newPost = new Post({
                title: req.body.title,
                description: req.body.description,
                categories: req.body.categories,
            })

    try{
        const post = await newPost.save()
        try{
            const access_token = jwt.sign(
                JSON.stringify(newPost),
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

// LOGIN USER WITH EMAIL AND PASSWORD
router.patch("/login",  async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) res.status(404).json({ message: "Could not find user" });
    if (await bcrypt.compare(password, user.password)) {
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

//UPDATE USERS
router.put("/:id", getUser, async (req, res, next) => {
    const { username, email, password, profilePicture } = req.body;
    if (username) res.user.username = username;
    if (email) res.user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      res.user.password = hashedPassword;
    }
    if (profilePicture) res.user.profilePicture = profilePicture;
    
    try {
      const updatedUser = await res.user.save();
      res.status(201).send(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  })
  
// DELETE A USER
router.delete("/:id", getUser, async (req, res, next) => {
    const user = { id: req.params.id };
    try {
      await res.user.remove();
      res.json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// GET USER FUNCTION
async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
     
      if (user == null){ res.status(404).json({ message: "Could not find user" })};
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.user = user;
    return next();
  }


module.exports = router