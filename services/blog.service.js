const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const fileService = require("./file.service");

exports.createBlog = async (req) => {
  try {
    const { title, text, author, backgroundImage } = req.body;

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
      backgroundImage,
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
    const { blogId } = req.params;

    const existBlog = await Blog.findById(blogId);
    if (!existBlog) {
      throw new Error("Blog bulunamadı");
    }

    const user = await User.findById(existBlog.author);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }

    user.blogs = user.blogs.filter(
      (blogItem) => blogItem.blogId.toString() !== blogId
    );
    await user.save();

    await Blog.findByIdAndDelete(blogId);

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

exports.likeBlog = async (req) => {
  try {
    const { blogId, userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı");
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog bulunamadı");
    }
    const isLiked = user.likedBlogs.some((id) => id.toString() === blogId);
    if (isLiked) {
      throw new Error("Bu blog zaten beğenilmiş");
    }
    const updated = await User.findByIdAndUpdate(
      userId,
      { $push: { likedBlogs: blogId } },
      { new: true }
    );
    return "Blog beğenildi";
  } catch (error) {
    throw new Error(error);
  }
};

exports.unlikeBlog = async (req) => {
  try {
    const { blogId, userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı!");
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog bulunamadı!");
    }
    const isLiked = user.likedBlogs.includes(blogId);
    if (!isLiked) {
      throw new Error("Bu blog zaten beğenilmemiş.");
    }
    const unlikedBlog = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedBlogs: blogId } },
      { new: true }
    );
    return unlikedBlog;
  } catch (error) {
    throw new Error(error);
  }
};

exports.uploadBlogPhoto = async (req,res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog bulunamadı");
    }
    console.log("konsol burda");
    
    const imageUrl = await fileService.uploadImage(req, res);
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { backgroundImage: imageUrl },
      { new: true }
    );
    console.log("konsol burda2");

    return updatedBlog;
  } catch (error) {
    throw new Error(error);
  }
};
