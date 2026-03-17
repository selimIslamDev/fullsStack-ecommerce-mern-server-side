// models/user.js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  imagePublicId: { type: String, default: "" },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false }, // ✅ নতুন
  otp: { type: String, default: null }, // ✅ নতুন
  otpExpiry: { type: Date, default: null }, // ✅ নতুন
  // models/user.js এ যোগ করো
  resetOtp: { type: String, default: null },
  resetOtpExpiry: { type: Date, default: null },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", { virtuals: true });

exports.User = mongoose.model("User", userSchema);
