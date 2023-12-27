const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",require:true}
});

const Blog = mongoose.model("blog(M)", BlogSchema);

module.exports = Blog;