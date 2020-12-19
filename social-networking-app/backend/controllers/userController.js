import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Post from "../models/Post.js";

// insert new post

const insertUserPost = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//to get posts
const getUserPost = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// insert likes
const insertLikeOnPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if post has allready liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

//  unlike post
const insertUnLikeOnPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if post has unliked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post already unliked" });
    }
    // remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// insert comment
const insertCommentOnPost = asyncHandler(async (req, res) => {
  
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const newComment = {
      text: req.body.text,
      name: user.name,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// post user login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// regester user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, city, state, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user allready exists");
  }
  const user = await User.create({
    name,
    email,
    city,
    state,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


//update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.state = req.body.state || user.state;
    user.city = req.body.city || user.city;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      city: updatedUser.city,
      state: updatedUser.state,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//to get user by city || state 
const getUserWithAddress = asyncHandler(async (req, res) => {
 
const user=await User.find({
  "$or": [{
    "state": req.params.address
  }, {
      "city": req.params.address
  }]
} )
     if(!user){
          return res.status(404).json({msg:'No user found'});
      }
      res.json(user);
      
  
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  insertUserPost,
  getUserPost,
  insertLikeOnPost,
  insertUnLikeOnPost,
  insertCommentOnPost,
  getUserWithAddress,
};
