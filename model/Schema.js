const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    username:String,
    password:String,
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})
const user = mongoose.model("Exam(M)",userSchema)
module.exports=user