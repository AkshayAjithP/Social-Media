const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Password must be at least 6 characters long
//contain at least one uppercase
//one lowercase, one digit, and one special character
const isStrongPassword = (value) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
    value
  );
};
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    unique: true,
    type: String,
    required: [true, "please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide valid mail",
    },
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    validate: {
      validator: validator.isStrongPassword,
      message: "please provide valid password",
    },
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
