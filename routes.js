const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Knicksin7"
const requireLogin = require('requireLogin')

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
                const token = jwt.sign({_id:saveduser._id},JWT_SECRET)
                const {_id,name,email} = saveduser
                res.json({token,user:{_id,name,email}})
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
    const {name,type,year,rating,id,email} = req.body
    if(!name|| !type|| !year|| !rating|| !id || !email){
        res.statusCode = 422;
        return res.json({err:"Data Parsing Error"})
    }
    User.findOneAndUpdate({email:email},{
        $push:{watchList:{name,type,rating,year,movieId:id}}
    },{new:true})
    .then(result=>{
        res.json(result)
    }).catch(err=>{
        return res.status(422).json({error:err})
    })
})

module.exports = router;

