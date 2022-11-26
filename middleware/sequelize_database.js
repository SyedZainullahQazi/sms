const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'fcapms',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
    console.log('SEQUELIZE Database Connected Successfully....');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 module.exports=sequelize;
