let mysql = require('mysql');

module.exports = {
    con: mysql.createConnection({
        host: "192.168.2.30",
        port: "3306",
        user: "root",
        password: "",
        database: "ChrisKras"
    }),
    test: function () {
        console.log("Function doet het!");
    }
}
