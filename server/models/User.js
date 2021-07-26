const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    min: 3,
    max: 20,
  },

  email: {
    type: String,
    require: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    min: 6,
    require,
  },
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
