
const router = require("express").Router();
const Post = require("../Models/Post")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getPost} = require("../Middleware/find")

// GET ALL POSTS with conditions (by username, category name and all that)
router.get("/", async (req, res) => {
    const username = req.query.user
    // const catname = req.query.cat
    try {
        let posts;
      if(username){
          posts = await Post.find({username:username})
      }
    //   else if(catname){
    //       posts = await Postfind({categories:
    //    { $in:[catname]}})
    //   }
    else{
          posts = await  Post.find()
      }
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

// GET ALL POSTS BY ONE USER USING USER id
router.get("/:id", getPost, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
    res.status(200).json(post);}
    catch(err){
        res.status(500).json(err)
    }
    
  });

// CREATE POST.
router.post("/", [verifyTokenAndAuthorization], async (req, res, next)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE AND REPLACE POST BY POST id
router.put("/:id", [verifyTokenAndAuthorization], async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.author){
              try{
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, 
            { new: true }
            );
            res.status(200).json(updatedPost);
        }catch (err) {
            res.status(500).json(err);
        }  
        }else {
            res.status(401).json("You can only update your own post");
        }
 
    }catch(err){
        res.status(500).json(err);
    }
})
  
// DELETE A POST
router.delete("/:id", [verifyTokenAndAuthorization, getPost], async (req, res, next) => {
    const post = { id: req.params.id };
    try {
      await res.post.remove();
      res.json({ message: "Post deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



module.exports = router