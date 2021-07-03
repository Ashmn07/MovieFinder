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
    waitList:[{
        entName:String,
        entType:String,
        entYear:String,
        entRating:Number,
        entId:String,
    }]
})

mongoose.model('User',userSchema)