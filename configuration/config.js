const mongoose =  require("mongoose");
// console.log("mongo uri",process.env.MONGO_URI)
const connectDB = ()=>{mongoose.connect("mongodb+srv://mernrash:Rahul1401@blog-1.mm2vi.mongodb.net/userDetails?retryWrites=true&w=majority",{useUnifiedTopology:true,useNewUrlParser:true})
.then(()=>{console.log("Connected to Blog Database")})
.catch((err)=>{console.log(`Error:${err.message}`)})
}

module.exports = connectDB;