const bodyParser = require("body-parser");
const express = require("express");
const session=require("express-session");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//const sessions=require("./middleware/sessionDb.js");
const sessionStore=require('./middleware/sessionDb.js');
app.use(session({
  secret:"hassan",
  store:sessionStore,
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:3600000}
}));

//---------------------------------------------//
//                 Routes                      //
//---------------------------------------------//
const routes = require("./routes/index.routes");
app.use(routes);
//---------------------------------------------//
//                MiddleWare                   //
//---------------------------------------------//
//const database=require("./middleware/database.js");
const database = require("./middleware/sequelize_database.js");






app.use('/public', express.static('public'));




app.listen(3000, function() {
  console.log("Server Has been Started on Port 3000")
})
