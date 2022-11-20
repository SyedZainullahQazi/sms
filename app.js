const bodyParser=require("body-parser");

const express=require("express");
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//---------------------------------------------//
//                 Routes                      //
//---------------------------------------------//
const routes=require("./routes/index.routes");
app.use(routes);
//---------------------------------------------//
//                MiddleWare                   //
//---------------------------------------------//
//const database=require("./middleware/database.js");
const database=require("./middleware/sequelize_database.js");



app.use('/public', express.static('public'));





app.listen(3000,function(){
console.log("Server Has been Started on Port 3000")
})