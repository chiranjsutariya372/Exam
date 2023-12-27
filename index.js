const express=require("express");
const connect = require("./config/db");
const app = require("./Routes/route");
const cookieparser=require("cookie-parser");
const blog = require("./Routes/blog");
const route=express()

route.set("view engine","ejs")
route.use(express.static(__dirname+"/public"))
route.set("views",__dirname+"/views")
route.use(express.urlencoded({ extended:true }))
route.use(express.json())
route.use(cookieparser())
route.use(blog)
route.use(app)
route.listen(8090,()=>{
    console.log("listening on 8090");
    connect()
})