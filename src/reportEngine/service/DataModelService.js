"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const os = require('os');
class DataModelService {
    constructor() {
    }
    initRouter(router, connection) {
        const that = this;
        router.get('/getModelTables', function (req, res) {
            const sql = `SELECT * FROM information_schema.tables WHERE table_schema = 'qe_data'`;
            connection.query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(sql, results.length);
                const retList = results.map(item => {
                    return {
                        tableName: item['TABLE_NAME'],
                        tableDesc: item['TABLE_COMMENT'],
                        tableRows: item['TABLE_ROWS'],
                        createTime: new Date(item['CREATE_TIME']).toLocaleString()
                    };
                });
                res.send({
                    data: retList,
                    success: true
                });
            });
        });
        // exportTable
        router.get('/exportTable/:tableName', function (req, res) {
            const tableName = req.params.tableName;
            const sql = `SELECT * FROM qe_data.${tableName} WHERE 1 = 1 limit 1, 10000`;
            connection.query(sql, function (error, results, fields) {
                if (error)
                    throw error;
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
                fs_1.writeFileSync(resource_base + '\\' + tableName + '.csv', text);
                res.send({
                    data: null,
                    msg: '导出成功',
                    success: true
                });
            });
        });
    }
}
exports.DataModelService = DataModelService;
//# sourceMappingURL=DataModelService.js.map