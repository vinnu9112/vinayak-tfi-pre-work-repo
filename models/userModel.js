import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true,
    },
    languages:{
        type: String,
        required: true,
    },
    availability:{
        type: String,
        required: true,
    },
    answer:{
        type: String,
        required: true,
    },
    role:{
        type: Number,
        default: 0,
    },
})

export default mongoose.model("users", userSchema) 
