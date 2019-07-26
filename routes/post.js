const express = require("express")
const {getPosts, createPost, postsByUser, updatePost, isPoster, deletePost} = require("../controllers/post")
const { requireSignin } = require("../controllers/auth")
const { userById} = require("../controllers/user")
const { postById} = require("../controllers/post")
const {createPostValidator} = require("../validator/index")

const router = express.Router()

router.get("/posts",  getPosts) 
router.post(
    "/post/new/:userId",
     requireSignin,
     createPost,
     createPostValidator 
     ) // requireSignin searchs for validator(middleware) first and only authenticated users can access the post from url
router.get("/posts/by/:userId",requireSignin, postsByUser)
router.put("/post/:postId",requireSignin,isPoster, updatePost) //but working with userId
router.delete("/post/:postId",requireSignin, isPoster, deletePost)
// any route containing : userId, out app will first execute userById()
router.param("userId", userById)
router.param("postId", postById)
module.exports = router
