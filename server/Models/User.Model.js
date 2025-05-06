import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: {
    type: String,
    enum: ["mr", "mrs", "ms", "dr"],
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  age: {
    type: Number,
    default: 0,
    min: 0,
  },
  dobNotDefined: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  photo: {
    type: Buffer, // Store as binary (or use a URL string if uploaded elsewhere)
    contentType: String,
  },
  currentAddress: {
    type: String,
    required: true,
    trim: true,
  },
  permanentAddress: {
    type: String,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  citizenship:{
    type:String,
    required: true
  },
  idProofType: {
    type: String,
    enum: ["aadhar", "passport", "dl"],
  },
  idProofNumber: {
    type: String,
    trim: true,
  },
  paymentMode: {
    type: String,
    enum: ["GPay", "PhonePe", "Paytm"],
    required: true,
  },
  passportScan: {
    type: Buffer,
    contentType: String,
  },
  aadharScan: {
    type: Buffer,
    contentType: String,
  },
}, {
  timestamps: true,
});

const UserDataSchema = mongoose.model("User", userSchema);
export default UserDataSchema
