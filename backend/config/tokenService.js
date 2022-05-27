const jwt = require('jsonwebtoken')
// const {commandSupportsReadConcern} = require("mongodb/src/utils");
const tokenModel =require('../models/tokenModel');

class tokenService{
    generateToken=(id)=>{
    const accessToken =jwt.sign({id}, 'secret', {expiresIn:'30m'})
        const refreshToken =jwt.sign({id}, 'secret-refresh', {expiresIn:'30d'})

        return { accessToken, refreshToken}
}
async saveToken(emailId, refreshToken){
    const tokenData = await tokenModel.findOne({email:emailId})
    if(tokenData){
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = await tokenModel.create({email:emailId, refreshToken})
    return token;
}
}
module.exports= new tokenService();