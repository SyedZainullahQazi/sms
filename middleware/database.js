const mysql=require("mysql");

const connection=mysql.createConnection({
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
        console.log("MYSQL2 Database Connected Successfully!!");
    }
});

module.exports =connection;
