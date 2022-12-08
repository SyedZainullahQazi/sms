let connection =require("../../middleware/database");
let q=require("q");



class forgetPasswordModel
{
    static get_details(email)
    {
      var deferred = q.defer();
      var Query='SELECT * FROM members where email=?';
      connection.query(Query,[email],function(err,rows,fields)
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

    static insert_forgetPassword(email,rollnum,authPin)
    {
        var Query='insert into forgetPassword (rollnum,email,authPin,status) values (?,?,?,?)';
        connection.query(Query,[rollnum,email,authPin,0],function(err,rows,fields)
        {  
            if (err)
            { 
                var Query2='update `forgetPassword` set authPin=? where rollnum=?';
                let data = [authPin,rollnum];
                connection.query(Query2, data, (error, results, fields) => 
                {
                    if (error)
                    {
                      return console.error(error.message);
                    }
                    console.log('Rows affected:', results.affectedRows);
                });
            } 
            else
            {
            console.log("1 record inserted in forgetPassword");  
            }
        }); 
    }

    static get_authpin(rollnum)
    {
      console.log("real rollnum "+rollnum);
      var deferred = q.defer();
      var Query='SELECT * FROM forgetpassword where rollnum=?';
      connection.query(Query,[rollnum],function(err,rows,fields)
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

    static change_password(password,rollnum)
    {
        var Query2='update `members` set password=? where rollnum=?';
        let data = [password,rollnum];
        connection.query(Query2, data, (error, results, fields) => 
        {
            if (error)
            {
              return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
        });
    }
}

module.exports=forgetPasswordModel;