const { blogServices, userServices } = require("../services");

const createblog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file.path;

    // console.log(title, description, image);
    if (!title || !description) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const author = await userServices.getUserId(req.cookies.token);
    // console.log(author);

    const blog = await blogServices.createBlog(title, description, image, author);

    res.status(201).json({
      success: true,
      blog
    })

  } catch (error) {
    console.log(error, "from create blog controller");
  }
}

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogServices.getBlogs();

    res.status(200).json({
      success: true,
      blogs
    })
  } catch (error) {
    console.log(error, "from getblogs controller");
  }
}

const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, image } = req.body;

    const verifyId = await blogServices.verifyId(id);
    if (!verifyId) {
      return res.status(400).json({ msg: "Invalid Blog ID!" })
    }
    let updateBlog;
    if (req.file) {
      const fileImage = req.file.path;
      updateBlog = await blogServices.updateBlog(id, title, description, fileImage);
    } else {
      updateBlog = await blogServices.updateBlog(id, title, description, image);
    }

    res.status(200).json({
      success: true,
      data: updateBlog
    });
  } catch (error) {
    console.log("Error in updating the blog", error);
  }
}

const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;

    const verifyId = await blogServices.verifyId(id);
    if (!verifyId) {
      return res.status(400).json({ msg: "Invalid Blog ID!" })
    }

    const deletedBlog = await blogServices.deleteBlog(id);

    res.status(200).json({
      success: true,
      deletedBlog
    })
  } catch (error) {
    console.log(error, "from delete blog controller");
  }
}

const getUserBlogs = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ msg: "You are not logged In" })
    } else {
      const userId = await userServices.getUserId(req.cookies.token);

      const userBlogs = await blogServices.getUserBlogs(userId);

      res.status(200).json({
        success: true,
        userBlogs
      })
    }
  } catch (error) {
    console.log(error, "from user blogs");
  }
}

module.exports = { createblog, getBlogs, updateBlog, deleteBlog, getUserBlogs };