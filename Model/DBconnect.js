const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hoang1609@",
    database: "md3_th",
});

module.exports = connection;