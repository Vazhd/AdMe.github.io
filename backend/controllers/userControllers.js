const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const tokenService = require("../config/tokenService")
const bcrypt = require("bcrypt")

const registerUser = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const pic = req.body.pic;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({email: email})
    console.log(email)

    if (userExists) {
        throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(password,3)
    const user = await User.create({name, email, password:hashPassword, pic});


    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            // token:tokenService(user._id)
            token: tokenService.generateToken({user})

        });}
        else {
            res.status(400);
            throw new Error("Fail")
    }
    const token = tokenService.generateToken({user})
    await tokenService.saveToken(user.id,token.refreshToken)
    return{...token, email:userExists}
})
module.exports = {registerUser}
