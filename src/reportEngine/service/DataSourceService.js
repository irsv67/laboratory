"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonService_1 = require("./CommonService");
class DataSourceService {
    constructor() {
        this.commonService = new CommonService_1.CommonService();
    }
    createDataSource(connection, req, callback) {
        const user = req.headers['dr-user'];
        const tenant = req.headers['dr-tenant'];
        const paramObj = req.body;
        const preSql = `
        insert into TD_DR_DATA_SOURCE (name, type, attr1, status, 
            tenant_id, creator, create_by, updater, update_by) values (?)`;
        const values = [paramObj.name, paramObj.type, paramObj.url || '0.x', paramObj.status,
            tenant, user, user, user, user];
        connection.query(preSql, [values], function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            callback({
                code: 200,
                msg: '修改成功',
                success: true,
            });
        });
    }
    updateDataSource(connection, req, callback) {
        const user = req.headers['dr-user'];
        const tenant = req.headers['dr-tenant'];
        const paramObj = req.body;
        const preSql = `
        UPDATE
            TD_DR_DATA_SOURCE
        SET
            name = '${paramObj.name}',
            type = '${paramObj.type}',
            attr1 = '${paramObj.url}',
            status = '${paramObj.status}',

            tenant_id = '${tenant}',
            updater = '${user}',
            update_by = '${user}'
        WHERE
            id = ${paramObj.id}`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            callback({
                code: 200,
                msg: '修改成功',
                success: true,
            });
        });
    }
    retrieveDataSourceList(connection, req, callback) {
        const that = this;
        const preSql = `select * from TD_DR_DATA_SOURCE order by create_time desc`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            const list = that.commonService.convertResponse(results);
            list.forEach(item => {
                item['url'] = item['attr1'];
            });
            callback({
                code: 200,
                data: list,
                msg: '查询成功'
            });
        });
    }
    deleteDataSource(connection, req, callback) {
        const dsId = req.params.dsId;
        const preSql = `delete from TD_DR_DATA_SOURCE where id = ${dsId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            callback({
                code: 200,
                msg: '删除成功'
            });
        });
    }
}
exports.DataSourceService = DataSourceService;
//# sourceMappingURL=DataSourceService.js.map