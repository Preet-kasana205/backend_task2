const express = require("express");
const router = express.Router();
const Post = require("../models/postmodel");
const jwt = require("jsonwebtoken");

// Middleware (simple version)
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.json({ error: "Invalid token" });
  }
}

// create post
router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content, author: req.user.id });
  await post.save();
  res.json({ message: "Post created" });
});

// read all posts
router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// update post
router.put("/:id", auth, async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Post updated" });
});

// delete post
router.delete("/:id", auth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});

module.exports = router;
