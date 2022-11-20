const express=require("express");
const app=express();


const routes=require("./routes/index.routes");
app.use(routes);

//const database=require("./middleware/database.js");

app.use('/public', express.static('public'));




app.listen(3000,function(){
console.log("Server Has been Started on Port 3000")
})