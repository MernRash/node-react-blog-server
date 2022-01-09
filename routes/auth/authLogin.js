const express = require('express');

const JWT = require('jsonwebtoken');


const JWT_SecretKey = require('../secretKey/secretKey');

const jwtConfig = {expiresIn : "30000min"}

const app = express();

const userList = require('./user');

/* Setting up Router */
const router = express.Router();

/* Setting UP API for Login */

router.post('/login',(req,res)=>{
    const bodyEmail = req.body.email;
    const bodyPassword = req.body.password;
    console.log(bodyEmail,bodyPassword)

    if(bodyEmail === undefined || bodyPassword === undefined){
        res.status(400).json({success:false,messege:"Please Provide Valid Email and Password"})
        return;
    }    

    const findUser = userList.find((user)=> bodyEmail=== user.email && bodyPassword === user.password );

    // console.log(userList.find((value)=> console.log(value.password,value.email)))

    console.log("from line 33",findUser);

    if(findUser==undefined){
        res.status(401).json({success:false,messege:"Inavlid User"})
        return;
    }


    const payload = {userid : findUser.id};

    try{

        const token = JWT.sign(payload,JWT_SecretKey,jwtConfig);

        res.status(200).json({success:true,messege:"Logged in Succesfully",data:{token}})
    }catch(err){

        res.status(400).json({success:false,messege:"Error While Creating token"})
    }


})



/* /api/v1/auth/signup this is the axios post url which we will give it in react.*/



router.post("/signup",(req,res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    
    console.log(name,password,email);
    if(name === undefined|| password === undefined || email === undefined){
        res.status(400).json({success:false,messege:"Provide All the Detials!"})
        return;
    }

    let id = userList.length + 1 ;

    const user = {id,name,password,email};

    userList.push(user);

    /* it will send UserList to Server */
    // res.status(200).json({success:true,messege:"Welcome SignUp Successfully",userList})
    //const findUser = userList.find((user)=> email== user.email && password == user.password );

    const payload = {userid : user.id};

    try{

        const token = JWT.sign(payload,JWT_SecretKey,jwtConfig);

        res.status(200).json({success:true,messege:"SignedUp Succesfully",data:{token}})
    }catch(err){

        res.status(400).json({success:false,messege:"Error While Creating token in Signup"})
    }


})

module.exports = router;