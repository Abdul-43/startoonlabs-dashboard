import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  gender: {
    type: "string",
    required: true,
  },
  count: {
    type: Number,
  },
  lastLoginDate: {
    type: "string",
  },
});

export default mongoose.model("User", userSchema);
