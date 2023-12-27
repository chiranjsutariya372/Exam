const jwt=require("jsonwebtoken")
const user = require("../model/Schema")
const auth=async(req,res,next)=>{
    let {token}=req.cookies
    if(token){
        let compare=jwt.verify(token,"kdfhghdfhgdfhgdfhgkjdh")
        req.data=await user.findById(compare.id)
        console.log(req.data);
        next()
    }
    else{
        res.redirect("/login")
    }
}

module.exports=auth