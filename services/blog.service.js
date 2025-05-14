const Blog = require("../models/blog.model");
const User = require("../models/user.model");

exports.createBlog = async (req) => {
  try {
    const { title, text, author } = req.body;

    const existBlog = await Blog.findOne({ title });
    if (existBlog) {
      throw new Error("Bu isimde blog zaten mevcut");
    }
    const user = await User.findById(author);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    const blog = new Blog({
      title,
      text,
      author,
    });

    user.blogs.push({ blogId: blog._id });
    await user.save();

    await blog.save();

    return blog;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteBlog = async (req) => {
  try {
    const { id } = req.params;

    const existBlog = await Blog.findById(id);
    if (!existBlog) {
      throw new Error("Blog bulunamadı");
    }

    const user = await User.findById(existBlog.author);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    user.blogs = user.blogs.filter(
      (blogItem) => blogItem.blogId.toString() !== id
    );
    await user.save();

    await Blog.findByIdAndDelete(id);

    return "Blog silindi";
  } catch (error) {
    throw new Error(error);
  }
};

exports.getAllBlogs = async () => {
  try {
    return await Blog.find();
  } catch (error) {
    throw new Error(error);
  }
};
