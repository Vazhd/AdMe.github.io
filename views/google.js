const express=require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const google = express();
const {OAuth2Client} = require('google-auth-library');
var CLIENT_ID='109959458868-bmqa4f8763eggn12gle677r7rqp7vlai.apps.googleusercontent.com'
var mongodb=require('mongodb');
var MongoClient=mongodb.MongoClient;
var mongoUrl='mongodb+srv://Merey:06012004miK!@cluster0.am5px.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var db;
var secret='thisisprojectsecret';
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var cors=require('cors');
google.use(cors());
MongoClient.connect(mongoUrl,(err,client) => {
    if (err) console.log("Error while connecting")
    else db=client.db("Addme");
})

async function verify(client,token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    return ticket.getPayload();
}

google.get('/gauthenticate',async (req, res) => {
    var token=req.query.id_token;
    const client = new OAuth2Client(CLIENT_ID);
    var x=await verify(client,token).catch(console.error);
    if(x.email_verified){
        db.collection("users").find({email:x.email}).toArray((err,result)=>{
            if(err) throw(err);
            if(result.length<1){
                db.collection("users").insert([{
                    name:x.name,
                    email:x.email,
                    password:bcrypt.hashSync(x.at_hash,8)
                }])
                db.collection("users").find({email:x.email}).toArray((e,r)=>{
                    if(e) throw e;
                    var tkn=jwt.sign({id:result[0]._id},secret);
                    res.send({
                        auth:true,
                        token:tkn
                    })
                })
            }else{
                var token=jwt.sign({id:result[0]._id},secret);
                res.send({
                    auth:true,
                    token:token
                })
            }
        })
    }else{
        res.send({
            auth:false,
            message:"User unauthorized"
        })
    }
})