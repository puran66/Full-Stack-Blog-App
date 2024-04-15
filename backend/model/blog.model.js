const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  image: {
    type: String,
    reuired: true
  },
  description:{
    type: String,
    required: true
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  }
})

const Blog = mongoose.model( 'blog', blogSchema );
module.exports=Blog;