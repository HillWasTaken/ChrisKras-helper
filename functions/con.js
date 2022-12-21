let mysql = require('mysql');

module.exports = {
    con: mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "ChrisKras"
    }),
    test: function () {
        console.log("Function doet het!");
    }
}
