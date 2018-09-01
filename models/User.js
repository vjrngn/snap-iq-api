const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
    age: Number,
    gender: {
      type: String,
      enum: ["m", "f"]
    },
    country: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
