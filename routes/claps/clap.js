const express = require("express");
const router = express.Router();
const ListOfBlogData = require("../blogs/blogsData");
const verifyToken = require('../middleware'); 

router.post("/updateClap", verifyToken, (req, res) => {
    const blogId = req.query.blogId;
    console.log(blogId);
    const blogMatchById = ListOfBlogData.find((blog) => {
         
     if(blog.id == blogId){

        const clonedBlogMatchById = {...blog}
        blog.claps = ++clonedBlogMatchById.claps;

        return clonedBlogMatchById;

     }
    })
    res.status(200).json({success:true,messege:"Blog Updated With Clap", blogMatchById});
    console.log("Single Blog id should come",blogMatchById);

    
    // const clonedBlogMatchById = {...blogMatchById}
    // clonedBlogMatchById.claps = ++clonedBlogMatchById.claps
    // console.log("Cloned Objectc",++clonedBlogMatchById.claps);
})


module.exports = router;