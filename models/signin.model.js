const connection=require("../middleware/database");
var q = require('q');

  class signin
  {
    static checkUser(email,password)
    {
      var deferred = q.defer();
      var Query='SELECT password,role,rollnum,fullname FROM `members` WHERE email=?';
      var dbPass=connection.query(Query,[email],function(err,rows,fields)
      {
        if(err)
        {
          deferred.reject(err);

        }
        else 
        {
          //console.log(rows);           
          deferred.resolve(rows);
        }
      });
        
      return deferred.promise;
    }
  }

 



module.exports = signin;


