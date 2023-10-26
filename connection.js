const mysql = require('mysql2');
require('dotenv');
var connection = mysql.createConnection({
    port : "59410",
    host: "viaduct.proxy.rlwy.net",
    user : "root",
    password :"gCh1AFAdEC5bH3Af3E55hC6BHageb4b1",
    database :"railway"

});


module.exports = connection;

