"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class ConchDao {
    constructor() {
        this.connection = mysql_1.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'region'
        });
    }
    queryTableAll(sql, callback) {
        this.connection.query(sql, callback);
    }
    updateTable(selectSql, updateSql) {
        const that = this;
        that.connection.query(selectSql, function (error, results, fields) {
            if (error) {
                throw error;
            }
            let count = results[0].count;
            if (count === 0) {
                that.connection.query(updateSql, function (error, results, fields) {
                    if (error) {
                        throw error;
                    }
                    console.log('affectedRows:' + results.affectedRows);
                });
            }
        });
    }
}
exports.ConchDao = ConchDao;
//# sourceMappingURL=conch-dao.js.map