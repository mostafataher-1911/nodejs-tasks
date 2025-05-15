
const express = require("express");
const router = express.Router();
const postController = require("../Controllers/postController");
const auth = require("../middelware/auth");
router.use(auth);

router.post("/posts", postController.createPost);
router.get("/posts", postController.getAllPosts);
router.get("/posts/:id", postController.getPostById);
router.patch("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

module.exports = router;

