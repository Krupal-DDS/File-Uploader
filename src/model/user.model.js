const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
     username: {
      type: String,
    },
    password:{
      type:String
    },
    loginToken:{
      type:String
    }
    
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    username:this.username
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};
module.exports = mongoose.model("User", UserSchema);
