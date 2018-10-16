import {createConnection} from "mysql";

export class ConchDao {

    connection: any;

    constructor() {
        this.connection = createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'region'
        });
    }

    queryTableAll(sql: any, callback: any) {
        this.connection.query(sql, callback);
    }

    private updateTable(selectSql: string, updateSql: string) {
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