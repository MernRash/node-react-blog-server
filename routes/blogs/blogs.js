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
  const filterByViews = blogData.filter((values)=> values.views>=100);

  res
    .status(200)
    .json({
      success: true,
      message: "Sending Blogs Data Successfully",
      filteredData,filterByViews
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

module.exports = router;
