require('dotenv').config()
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const requireLogin = require('./requireLogin')

router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body;
    if(!email || !name || !password){
        res.statusCode = 422;
        return res.json({err:"All fields have not been filled"})
    }
    bcrypt.hash(password,12)
    .then((hashedpassword)=>{
        User.findOne({email:email})
        .then((saveduser)=>{
            if(saveduser){
                res.statusCode = 422;
                return res.json({err:"User with this email already exists"}) 
            }
            const user = new User({
                email,password:hashedpassword,name
            })
            user.save()
            .then((user)=>{
                res.json({message:"User Saved Successfully"})
            })
            .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log(err))
})
   
router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    if(!email|| !password){
        res.statusCode = 422;
        return res.json({err:"Please enter Email and Password"})
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if(!saveduser){
            res.statusCode = 422;
            return res.json({err:"Invalid Email"}) 
        }
        bcrypt.compare(password,saveduser.password)
        .then((match)=>{
            if(match){
                const token = jwt.sign({_id:saveduser._id},process.env.JWT_SECRET)
                const {_id,name,email,watchList} = saveduser
                res.json({token,user:{_id,name,email,watchList}})
            }
            else{
                res.statusCode = 422;
                return res.json({err:"Incorrect Password"})  
            }
        })
        .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log(err))
})  

router.put('/addtolist',requireLogin,(req, res)=>{
    const {name,type,year,rating,id,img} = req.body
    if(!name|| !type|| !id ){
        res.statusCode = 422;
        return res.json({err:"Data Parsing Error"})
    }
    if(!img){
        imgSrc=""
    }
    else{
        imgSrc=img
    }
    User.findByIdAndUpdate(req.user._id,{
        $push:{watchList:{entName:name,entType:type,entRating:rating,entYear:year,entId:id,entPic:imgSrc}}
    },{new:true})
    .select("-password")
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
})

router.put('/removefromlist',requireLogin,(req, res)=>{
    const {type,id} = req.body
    if(!type|| !id ){
        res.statusCode = 422;
        return res.json({err:"Data Parsing Error"})
    }
    User.findByIdAndUpdate(req.user._id,{
        $pull:{watchList:{entType:type,entId:id}}
    },{new:true})
    .select("-password")
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
})

router.get('/watchList',requireLogin,(req,res)=>{
    User.findById(req.user._id)
    .select("watchList")
    .then(result=>{res.json(result)})
    .catch(err=>{return res.status(422).json({error:err})})
})

module.exports = router;

