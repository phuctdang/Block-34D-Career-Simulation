const router = require("express").Router();
const { getAllPosts, getPost, createPost, deletePost, updatePost } = require("../db/index.js");
const { requireOwner } = require('./utils.js');


// display all posts
router.get("/", async(req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.send(posts);
  } catch(error) {next(error)};
})


// display specific post
router.get("/:id", async(req, res, next) => {
  try {
    const post = await getPost(req.params.id);
    res.send(post);
  } catch(error) {next(error)};
})


// create posts as the currently logged in user
router.post("/", requireOwner, async(req, res, next) => {
  try{
    const post = await createPost(req.body.title, req.body.content, req.user.id);
    res.send( {Created: post} );
  } catch(error) {next(error)};
})


// update posts as the currently logged in user
router.put("/:id", async(req, res, next) => {
  try {
    const post = await updatePost(req.params.id, req.body.title, req.body.content, req.user.id);
    res.send( {Updated: post} );
  } catch(error) {next(error)};
})


// delete posts as the currently logged in user
router.delete("/:id", requireOwner, async(req, res, next) => {
  try {
    const post = await deletePost(req.params.id);
    res.send( {Deleted: post} );
  } catch(error) {next(error)};
})


module.exports = router;