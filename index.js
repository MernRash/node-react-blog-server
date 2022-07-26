
const app = require('./express');



const PORT = process.env.PORT || 3001;
app.listen(3001,()=>{
    console.log("Server Started here at Port Number 3001");
})