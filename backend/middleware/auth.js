const JWT = require('jsonwebtoken');

const authenticate = (req,res,next) =>{
  try {
    const token = req.cookies.token;
    // console.log(token);

    if(!token){
      res.status(401).json({message: "You are not logged in!"});
    }else{
      const user = JWT.verify(token,process.env.TOKENKEY);
      req.user=user;
      next();
    }
  } catch (error) {
    console.log(error,"from authenticate");
  }
}

module.exports = {authenticate};