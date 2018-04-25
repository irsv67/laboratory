"use strict";
const mysql_1 = require('mysql');
// var mysql = require('mysql');
var connection = mysql_1.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'visual'
});
connection.connect();
connection.query('SELECT * from TD_DC_VISUAL_REPORT', function (error, results, fields) {
    if (error)
        throw error;
    console.log('The solution is: ', results[0].name);
});
//# sourceMappingURL=mysql.js.map