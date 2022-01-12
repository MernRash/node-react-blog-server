
const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors())

const authRouter = require('./routes/auth/authLogin');

const blogRouter = require('./routes/blogs/blogs');

const clapRouter =  require('./routes/claps/clap');

// const homeRouter = require('./routes/home/home');
/* Server Setup Starts */

/* to get response Data inside body */
app.use(express.json());

/* after reading api url (/api/v1/auth) it will go to authrouter file which authLogin.js for further refrence */

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/blog',blogRouter);
app.use('/api/v1/claps',clapRouter);
// app.use('/api/v1/home',homeRouter);





app.get('/',(req,res)=>{
    res.json({
        success:true,
        messege : "kuch bhi",
    })
})

module.exports = app;


/* For listening Port we will do it in Index.js */