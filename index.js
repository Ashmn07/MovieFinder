require('dotenv').config()
const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');

require('./models/users');

app.use(express.json())
app.use(require('./routes'));

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo yeahhh");
})
mongoose.connection.on("error",()=>{
    console.log("err connecting",err);
})

app.listen(PORT,()=>{
    console.log("Server is running",PORT);
})