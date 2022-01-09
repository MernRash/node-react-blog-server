const JWT = require('jsonwebtoken');


const JWT_SecretKey = require('./secretKey/secretKey');

const verifyToken =  (req,res,next) => {
    /* we are taking authorization from headers */
    const {authorization} = req.headers;

    // console.log(authorization);
    if(authorization === undefined) {
        res.status(400).json({
            success : false,
            message : "Error : Invalid Auth Header"
        })
        return;       
    }

    const [ , token] = authorization.split(" ");
// console.log("line 20", token)
    try{
        const payload = JWT.verify(token,JWT_SecretKey);
        res.auth = payload;
        next();
    }catch(error){
        res.status(403).json({
            success : false,
            message : "Error while verifying token"
        })
    }
}


module.exports = verifyToken;