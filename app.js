const bodyParser = require("body-parser");
const express = require("express");
const session=require("express-session");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);

    console.log("Message : "+msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
});

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




server.listen(3000, function() {
  console.log("Server Has been Started on Port 3000")
})
