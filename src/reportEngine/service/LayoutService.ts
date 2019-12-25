
import * as uuid from 'node-uuid';
import { CommonService } from "./CommonService";

export class LayoutService {

    commonService: any;

    constructor() {
        this.commonService = new CommonService();
    }

    createLayout(connection, req, callback) {
        const productId = req.query.productId;
        const user = req.headers['dr-user'];
        const code = uuid.v1();
        const createTime = new Date().getTime();

        let name = req.body.name;
        let version = req.body.version;
        let data = req.body.data;
        let type = req.body.type;
        let cubeIds = req.body.cubeIds;

        const sql = `INSERT INTO TD_DR_AE_CHART 
        (code, name, description, data, type, status, version, creator, createTime, 
            ext1, ext2, ext3, ext4, product_id, cube_ids) 
        VALUES ('${code}', '${name}', null, '${data}', '${type}', 0, '${version}', '${user}', ${createTime}, 
        null, null, null, null, ${productId}, '${cubeIds}')`;

        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql);
            callback({
                code: 200,
                data: code,
                msg: '保存成功'
            });
        });
    }

    updateLayout(connection, req, callback) {
        const productId = req.query.productId;
        const user = req.headers['dr-user'];
        const createTime = new Date().getTime();

        const code = req.body.code;
        const ext1 = req.body.ext1;

        let name = req.body.name;
        let version = req.body.version;
        let data = req.body.data;
        let type = req.body.type;
        let cubeIds = req.body.cubeIds;

        const sql = `INSERT INTO TD_DR_AE_CHART 
        (code, name, description, data, type, status, version, creator, createTime, 
            ext1, ext2, ext3, ext4, product_id, cube_ids) 
        VALUES ('${code}', '${name}', null, '${data}', '${type}', 0, '${version}', '${user}', ${createTime}, 
        '${ext1}', null, null, null, ${productId}, '${cubeIds}')`;

        const preSql = `update TD_DR_AE_CHART set status = -1 where code = '${code}' and status = 0`;
        connection.query(preSql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql);

            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql);
                callback({
                    code: 200,
                    data: code,
                    msg: '保存成功'
                });
            });
        });
    }

    retrieveLayoutList(connection, req, callback) {
        let productId = req.query.productId;
        const sql = `SELECT * FROM TD_DR_AE_CHART WHERE status = 0 and product_id = ` + productId + ' order by createTime desc';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql);
            // convertResponse
            callback({
                code: 200,
                data: {
                    list: results
                },
                msg: '查询成功'
            });
        });
    }

    deleteLayout(connection, req, callback) {
        const code = req.body.join(`', '`);

        const sql = `update TD_DR_AE_CHART set status = 1 where code in ('${code}') and status = 0`;

        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql);
            callback({
                code: 200,
                data: results.changedRows,
                msg: '修改成功'
            });
        });
    }

    getLayoutById(connection, req, callback) {
        let layoutId = req.query.layoutId;
        const sql = `SELECT * FROM TD_DR_AE_CHART WHERE status = 0 and code = '${layoutId}'`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql);
            // convertResponse
            const retObj = results.length > 0 ? results[0] : {}
            callback({
                code: 200,
                data: retObj,
                msg: '查询成功'
            });
        });
    }

    getEnumList(connection, req, callback) {
        const reqParam = req.body;

        let dimStr = reqParam.dimensions.map(item => {
            return item.field
        }).join(', ')

        const page = reqParam.limit.page;
        const pageSize = reqParam.limit.pageSize;
        const limitStr = 'limit ' + (page - 1) * pageSize + ', ' + pageSize;

        this._getDataSetById(reqParam.cubeId, connection, (retObj) => {
            const sql = `select distinct ${dimStr} from qe_data.${retObj.physicalMetaObjectName} 
            where 1 = 1 ${limitStr}`;

            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql);
                callback({
                    data: results,
                    result: {
                        message: `查询成功：共${results.length}条，返回${results.length}条`,
                        sql: sql,
                        status: true
                    },
                    success: true
                });
            });
        })
    }

    getData(connection, req, callback) {
        const reqParam = req.body;

        let dimStr = reqParam.dimensions.map(item => {
            return item.field
        }).join(', ')

        if (dimStr) {
            dimStr += ',';
        }

        const metricStr = reqParam.metrics.map(item => {
            if (item.aggregator) {
                return `${item.aggregator}(${item.field}) as ${item.field}`
            } else {
                return item.field
            }
        }).join(', ')

        let groupStr = reqParam.groupBy.map(item => {
            return item.field
        }).join(', ')

        if (groupStr) {
            groupStr = 'group by ' + groupStr;
        }

        const orderObj = (reqParam.orderBy && reqParam.orderBy.length > 0) ? reqParam.orderBy[0] : null;
        const orderStr = orderObj ? `order by ${orderObj.field} ${orderObj.order}` : '';

        const page = reqParam.limit.page;
        const pageSize = reqParam.limit.pageSize;
        const limitStr = 'limit ' + (page - 1) * pageSize + ', ' + pageSize;

        this._getDataSetById(reqParam.cubeId, connection, (retObj) => {
            if (retObj.dataSourceType === 'RESTAPI') {
                var request = require("request");
                request({
                    url: retObj.dataSourceUrl + '/query',
                    method: "post",
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: reqParam
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        callback(body)
                    }
                });
            } else {
                const sql = `select ${dimStr} ${metricStr} from qe_data.${retObj.physicalMetaObjectName} 
                where 1 = 1 ${groupStr} ${orderStr} ${limitStr}`;

                connection.query(sql, function (error, results, fields) {
                    if (error) throw error;
                    console.log(sql);
                    callback({
                        data: results,
                        result: {
                            message: `查询成功：共${results.length}条，返回${results.length}条`,
                            sql: sql,
                            status: true
                        },
                        success: true
                    });
                });
            }
        })
    }

    _getDataSetById(dsId, connection, callback) {
        const that = this;
        const preSql = `select a.*, c.type as dataSourceType, c.attr1 as dataSourceUrl 
        from TD_DR_META_OBJECT a, TD_DR_DATA_SOURCE c 
        where a.datasource_id = c.id and a.id = ${dsId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error) throw error;
            console.log(preSql);
            const list = that.commonService.convertResponse(results);
            callback(list[0])
        });
    }
}
