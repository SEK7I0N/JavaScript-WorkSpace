const Express = require("express");
const routes = Express.Router();
const Post = require("../Models/Post");

// -- Shows all the Post
routes.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// -- Show Specific Post
routes.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// -- Submits a Post
routes.post("/", async (req, res) => {
  // -- Here we create our Object which will be saved onto our DB
  const post = Post({
    title: req.body.title,
    description: req.body.description,
  });

  // -- Here we save the object which we previously created to the DB.
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = routes;
