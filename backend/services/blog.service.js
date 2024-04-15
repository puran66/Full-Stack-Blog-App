const { blogSchema } = require("../model")

const createBlog = (title, des, img, author) => {
  return blogSchema.create({ title, description: des, image: img, author })
}

const getBlogs = () => {
  return blogSchema.find({});
}

const verifyId = (_id) => {
  return blogSchema.findById({ _id });
}

const updateBlog = (_id, title, description, image) => {
  return blogSchema.findByIdAndUpdate({ _id }, { title, description, image })
}

const deleteBlog = (_id) => {
  return blogSchema.findByIdAndDelete({ _id });
}

const getUserBlogs = (author) => {
  return blogSchema.find({ author });
}

module.exports = { createBlog, getBlogs, verifyId, updateBlog, deleteBlog, getUserBlogs }