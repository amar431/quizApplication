// models/User.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  testResults: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestResult',
  }],
  points: {
    type: Number,
    default: 0,
  },
},{timestamps:true});

const User = mongoose.model('users', UserSchema);

export default User