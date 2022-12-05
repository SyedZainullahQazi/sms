const { render } = require("ejs");
const crudDB = require("../../models/admin/admin-memberCrud.model");

class memberCrud {
    //-------------------------------------------------//
    //         RENDERS ALL MEMBERS FROM DATABASE       //
    //-------------------------------------------------//
    static render_memberCrud = function (req, res) {
        let stdArr = [];
        crudDB.getMembersInfo().then(function (rows) {
            if (rows.length > 0) {
                for (let i = 0; i < rows.length; i++) {
                    let stdDetails =
                    {
                        rollnum: "",
                        name: "",
                        team: ""
                    };
                    stdDetails.name = rows[i].fullname;
                    stdDetails.rollnum = rows[i].rollnum;
                    stdDetails.team = rows[i].team;
                    stdArr.push(stdDetails);
                }
                res.render("./admin/crud-members.ejs", { std: stdArr});
            }
        },
            function (error) {
                // This function get called, when error
                console.log(error);
            });
    }

    //---------------------------------------------------//
    //         RENDERS TEAM BASED ON SPECIFC QUERY       //
    //---------------------------------------------------//
    static render_team = function (req, res) {
        let btnVal = req.query.valid;
        let stdArr = [];
        //--------------------------------------------------//
        //           TECHNICAL TEAM                        //
        //--------------------------------------------------//
        if (btnVal == "technical") {
            crudDB.getTechnical().then(function (rows) {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let stdDetails =
                        {
                            rollnum: "",
                            name: "",
                            team: ""
                        };
                        stdDetails.name = rows[i].fullname;
                        stdDetails.rollnum = rows[i].rollnum;
                        stdDetails.team = rows[i].team;
                        stdArr.push(stdDetails);
                    }
                    res.render("./admin/crud-members.ejs", { std: stdArr });
                }
                else{
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
        //--------------------------------------------------//
        //           LOGISTICS  TEAM                        //
        //--------------------------------------------------//
        else if (btnVal == "logistics") {
            crudDB.getLogistics().then(function (rows) {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let stdDetails =
                        {
                            rollnum: "",
                            name: "",
                            team: ""
                        };
                        stdDetails.name = rows[i].fullname;
                        stdDetails.rollnum = rows[i].rollnum;
                        stdDetails.team = rows[i].team;
                        stdArr.push(stdDetails);
                    }
                    res.render("./admin/crud-members.ejs", { std: stdArr });
                }
                else {
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
        //--------------------------------------------------//
        //          MARKETING TEAM                          //
        //--------------------------------------------------//
        else if (btnVal == "marketing") {
            crudDB.getMarketing().then(function (rows) {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let stdDetails =
                        {
                            rollnum: "",
                            name: "",
                            team: ""
                        };
                        stdDetails.name = rows[i].fullname;
                        stdDetails.rollnum = rows[i].rollnum;
                        stdDetails.team = rows[i].team;
                        stdArr.push(stdDetails);
                    }
                    res.render("./admin/crud-members.ejs", { std: stdArr });
                }
                else{
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
        //--------------------------------------------------//
        //          ADMIN TEAM                              //
        //--------------------------------------------------//
        else if (btnVal == "admin") {
            crudDB.getAdmin().then(function (rows) {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let stdDetails =
                        {
                            rollnum: "",
                            name: "",
                            team: ""
                        };
                        stdDetails.name = rows[i].fullname;
                        stdDetails.rollnum = rows[i].rollnum;
                        stdDetails.team = rows[i].team;
                        stdArr.push(stdDetails);
                    }
                    res.render("./admin/crud-members.ejs", { std: stdArr });
                }
                else{
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
        //--------------------------------------------------//
        //          FINANCE TEAM                            //
        //--------------------------------------------------//
        else if (btnVal == "finance") {
            crudDB.getFinance().then(function (rows) {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let stdDetails =
                        {
                            rollnum: "",
                            name: "",
                            team: ""
                        };
                        stdDetails.name = rows[i].fullname;
                        stdDetails.rollnum = rows[i].rollnum;
                        stdDetails.team = rows[i].team;
                        stdArr.push(stdDetails);
                    }
                    res.render("./admin/crud-members.ejs", { std: stdArr });
                }
                else{
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
        //--------------------------------------------------//
        //          VIEW ALL TEAM                            //
        //--------------------------------------------------//

        else if (btnVal == "viewall") {
            crudDB.getMembersInfo().then(function (rows) {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let stdDetails =
                        {
                            rollnum: "",
                            name: "",
                            team: ""
                        };
                        stdDetails.name = rows[i].fullname;
                        stdDetails.rollnum = rows[i].rollnum;
                        stdDetails.team = rows[i].team;
                        stdArr.push(stdDetails);
                    }
                    res.render("./admin/crud-members.ejs", { std: stdArr });
                }
                else{
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
        //-----------------------------------------------------------------//
        //                  SEARCH A MEMBER                                //
        //-----------------------------------------------------------------//
        else if (btnVal == "search") {
            crudDB.get_member().then(function (rows) {
                if (rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let stdDetails =
                        {
                            rollnum: "",
                            name: "",
                            team: ""
                        };
                        stdDetails.name = rows[i].fullname;
                        stdDetails.rollnum = rows[i].rollnum;
                        stdDetails.team = rows[i].team;
                        stdArr.push(stdDetails);
                    }
                    res.render("./admin/crud-members.ejs", { std: stdArr });
                }
                else{
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }

    }
    //----------------------------------------------------//
    //         redirect to the team       member          //
    //----------------------------------------------------//
    static redirect_team = function (req, res) {
        let { teamBtn } = req.body;
        let string = encodeURIComponent(teamBtn);
        res.redirect("/view-members/:var?valid=" + string);
    }
    //----------------------------------------------------//
    //         redirect to the team       member          //
    //----------------------------------------------------//
    static post_editMember=function(req,res)
    {
        let {edit}=req.body;

        let string = encodeURIComponent(edit);
        res.redirect("/edit-member?valid="+string);
    }
    //-----------------------------------------------------//
    //          EDIT MEMBER PAGE                           //
    //-----------------------------------------------------//
    static editMember=function(req,res)
    {
       let rollnum = req.query.valid;
       res.render("./admin/edit-member.ejs",{roll:rollnum});
    }
    //-----------------------------------------------------//
    //        UPDATE MEMBER POST                           /
    //-----------------------------------------------------//
    static updateMember=function(req,res)
    {
        const regObj=
        {
            fullname:req.body.fullname,
            dob:req.body.dob,
            team:req.body.team,
            rollnum:req.body.rollnum,
            email:req.body.email,
            password:req.body.password,
            cgpa:req.body.cgpa,
            whatsapp:req.body.whatsapp,
            skills:req.body.skills,
            gender:req.body.gender
        };
        crudDB.editMember(regObj);
        res.redirect("/view-members")
    }
    //---------------------------------------------//
    //              DELETE                         //
    //---------------------------------------------//
    static post_deleteMember=function(req,res)
    {
        let {edit}=req.body;

        let string = encodeURIComponent(edit);
        res.redirect("/delete-member?valid="+string);
    }

    static deleteMember=function(req,res)
    {
        let rollnum = req.query.valid;
        crudDB.deleteMember(rollnum);
        res.redirect("/view-members")
    }

    //------------------------------------------------------//
    //                   SEARCH MEMBERS                     //
    //-----------------------------------------------------//
    static render_searchMember=function(req,res)
    {
        let arr=[]
        res.render("./admin/search-members.ejs",{member:arr});
    }

    static searchMember=function(req,res)
    {
        let rollnum = req.query.valid;
        console.log("redirected back to");
        crudDB.searchMember(rollnum).then(function(rows)
        {
            if(rows.length>0)
            {

                console.log(rows[0].rollnum);
                console.log(rows.length);
                res.render("./admin/search-members.ejs",{member:rows});
            }
        },function(error)
        {
            console.log(error);
        });
    }
    static post_searchMember=function(req,res)
    {
        let {rollnum}=req.body;
        console.log("MERA ROLL NUMBER HAY :"+ rollnum);
        let string = encodeURIComponent(rollnum);
        res.redirect("/search-member?valid="+string);
    }
}
module.exports = memberCrud;