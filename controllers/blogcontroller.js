const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

//BLOG CRUD OPERATIONS
//get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    // Finding all blogs and sort by createdAt (newest first)
    const blogs = await blogModel
      .find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate("user", "username")
      .exec();

    if (!blogs.length) {
      return res.status(204).send({
        success: false,
        message: "No Blogs/Content Found",
      });
    }

    return res.status(200).send({
      success: true,
      Blogcount: blogs.length,
      message: "All Blogs List",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting all blogs",
      error,
    });
  }
};

//Create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all fields ",
      });
    }
    //chacking if the user creating blog already exisiting or not
    const existingUser = await userModel.findById(user);
    //existing user validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    //save created blog
    const newBlog = new blogModel({ title, description, image, user });
    //session
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created !! ",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};

//Update blog
exports.updateBlogController = async (req, res) => {
  try {
    //destructure id - we update blog based on id
    const { id } = req.params; //from url
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating blog",
      error,
    });
  }
};

// Get blog by id
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid Blog ID",
      });
    }

    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog Not Found!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Found!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting blog by id",
      error,
    });
  }
};

// Delete blog
exports.deleteBlogController = async (req, res) => {
  try {
    // Destructuring id from url using params
    const blogId = req.params.id;

    // Find the blog by ID and populate the user field
    const blog = await blogModel.findByIdAndDelete(blogId).populate("user");

    // If the blog is not found, return a 404 error
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog with id not found, enter a valid id",
      });
    }

    // Remove the blog from the user's blogs array
    if (blog.user && blog.user.blogs) {
      blog.user.blogs.pull(blog);
      await blog.user.save();
    }

    // Delete the blog
    await blogModel.findByIdAndDelete(blogId);

    return res.status(200).send({
      success: true,
      message: "Deleted blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

//GET user-blog
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blogs found by user!!",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user blog",
    });
  }
};
