import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
const os = require('os');

export class DataModelService {

    constructor() {
    }

    getModelTables(connection, req, callback) {
        const sql = `SELECT * FROM information_schema.tables WHERE table_schema = 'qe_data'`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql, results.length);
            const retList = results.map(item => {
                return {
                    tableName: item['TABLE_NAME'],
                    tableDesc: item['TABLE_COMMENT'],
                    tableRows: item['TABLE_ROWS'],
                    createTime: new Date(item['CREATE_TIME']).toLocaleString()
                }
            });
            callback({
                data: retList,
                success: true
            });
        });
    }

    exportTable(connection, req, callback) {
        const tableName = req.query.tableName;

        const sql = `SELECT * FROM qe_data.${tableName} WHERE 1 = 1 limit 1, 10000`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql, results.length);

            let text = '';

            const headRow = [];
            fields.forEach(col => {
                let value = col.name;
                headRow.push(value);
            });
            text += headRow.join(',') + '\r\n';

            results.forEach(row => {
                const rowNew = [];
                fields.forEach(col => {
                    let value = row[col.name];
                    // 252, 253, 254 字符类型码
                    if (typeof value === 'string') {
                        value = value.replace(/,/g, '，');
                    }
                    if (col.type === 7) {
                        value = value.toLocaleString();
                    }
                    rowNew.push(value);
                });
                text += rowNew.join(',') + '\r\n';
            });

            const resource_base = os.homedir() + '\\Desktop';
            writeFileSync(resource_base + '\\' + tableName + '.csv', text);
            callback({
                data: null,
                msg: '导出成功',
                success: true
            });
        });
    }
}
