var connection=require("../../middleware/database");
var q=require("q");

class blogDb
{
    static getBlogData=function(req,res)
    {
      var deferred = q.defer();
      var Query='SELECT * FROM blog';
      connection.query(Query,function(err,rows,fields)
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

    static getBlogPost=function(title)
    {
      var deferred = q.defer();
      var Query='SELECT blogId FROM blog where title=?';
      connection.query(Query,[title],function(err,rows,fields)
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

    static getComments(id)
    {
      var deferred = q.defer();
      var Query='SELECT * FROM blogcomments where blogId=?';
      var blogId=id;
      console.log("myblogid"+blogId);
      connection.query(Query,[id],function(err,rows,fields)
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


    static insertComment=function(id,comment,rollnum)
    {
      var date_ob = new Date();
      var day = ("0" + date_ob.getDate()).slice(-2);
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      var year = date_ob.getFullYear();
      var date = year + "-" + month + "-" + day;

      var Query='insert into blogcomments (rollnum,date,comment,blogId) values (?,?,?,?)';
        connection.query(Query,[rollnum,date,comment,id],function(err,rows,fields)
        {  
            if (err) throw err;  
            console.log("1 record inserted in comments");  
        }); 
    }
}

module.exports=blogDb;