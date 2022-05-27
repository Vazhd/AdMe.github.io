require("dotenv").config()
const mongoose = require("mongoose");
const express = require('express')
const userRoutes = require("./routes/userRoutes")
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
// const generateToken=(payload)=>{
//     const accessToken =jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'30m'})
//     return { accessToken}
// }
app.use('/api/user', userRoutes)
const start = async() => {
    try{
        await mongoose.connect('mongodb+srv://user:pass@cluster0.t02im.mongodb.net/addmee?retryWrites=true&w=majority',{
            useNewUrlParser:true,
        });
        app.listen(PORT,console.log(`Server port ${PORT}`))
    }catch (e){
        console.log("Error:"+e)
    }
}



start()

