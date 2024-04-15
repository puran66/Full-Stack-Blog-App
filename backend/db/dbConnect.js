const mongoose = require('mongoose');

const dbConncet = () => {
  mongoose.connect(process.env.DBURL).then(() => {
    console.log("Db Connect success");
  }).catch((err) => {
    console.log(err, "from db connect");
  })
}

module.exports = dbConncet;