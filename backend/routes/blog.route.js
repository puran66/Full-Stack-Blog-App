const express = require('express');
const upload = require('../middleware/multer');
const { blogController } = require('../controller');
const { authenticate } = require('../middleware/auth');
const route = express.Router();

route.get('/get',authenticate,blogController.getBlogs);
route.post('/create',authenticate,upload.single('image'),blogController.createblog);
route.put('/update/:id',authenticate,upload.single('image'),blogController.updateBlog);
route.delete('/delete/:id',authenticate,blogController.deleteBlog);
route.get('/user-blogs',authenticate,blogController.getUserBlogs)

module.exports = route;
