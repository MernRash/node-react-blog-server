const express = require("express");

const blogData = require("./blogsData");

const router = express.Router();

const verifyToken = require('../middleware');


router.get("/",verifyToken, (req, res) => {
  const catagory = req.query.catagory;
  

  if (catagory === undefined) {
    res.status(503).json({ success: false, message: "catagory is undefined" });
    return;
  }
  const filteredData = blogData.filter(
    (values) => values.category === catagory
  );
  const filterByClap = blogData.filter((values)=> values.claps>60);

  res
    .status(200)
    .json({
      success: true,
      message: "Sending Blogs Data Successfully",
      filteredData,filterByClap
    });
});

router.get("/singlePost", verifyToken, (req,res) => {
  const blogId = req.query.blogId;
  const blogMatchById = blogData.find((blog) => {
      return blog.id == blogId;  
  })
  //    console.log("Single Blog id should come",blogMatchById);
  if(blogMatchById === undefined) {
      res
      .status(404)
      .json({success : false, message : "blog Not found"})
      return
  }

  res
  .status(200)
  .json({success : true, message : "Blog Found", blogMatchById})

})


router.get("/filterByClap", verifyToken, (req,res)=> {
  const clapCount = 60;
  

  const filterDataByClap = blogData.filter((blog)=> {
      return blog.claps >= clapCount;
  })
  
  if(filterDataByClap === undefined ){
      res.status(400)
      .json({success : false, message: "No blogs available"})
      return
  }
  res
  .status(200)
  .json({success:true, message: "blogs filtered by clap count", filterDataByClap})
})


router.get("/filtertopPost", verifyToken, (req,res)=> {
  const clapCount = 70;
  const catagory = req.query.catagory;

  const filteredtopPost = blogData.filter((blog)=> {
      return blog.claps > clapCount;
  })
  
  const sortedTopPost = filteredtopPost.sort((a,b)=>
  {
    if(b.claps>a.claps) return 1;
    if(b.claps<a.claps) return -1;
    return 0;
  }
  );

console.log("Sorted Post",sortedTopPost)
  if(filteredtopPost === undefined ){
      res.status(400)
      .json({success : false, message: "No blogs available"})
      return
  }
  res
  .status(200)
  .json({success:true, message: "blogs filtered by clap count", sortedTopPost})
})


router.get("/filterByDate", verifyToken, (req,res)=> {
  // const clapCount = 60;
  
  

  const filterDataByDate = blogData.filter((blog)=> {
    const newDate = new Date(blog.date).getFullYear();
    // const currentDate =  new Date()
    return newDate >= 2020;
  })
  
  if(filterDataByDate === undefined ){
      res.status(400)
      .json({success : false, message: "No blogs available"})
      return
  }
  res
  .status(200)
  .json({success:true, message: "blogs filtered by blog Year", filterDataByDate})
})

module.exports = router;
