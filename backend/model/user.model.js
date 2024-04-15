const mongoose = require('mongoose');
const { randomBytes, createHmac } = require('crypto')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
  }
})

userSchema.pre('save', function (next) {
  try {
    const user = this;

    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;

    next();

  } catch (error) {
    console.log(error, "from haxing password");
  }
})


const user = mongoose.model('user', userSchema);

module.exports = user;