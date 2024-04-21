const Blog = require("../Modals/blog");
const User = require("../Modals/user");

module.exports = {
  createBlog,
  getUserBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getAllBlogs,
};

async function createBlog(req, res) {
  try {
    const { title, description } = req.body;
    const { id } = req;

    if (!title || !description) {
      return res.send({
        success: false,
        status: 404,
        message: "All fields are mandatory.",
      });
    }

    const isUser = await User.findById(id);

    if (!isUser || !isUser?.verified) {
      return res.send({
        success: false,
        status: 404,
        message: "User is not authorized to create post.",
      });
    }

    const newBlog = await Blog.create({ title, description, createdBy: id });

    if (!newBlog) {
      return res.send({
        success: false,
        status: 404,
        message: "New blog is not created successsfully.",
      });
    }

    const { createdBy, ...blog } = newBlog.toObject();

    res.send({
      success: true,
      status: 200,
      message: "New blog is created successfully.",
      blog,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function getUserBlogs(req, res) {
  try {
    const { id } = req;

    const blogs = await Blog.find({ createdBy: id })
      .sort({ createdAt: -1 })
      .select("title createdAt");

    res.send({
      success: true,
      status: 200,
      blogs,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function getBlog(req, res) {
  try {
    const { _id } = req.query;
    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: "Blog id is required.",
      });
    }

    const blog = await Blog.findById(_id).populate({
      path: "createdBy",
      select: "-_id username email",
    });

    if (!blog) {
      return res.send({
        success: false,
        status: 404,
        message: "No such blog found.",
      });
    }

    res.send({
      success: true,
      status: 200,
      blog,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function deleteBlog(req, res) {
  try {
    const { _id } = req.body;
    const { id } = req;

    if (!_id) {
      return res.send({
        success: false,
        status: 404,
        message: "Blog id is required.",
      });
    }

    const blog = await Blog.findById(_id);

    if (!blog || !blog.createdBy.equals(id)) {
      return res.send({
        success: false,
        status: 404,
        message: "User is not authorized to delete this blog.",
      });
    }

    await Blog.findByIdAndDelete(_id);

    res.send({
      success: true,
      status: 200,
      message: "Blog is  delete successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function updateBlog(req, res) {
  try {
    const { title, description, _id } = req.body;
    const { id } = req;

    if (!title || !description || !_id) {
      return res.send({
        success: false,
        status: 404,
        message: "All fields are mandatory.",
      });
    }

    const isBlog = await Blog.findById(_id);

    if (!isBlog || !isBlog.createdBy.equals(id)) {
      return res.send({
        success: false,
        status: 404,
        message: "User is not authorized to create post.",
      });
    }
    await Blog.findByIdAndUpdate(_id, {
      title,
      description,
      updatedAt: Date.now(),
    });

    return res.send({
      success: true,
      status: 200,
      message: "Blog is updated successfully.",
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}

async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find()
      .populate({
        path: "createdBy",
        select: "username -_id",
      })
      .select("-description -updatedAt");

    if (blogs.length == 0) {
      return res.send({
        success: false,
        status: 404,
        message: "No blog is created yet. Be the one to create first blog.",
      });
    }

    res.send({
      success: true,
      status: 200,
      blogs,
    });
  } catch (error) {
    res.send({
      success: false,
      status: 500,
      message: `Error: ${error.toString()}`,
    });
  }
}
