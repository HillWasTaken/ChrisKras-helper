let mysql = require('mysql');

module.exports = {
    con: mysql.createConnection({
        host: "localhost",
        user: "bot",
        password: "",
        database: "ChrisKras"
    }),
    test: function () {
        console.log("Function doet het!");
    }
}
