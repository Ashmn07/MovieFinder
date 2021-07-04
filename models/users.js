const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    watchList:[{
        entName:String,
        entType:String,
        entYear:String,
        entRating:Number,
        entId:String,
        entPic:String
    }]
})

mongoose.model('User',userSchema)