const Routes=require("express")
const user = require("../model/Schema")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Blog = require("../model/Blog")
const auth = require("../middleware/auth")
const blog=Routes()

blog.get("/blog",auth,(req, res) => {
    res.render("Blog")
})
blog.post("/create",async(req, res) => {
    const {title, content,image}=req.body
    let find=await user.findOne({title:title})
    if(find){
        res.send("user already registered")
    }
    else{
        let create=await Blog.create({title,content,image})
        res.cookie("value",title).send(create)
    }
})

module.exports=blog