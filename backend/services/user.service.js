const { userSchema } = require("../model")
const { createHmac } = require('crypto')
const JWT = require('jsonwebtoken');

const createUser = (name, email, password) => {
  return userSchema.create({
    name, email, password
  })
}

const userExist = (email) => {
  return userSchema.find({ email });
}

const verifiedPassword = (password, user) => {
  console.log(user);
  const salt = user[0].salt;
  const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

  return hashedPassword === user[0].password;
}

const createToken = (user)=>{
  return JWT.sign({user},process.env.TOKENKEY);
}

const VerifyId= (id) =>{
  return userSchema.findById({_id:id});
}

const updateUser = (_id, data) => {
  return userSchema.findByIdAndUpdate({_id},data)
}

const getUserId= (token)=>{
  const user = JWT.verify(token, process.env.TOKENKEY);
  return user.user[0]._id ? user.user[0]._id : user.user._id ;
}


module.exports = { createUser, userExist, verifiedPassword ,createToken,VerifyId ,updateUser,getUserId }