const express = require('express');

const JWT = require('jsonwebtoken');


const JWT_SecretKey = require('../secretKey/secretKey');

const jwtConfig = { expiresIn: "30000min" }

const app = express();



/* Setting up Router */
const router = express.Router();

/* MongoDB Schema Model */
const UserModel = require("../../dataModels/userModel");
const verifyToken = require('../middleware');

/* Setting UP API for Login */

let bodyEmail,bodyPassword;

router.post('/login', (req, res) => {
    let userId;
     bodyEmail = req.body.email;
     bodyPassword = req.body.password;
    // console.log(bodyEmail, bodyPassword)

    if (bodyEmail === undefined || bodyPassword === undefined) {
        res.status(400).json({ success: false, messege: "Please Provide Valid Email and Password" })
        return;
    }
    console.log(bodyEmail,bodyPassword,"from login details")

    /* UserModel while connected to Database to find Email in DAtabase  */
    UserModel.findOne({ email: bodyEmail }, (err, user) => {

        if (err) throw err;

        if (user) {

            if (bodyPassword === user.password) {
                const payload = { userId : user._id };
                console.log("Payload here",payload)
                try {
                    const token = JWT.sign(payload, JWT_SecretKey, jwtConfig);
                    res
                        .status(200)
                        .json({
                            success: true,
                            message: "Login Successfully",
                            data: { token },
                        });
                } catch (error) {
                    res
                        .status(400)
                        .json({ success: false, message: "Error while Creating Token" });
                }
            } else {
                res.json({ success: false, message: "Please Provide Correct Password" })
                return;
            }
        } else {
            res.json({ success: false, message: "user does not exist" })
            return
        }
    });

});







/* /api/v1/auth/signup this is the axios post url which we will give it in react.*/



router.post("/signup", (req, res) => {
    console.log("Its Signup Route Started")
    let userId;
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    console.log(req.name,req.email,req.password,"request object comes from signup field");
    if (name === undefined || password === undefined || email === undefined) {
        res.status(400).json({ success: false, message: "Provide All the Detials!" })
        return;
    }

    UserModel.findOne({ email: email }, (err, user) => {
        if (err) throw err;

        if (user) {
            console.log("User Email is ", user.email)
            res.json({ success: false, message: "User Already Exist" });
        } else {
            const user1 = new UserModel({
                name,
                email,
                password,
            })

            user1.save()
                .then((res) => {
                    console.log(`User Registered Successfully ${res}`);
                    userId = res._id;
                })
                .catch((err) => {
                    console.log(`${err}`)
                })


            const payload = { userId };
            try {
                const token = JWT.sign(payload, JWT_SecretKey, jwtConfig);
                console.log(token);
                res
                    .status(200)
                    .json({
                        success: true,
                        message: "SignUp Successfully",
                        data: { token },
                    });
            } catch (error) {
                res
                    .status(400)
                    .json({ success: false, message: "Error while Creating Token" });
            }
        }
    });



})

router.get("/user-details",verifyToken,(req,res)=>{

    console.log(bodyEmail,bodyPassword,"from user details")
    let requestfromDB = res;
    // console.log(requestfromDB)
    UserModel.findOne({email:bodyEmail},(err,docs)=>{
        if (err) throw err;

        if(docs){
            

                res.status(200).json({success:true,message:"data fetched properly",data:{docs}})
            
           
        }
        // console.log(docs,"docs from DB")
    })
    
})





module.exports = router;