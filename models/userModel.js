import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    age:Number,
    profileImage:String

},
    {timestamps:true}
)

export const User=mongoose.model("users", userSchema)