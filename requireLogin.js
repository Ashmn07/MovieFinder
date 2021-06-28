const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const JWT_SECRET = "Knicksin7"

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if(!authorization){
        res.statusCode = 401;
        return res.json({error:"Unauthorized"})
    }

    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            res.statusCode = 401;
            res.json({error:"Unauthorized"})
        }
        const{_id} = payload
        User.findById(_id)
        .then(userdata =>{ 
            req.user = userdata
            next()
        })
    })
}