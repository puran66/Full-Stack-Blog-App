const express = require('express');
const { userContoller } = require('../controller');
const route = express.Router();

route.post('/sign-up', userContoller.signUp);
route.post('/login',userContoller.login);
route.post('/update-user/:id',userContoller.updateUser);

module.exports = route;