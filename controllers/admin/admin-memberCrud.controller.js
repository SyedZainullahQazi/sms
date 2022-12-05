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
                res.render("./admin/crud-members.ejs", { std: stdArr });
            }
        },
            function (error) {
                // This function get called, when error
                console.log(error);
            });

        //----------------------------------------------------//
        //                                                    //
        //----------------------------------------------------//
    }
    static render_team = function (req, res) {
        let btnVal = req.query.valid;;
        console.log("techButton Value: " + btnVal);
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
                    console.log("No Entry so rendring original");
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
            console.log("logistics SCOPE ENTERED");
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
                    console.log("No Entry so rendring original");
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
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
                    console.log("No Entry so rendring original");
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
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
                    console.log("No Entry so rendring original");
                    res.render("./admin/crud-members.ejs",{std:stdArr});
                }
            },
                function (error) {
                    // This function get called, when error
                    console.log(error);
                });
        }
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
                    console.log("No Entry so rendring original");
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
    //         redirect to the teechnical member          //
    //----------------------------------------------------//
    static redirect_team = function (req, res) {
        var { teamBtn } = req.body;
        var string = encodeURIComponent(teamBtn);
        res.redirect("/view-members/:var?valid=" + string);
    }
}
module.exports = memberCrud;