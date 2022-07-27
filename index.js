
const app = require('./express');



const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log("Server Started here at Port Number 3001");
})
