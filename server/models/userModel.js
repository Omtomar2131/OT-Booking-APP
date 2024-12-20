const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:true,
    },
    isAdmin:{
        type:Boolean,
        default:true,
    }
},{
    timestamps:true
}
)

module.exports = mongoose.model("User",userSchema)