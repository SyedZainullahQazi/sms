const request = require("request");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const { render } = require("ejs");


var teacher = [];


class emailManager {

  //--------------------------------------------------------------//
  //                 SCRAPS TEACHER EMAIL AND DISPLAY             //
  //--------------------------------------------------------------//
  static emailTeacher = function (req, res) {
    //email array
    var teacherArr = [];

    request("https://cfd.nu.edu.pk/department-cs/", (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $(".unitech-teacher").each((i, element) => {
          const t_name = $(element).find("h4 > a").text().replace(/\s\s+/g, "");
          const t_designation = $(element).find("h6").text().replace(/\s\s+/g, "");
          const t_email = $(element)
            .find("ul > li >p:nth-child(1)")
            .text()
            .replace(/,/, "");

          var teacherObj = { name: t_name, email: t_email, designation: t_designation };
          teacherArr.push(teacherObj);

        });

        res.render("./admin/email-teacher.ejs", { teacher: teacherArr });
      }
      else {
        res.render("./admin/email-manager.ejs");
      }
    });
  }
  //-------------------------------------------------------------//
  //            RENDER EMAIL TO TEACHER SCREEN                   //
  //-------------------------------------------------------------//
  static render_sendMailToTeacher(req, res) {
    let t_email = req.query.valid;
    console.log(t_email);
    res.render("./admin/send-mail-to-teacher.ejs", { email: t_email });
  }
  //--------------------------------------------------------------//
  //            RECEIVES EMAIL FROM EMAIL BUTTON                  //
  //--------------------------------------------------------------//
  static post_getMailInfo(req, res) {
    var { email } = req.body;

    let string = encodeURIComponent(email);
    res.redirect("/send-mail-to-teacher?valid=" + string);

  }
  //--------------------------------------------------------------//
  //     RECEIVES EMAIL SENT BY THE SENDER                        //
  //--------------------------------------------------------------//
  static post_sendmail(req, res) {
    var { email, emailContent, emailSubject } = req.body;
    console.log(emailContent);

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
      subject: emailSubject,
      text: emailContent
    }


    mailTransporter.sendMail(details, function (err) {
      if (err) {
        console.log("Error Encountered");
      }
      else {
        console.log("Email Has been Sent");
      }
    })

    res.redirect("/email-manager");

  }

   //--------------------------------------------------------------//
   //     RECEIVES EMAIL SENT BY THE SENDER                        //
   //--------------------------------------------------------------//
   static render_sendMailToAnyone(req,res)
   {
    res.render("./admin/send-mail-to-anyone.ejs");
   }
}

module.exports = emailManager;