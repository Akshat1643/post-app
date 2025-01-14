const mongoose = require("mongoose")

 const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true
    },
    is_verified:{
        type:Number,
        default:0
    },               
    image:{
        type:String,
        required:true
    },     
    token:{
        type:String,
        default:""
    },
    is_online:{
        type:String,
        default:'0'
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'post' }
    ],
},
{ timestamps:true }
)
module.exports = mongoose.model('User',userSchema)