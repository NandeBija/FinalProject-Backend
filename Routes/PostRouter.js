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

// GET ALL POSTS BY ONE USER USING USER id
router.get("/:id", getPost, (req, res) => {
    const post = req.params.id
    res.send(res.post);
  });

// CREATE POST... FROM THE YOUTUBE VIDEO CODE
router.post("/", async (req, res, next)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})


//UPDATE POST
// router.put("/:id", getPost, async (req, res, next) => {
//     const { title, description, photo, categories } = req.body;
//     if (title) res.user.title = title;
//     if (description) res.user.description = description;
//     if (photo) res.user.photo = photo;
//     if (categories) res.user.categories = categories;
    
//     try {
//       const updatedPost = await res.post.save();
//       res.status(201).send(updatedPost);
//     } catch (error) {
//       res.status(400).json({ message: error.message })
//     }
//   })

// UPDATE AND REPLACE POST BY POST id
router.put("/id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
              try{
            const updatedPost = await Post.findById(req.params.id, {
                $set: req.body
            }, {new:true})
            res.status(200).json(updatedPost)
        }catch(err){

        }  
        }else{
            res.status(101).json("You can only update your own post")
        }
 
    }catch(err){
        res.status(500).json(err)
    }
})
  
// DELETE A POST
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