const express=require("express");
const mysql=require("mysql");
const session=require("express-session");
const app=express();

const MySQLStore=require("express-mysql-session")(session);

const userData={
  fullname:"Hamza Khan",
  username:"Qazi",
  password:"fastnuces"
};

//--------db connection----------//
var options = {
  host:"localhost",
  user:"root",
  password:"",
  database:"sessions"
}


var sessionConnection=mysql.createConnection(options);
var sessionStore=new MySQLStore
({
  expiration:1000000000,
  createDatabaseTable:true,
  schema:
  {
    tableName:'session_records',
    columnNames:
    {
      session_id:'session_id',
      expires:'expires',
      data:'data'
    }
  }
},sessionConnection);


module.exports=sessionStore;



console.log("This file is an amazing example of usage baby");
