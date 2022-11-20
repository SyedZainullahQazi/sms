const mysql=require("mysql");
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"fcapms"
});

connection.connect(function(err){
    if(err)
    {
        console.log("error connecting)");
    }
    else
    {
        console.log("Database Connected Successfully!!");
    }
});

module.exports =connection;