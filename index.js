const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');

const MONGOURI = "mongodb+srv://Admin:iWVuy66GhQkq1VfI@cluster0.1fyyg.mongodb.net/no?retryWrites=true&w=majority"

require('./models/users');

app.use(express.json())
app.use(require('./routes'));

mongoose.connect(MONGOURI,{
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