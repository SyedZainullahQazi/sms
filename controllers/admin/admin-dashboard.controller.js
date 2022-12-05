const blogpostDb=require("../../models/admin/compose-blog-post.model");
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
            res.redirect("signin");
        }
    }

    //-----------------------------------------------------------//
    //                    RENDER ADMIN DASHBOARD                 //
    //-----------------------------------------------------------//
    static render_adminDash(req,res)
    {
    

        res.render("./admin/admin-dashboard.ejs");
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

     

      await page.goto("http://localhost:3000/view-members",{waitUntil:'networkidle2'});
    //   await page.click('#email');
    //   await page.waitForNavigation({waitUntil:'networkidle2'});
    //   await page.type("f200328@cfd.nu.edu.pk");
    //   await page.click('#password');
    //   await page.waitForNavigation({waitUntil:'networkidle2'});
    //   await page.type("fastnuces3");
    //   await page.click('#send')
    //   await page.waitForNavigation({waitUntil:'networkidle2'});
    //   await page.goto("http://localhost:3000/view-members?",{waitUntil:'networkidle2'});
    
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

     await page.pdf({
       path:"./views/admin/pdf/totalMembers/"+pdfname,
       format:'A4'
     })

     console.log("report saved");
     await browser.close();

     res.redirect("/view-members");
   }

   static genReport=async function(req,res)
   { 
     await res.render("./admin/memberTemplate.ejs",{memberNames:names,memberTeams:teams,memberRollnums:rollnums});
   }
}

module.exports=adminDash;