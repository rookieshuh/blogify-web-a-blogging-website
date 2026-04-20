require('dotenv').config();
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/blogApp");

const blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = blogModel;