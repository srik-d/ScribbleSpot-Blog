const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  //mongo db saves it in UTC by default
  { timestamps: true }
);

//name of userModel is User , in compass automatic - users(plural) will be created
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
