const router = require("express").Router();
const Comment = require("../Models/Comment")
const Post = require("../Models/Post")
const User = require("../Models/User")
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../Middleware/authenticate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {getComment} = require("../Middleware/find")

// GET ALL COMMENTS BY USERNAME
router.get("/", [verifyTokenAndAuthorization, verifyTokenAndAdmin], async (req, res) => {
    const username = req.query.user
    try {
        let comments;
      if(username){
          comments = await Comment.find({username:username})
      }
    else{
          comments = await  Comment.find()
      }
      res.status(200).json(comments)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

// GET ALL COMMENTS BY ONE USER USING USER id
router.get("/:id", [verifyTokenAndAuthorization, getComment], async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id)
    res.status(200).json(comment);}
    catch(err){
        res.status(500).json(err)
    }
    
  });

// CREATE COMMENT.
router.post("/", [verifyTokenAndAuthorization], async (req, res, next)=>{
    const newComment = new Comment(req.body)
    try{
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    }catch(err){
        res.status(500).json(err)
    }
})

// UPDATE AND REPLACE POST BY POST id
router.put("/:id", [verifyTokenAndAuthorization], async (req, res)=>{
    try{
        const comment = await Comment.findById(req.params.id)
        const post = await Post.findById(req.params.id)
        const user = await User.findById(req.params.id)
        if (user.username === comment.comment){
              try{
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, 
            { new: true }
            );
            res.status(200).json(updatedComment);
        }catch (err) {
            res.status(500).json(err);
        }  
        }else {
            res.status(401).json("You can only update your own comment");
        }
 
    }catch(err){
        res.status(500).json(err);
    }
})
  
// DELETE A POST
router.delete("/:id", [verifyTokenAndAuthorization, getComment], async (req, res, next) => {
    const comment = { id: req.params.id };
    try {
      await res.comment.remove();
      res.json({ message: "comment deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



module.exports = router