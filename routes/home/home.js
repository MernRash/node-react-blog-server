const express = require("express");

const blogData = require("../blogs/blogsData");

const router = express.Router();

const verifyToken = require('../middleware');

router.get("/",verifyToken,(req,res)=>{

    const blogId = req.query.blogId;
    console.log(blogId)

    if(blogId === undefined){
        res.status(503).json({ success: false, message: "id is undefined" });
        return;
    }

    const filterByClap = blogData.filter((values)=> values.claps>60);


    res
    .status(200)
    .json({
      success: true,
      message: "Sending Blogs Data Successfully",
    filterByClap
    });

})







module.exports = router;