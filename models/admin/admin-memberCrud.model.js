const connection=require("../../middleware/database");
var q = require('q');

class memberCrudDB
{
    //-----------------------------------------//
    //   GETS INFO FROM MEMBER TABLE ALL       //
    //-----------------------------------------//
    static getMembersInfo()
    {
      var deferred = q.defer();
      var Query='SELECT * FROM `members` ';
      var dbPass=connection.query(Query,function(err,rows,fields)
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


    static getTechnical()
    {
      var deferred = q.defer();
      var tech="Technical Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[tech],function(err,rows,fields)
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

    static getLogistics()
    {
      var deferred = q.defer();
      var team="Logistics Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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

    static getFinance()
    {
      var deferred = q.defer();
      var team="Finance Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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

    static getMarketing()
    {
      var deferred = q.defer();
      var team="Marketing Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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

    static getAdmin()
    {
      var deferred = q.defer();
      var team="Admin Team";
      var Query='SELECT * FROM `members` where team=?';
      var dbPass=connection.query(Query,[team],function(err,rows,fields)
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

module.exports=memberCrudDB;