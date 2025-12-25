import mongoose from "mongoose";

const bookSchema= new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },

    description:{
        type:String
    },
    author:{
        type:String,
        required:true
    },
    price:Number

},
    {timestamps:true}
)

export const Book=mongoose.Schema('books', bookSchema)