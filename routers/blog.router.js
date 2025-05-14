const controller = require("../controllers/index");
const router = require("express").Router();
const validation = require("../validations/index");

router.post(
  "/createBlog",
  [validation.blogValidator.validateCreate()],
  controller.blog.createBlog
);

router.delete("/deleteBlog", controller.blog.deleteBlog);

router.get("/getAllBlogs", controller.blog.getAllBlogs);

module.exports = {
    blog: router,
  };