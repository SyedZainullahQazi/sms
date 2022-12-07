const blogpostDb=require("../../models/admin/compose-blog-post.model");
const adminDashDb=require("../../models/admin/adminDash.model");
var q = require('q');
const { render } = require("ejs");
const puppeteer = require("puppeteer");
var names=[];
var teams=[];
var rollnums=[];

class adminDash
{
    //----------------------------------------------------------//
    //               SESSION AND ROLE AUTHENTICATION            //
    //----------------------------------------------------------//
    static isAuth=function(req,res,next)
    {
        if(req.session.isAuth==true && req.session.role=="admin")
        {
            next();
        }
        else
        {
            res.redirect("/signin");
        }
    }

    //-----------------------------------------------------------//
    //                    RENDER ADMIN DASHBOARD                 //
    //-----------------------------------------------------------//
    static render_adminDash(req,res)
    {
        var teamArr=[0,0,0,0,0];     //0 tech  1 market 2 logistics 3 admin 4 finance
        adminDashDb.get_team().then(function(rows)
        {
          if(rows.length>0)
          {
            for(let i=0;i<rows.length;i++)
            {
              if(rows[i].team=="Technical Team")
              {
                teamArr[0]=teamArr[0]+1;
              }
              else if(rows[i].team=="Marketing Team")
              {
                teamArr[1]=teamArr[1]+1;
              }
              else if(rows[i].team=="Logistics Team")
              {
                teamArr[2]=teamArr[2]+1;
              }
              else if(rows[i].team=="Admin Team")
              {
                teamArr[3]=teamArr[3]+1;
              }
              else if(rows[i].team=="Finance Team")
              {
                teamArr[4]=teamArr[4]+1;
              }
            }
            console.log("Technical Members : "+teamArr[0])
            res.render("./admin/admin-dashboard.ejs",{teams:teamArr});
          }
        },
        function(error)
        {
          console.log(error);
        })
       
    }
    //-----------------------------------------------------------//
    //                    RENDER COMPOSE BLOG POST               //
    //-----------------------------------------------------------//
    static render_composeBlogPost=function(req,res)
    {
        res.render("./admin/compose.ejs");
    }
    //-----------------------------------------------------------//
    //           STORE COMPOSED BLOG POST INTO DATABASE          //
    //-----------------------------------------------------------//
    static getBlogPost=function(req,res)
    {
        var {blogTitle,blogPost}=req.body;
        blogpostDb.insertBlogPost(blogTitle,blogPost,req.session.rollnum,req.session.fullname);
        res.redirect("/compose-blog-post");
    }
    //-----------------------------------------------------------//
    //         MANAGE MEMBERS RENDERING                          //
    //-----------------------------------------------------------//
    static render_manageMembers=function(req,res)
    {
        res.render("./admin/manage-members.ejs")
    }
   //------------------------------------------------------------//
   //              RENDER EMAIL                                  //
   //------------------------------------------------------------//
   static render_emailManager=function(req,res)
   {
       res.render("./admin/email-manager.ejs")
   }
   //------------------------------------------------------------//
   //               Generate Report                              //
   //------------------------------------------------------------//
   static post_genReport=async function(req,res)
   {
      const browser = await puppeteer.launch({headless:true});
      const page = await browser.newPage();

      await page.goto("http://localhost:3000/signin");
      //type into email

      await page.type('#email',"f200328@cfd.nu.edu.pk");
      
      //type into password
      await page.type("#password","fastnuces3") ;

      await page.click('#send')

    //   await page.goto("http://localhost:3000/view-members?",{waitUntil:'networkidle2'});

      await page.goto("http://localhost:3000/view-members",{waitUntil:'networkidle2'});
    
    names=await page.evaluate(()=>
    {
      return Array.from(document.querySelectorAll("td#name")).map(x=>x.textContent)
    });
    teams=await page.evaluate(()=>
    {
      return Array.from(document.querySelectorAll("td#team")).map(x=>x.textContent)
    });
    rollnums=await page.evaluate(()=>
    {
      return Array.from(document.querySelectorAll("td#rollnum")).map(x=>x.textContent)
    });

     
     await page.goto("http://localhost:3000/generate-report",{waitUntil:'networkidle2'});
     +new Date
     let pdfname=Date.now()
     pdfname=pdfname+".pdf";
     console.log(pdfname);

     names.length=0;
     rollnums.length=0;
     teams.length=0;

     var pdfdoc=await page.pdf({
       path:"./views/admin/pdf/totalMembers/"+pdfname,
       format:'A4'
     })

     console.log("report saved");
     await browser.close();

    
     res.download("./views/admin/pdf/totalMembers/"+pdfname);
   }

   static genReport=async function(req,res)
   { 
     await res.render("./admin/memberTemplate.ejs",{memberNames:names,memberTeams:teams,memberRollnums:rollnums});
   }

   //-------------------------------------------------------//
   static destroySession=function(req,res)
   {
     req.session.destroy();
     res.redirect("/signin");
   }
}

module.exports=adminDash;