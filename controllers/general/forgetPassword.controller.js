const { render } = require("ejs");
const e = require("express");
let forgetPassDb=require("../../models/general/forgetPassword.model");
const nodemailer = require("nodemailer");


function genAuthPin()
{
    var randomNum;
    var randomString="";
    for(i=0;i<4;i++)
    {
        //generates random number from 1-5
        randomNum=(Math.floor((Math.random()*5))+1);  
        randomString+=randomNum.toString();
    }
    return randomString;
}
class forgetPassword
{
   

    static render_forgetPassword=function(req,res)
    {
        let  emailFoundStatus="";
        res.render("./general/forget-password.ejs",{status:emailFoundStatus});
    }

    static post_forgetPassword=function(req,res)
    {
        console.log("AuthPin is : "+genAuthPin());
        let {email}=req.body;
        forgetPassDb.get_details(email).then(
        function(rows)
        {
            if(rows.length>0)
            {
                let AuthPin=genAuthPin();
                let verStatus=0;
                forgetPassDb.insert_forgetPassword(email,rows[0].rollnum,AuthPin);

                let mailTransporter = nodemailer.createTransport(
                    {
                      service: "gmail",
                      auth: {
                        user: "cashingp4@gmail.com",
                        pass: "liicwnjpctftsfib"
                      }
                    })
              
                  let details =
                  {
                    from: "cashingp4@gmail.com",
                    to: email,
                    subject: "Verification Pin",
                    text: AuthPin
                  }
              
              
                  mailTransporter.sendMail(details, function (err) {
                    if (err) {
                      console.log("Error Encountered");
                    }
                    else {
                      console.log("Email Has been Sent");
                    }
                  })

                  res.redirect("/verify-authpin")
            }
            else 
            {
                let foundStatus="Email Not Found"
                res.render("./general/forget-password.ejs",{status:foundStatus});
            }
        },
        function(error)
        {

        })
    }



    static render_verifyAuthPin(req,res)
    {
        let  authStatus="";
        res.render("./general/verify-authpin.ejs",{status:authStatus});
    }

    static post_verifyAuthPin(req,res)
    {
      let {authpin,password,rollnum}=req.body;
      console.log(authpin+password+rollnum);
      
      forgetPassDb.get_authpin(rollnum).then(
        function(rows){
          if(rows.length>0)
          {
            if(rows[0].authPin==authpin)
            {
              forgetPassDb.change_password(password,rollnum);
              res.redirect("/signin");
            }
            else
            {
              let  authStatus="Error - Failed To Authenticate";
            res.render("./general/verify-authpin.ejs",{status:authStatus});
            }
          }
          else
          {
            let  authStatus="Error - Failed To Authenticate";
            res.render("./general/verify-authpin.ejs",{status:authStatus});
          }
        },function(error){

        })
    }
}


module.exports=forgetPassword;