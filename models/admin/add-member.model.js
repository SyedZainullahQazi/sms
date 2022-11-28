const { DataTypes } = require("sequelize");
const sequelize = require("../../middleware/sequelize_database");


class addMemberDB {
    //---------------------------------------------------------//
    // ADDS THE SENT MEMBER OBJECT TO THE DATABASE             //
    //---------------------------------------------------------//
    static add_member(regObj) {
        const admin_add_member = sequelize.define("members",
        {
            fullname:
            {
                type: DataTypes.STRING,
                allowNull: false
            },
            dob: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            team: {
                type: DataTypes.STRING,
                allowNull: false
            },
            rollnum: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            cgpa: {
              type:DataTypes.FLOAT,
              allowNull:false
            },
            whatsapp:{
              type:DataTypes.STRING,
              allowNull:false
            },
            skills: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pendingStatus:
            {
                type:DataTypes.INTEGER,
                allowNull:false
            },
            profilePicture:
            {
                type:DataTypes.STRING,
                allowNull:false
            },
            role:
            {
                type:DataTypes.STRING,
                allowNull:false
            },

        },{ timestamps: false},{createdAt: false},{updatedAt: false});

        memberRegistration.removeAttribute('id');

        memberRegistration.create({
            fullname: regObj.fullname,
            dob: regObj.dob,
            team: regObj.team,
            rollnum: regObj.rollnum,
            email: regObj.email,
            password: regObj.password,
            cgpa:regObj.cgpa,
            whatsapp:regObj.whatsapp,
            skills: regObj.skills,
            gender: regObj.gender,
            pendingStatus:1,
            profilePicture:"None",
            role:"member"
        }).then(res => {
            console.log("Member Has been Added To the Database");

        }).catch((error) => {
            console.error('Failed to add the member to the database ', error);
        });
    }
}

module.exports = addMemberDB;
