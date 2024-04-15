const express = require('express');
const userRoutes = require('./user.route');
const blogRoutes = require('./blog.route')
const routes = express.Router();


routes.use('/user',userRoutes);
routes.use('/blog',blogRoutes)


module.exports = routes;
