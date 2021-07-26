const mongoose = require("mongoose");

const PinSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
  },

  title: {
    type: String,
    require: true,
    max: 5,
  },
  desc: {
    type: String,
    min: 5,
    require,
  },
  rating:{
      type: Number,
      min: 0,
      max: 5,
      require
  },
  latitude:{
      type: Number,
      require
  },
  longitude:{
    type: Number,
    require
}

}, {timestamps: true});

module.exports = mongoose.model("Pin", PinSchema);
