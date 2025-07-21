const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  department: { 
    type: String, 
    required: [true, 'Department is required'],
    trim: true
  },
  designation: { 
    type: String, 
    required: [true, 'Designation is required'],
    trim: true
  },
}, { timestamps: true });

module.exports = mongoose.model("Faculty", FacultySchema);
