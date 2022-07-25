
const express = require('express');

const dotenv = require("dotenv");

dotenv.config()

const connectDB = require("./configuration/config")
connectDB();

const app = express();
/* to get response Data inside body */
app.use(express.json());

const cors = require('cors');

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const authRouter = require('./routes/auth/authLogin');

const blogRouter = require('./routes/blogs/blogs');

const clapRouter =  require('./routes/claps/clap');

// const homeRouter = require('./routes/home/home');
/* Server Setup Starts */


/* after reading api url (/api/v1/auth) it will go to authrouter file which authLogin.js for further refrence */

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/blog',blogRouter);
app.use('/api/v1/claps',clapRouter);
// app.use('/api/v1/home',homeRouter);





app.get('/',(req,res)=>{
    res.json({
        success:true,
        messege : "It is a NodeJs Blog Project",
    })
})

module.exports = app;


/* For listening Port we will do it in Index.js */
