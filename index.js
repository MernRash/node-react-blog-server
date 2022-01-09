
const app = require('./express');



const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log("Server Started here at Port Number 8000");
})