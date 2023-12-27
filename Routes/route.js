const Routes=require("express")
const user = require("../model/Schema")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const auth = require("../middleware/auth")
const app=Routes()

app.get("/",(req, res) => {
    res.send("Welcome")
})
app.get("/register",(req, res) => {
    res.render("singup")
})
app.post("/register",async(req, res) => {
    const {username, password,role}=req.body
    let find=await user.findOne({username:username})
    if(find){
        res.send("user already registered")
    }
    else{
        let hash=await bcrypt.hash(password,10)
        let create=await user.create({username,password:hash,role})
        res.cookie("value",hash).send(create)
    }
})
app.get("/login",(req, res) => {
    res.render("login")
})
app.post("/login",async(req, res) => {
    const {username,password,role}=req.body
    let find=await user.findOne({username:username})
    if(!find){return res.send("username and password are incorrect")}

    let pass=await bcrypt.compare(password,find.password)
    if(find.username != username || !pass)
    {return res.send("username and password are incorrect")}

    let token=jwt.sign({id:find.id},"kdfhghdfhgdfhgdfhgkjdh")
    res.cookie("role",find.role).redirect("/home")
})
app.get("/home",auth,(req, res) => {
    res.render("index")
})
module.exports=app