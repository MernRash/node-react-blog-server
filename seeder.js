const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const Users = require("./BlogData/blogUser");
const UserModel = require("./dataModels/userModel");

const connectDb = require("./configuration/config");
connectDb()

const addDataToDB = async () => {
   try {
       const createUser = await UserModel.insertMany(Users);
       const adminUser = createUser[0]._id;
       console.log("Data Inserted!!");
       process.exit();
   } catch (error) {
       console.log(`${error}`);
       process.exit(1);
   }
};

const dataDestroy = async () => {
   try {
    await UserModel.deleteMany();
    console.log("data deleted!!");
    process.exit();
   } catch (error) {
       console.log(`${error}`)
       process.exit(1);
   }
}


if(process.argv[2] === "-d" ){
    dataDestroy();
} else {
    addDataToDB();
}
