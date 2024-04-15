const { userServices } = require("../services");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);

    if (!name || !email || !password) {
      res.status(400).json({ msg: "Please fill all fields" });
    }

    const existingUser = await userServices.userExist(email);
    // console.log(existingUser);

    if (existingUser.length > 0) {
      res.status(409).json({ msg: 'Email already in use' })
    } else {
      const user = await userServices.createUser(name, email, password);

      if (user) {
        res.status(201).json(user);
      } else {
        res.status(500).json({ msg: 'Server error' })
      }
    }

  } catch (error) {
    console.log(error, "from signUp controlller");
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ msg: "please provide email and password" });
    }

    const exist = await userServices.userExist(email);
    // console.log(exist.length===0);

    if (exist.length === 0) {
      res.status(404).json({ msg: 'User not found' });
    }else{
      const verifiedPassword = userServices.verifiedPassword(password, exist);

    if (verifiedPassword) {
      const token = userServices.createToken(exist);
      res.status(200).cookie("token", token).json({
        success: "true",
        token
      })
    } else {
      res.status(401).json({ msg: "Invalid Password" })
    }
    }

  } catch (error) {
    console.log(error, "from login controller");
  }
}

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    if (!id) {
      res.status(400).json("Please provide an ID");
    }

    const verifyId = await userServices.VerifyId(id);

    if (!verifyId) {
      return res.status(404).json('invalid Id!');
    }

    const updatedUser = await userServices.updateUser(id, updates);

    res.status(200).json({
      success: true,
      updatedUser
    })
  } catch (error) {
    console.log(error, "from update user controller");
  }
}


module.exports = { signUp, login, updateUser };