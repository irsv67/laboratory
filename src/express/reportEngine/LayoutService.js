"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("node-uuid");
const DataSetService_1 = require("./DataSetService");
class LayoutService {
    constructor() {
        this.dataSetService = new DataSetService_1.DataSetService();
    }
    initRouter(router, connection) {
        const that = this;
        router.post('/createLayout', function (req, res) {
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
                if (error)
                    throw error;
                console.log(sql);
                res.send({
                    code: 200,
                    data: code,
                    msg: '保存成功'
                });
            });
        });
        router.get('/retrieveLayoutList', function (req, res) {
            let productId = req.query.productId;
            const sql = `SELECT * FROM TD_DR_AE_CHART WHERE status = 0 and product_id = ` + productId + ' order by createTime desc';
            connection.query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(sql);
                res.send({
                    code: 200,
                    data: {
                        list: results
                    },
                    msg: '查询成功'
                });
            });
        });
        router.post('/updateLayout', function (req, res) {
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
                if (error)
                    throw error;
                console.log(sql);
                connection.query(sql, function (error, results, fields) {
                    if (error)
                        throw error;
                    console.log(sql);
                    res.send({
                        code: 200,
                        data: code,
                        msg: '保存成功'
                    });
                });
            });
        });
        router.post('/deleteLayout', function (req, res) {
            const code = req.body.join(`', '`);
            const sql = `update TD_DR_AE_CHART set status = 1 where code in ('${code}') and status = 0`;
            connection.query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(sql);
                res.send({
                    code: 200,
                    data: results.changedRows,
                    msg: '修改成功'
                });
            });
        });
        router.get('/getLayoutById/:layoutId', function (req, res) {
            let layoutId = req.params.layoutId;
            const sql = `SELECT * FROM TD_DR_AE_CHART WHERE status = 0 and code = '${layoutId}'`;
            connection.query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(sql);
                const retObj = results.length > 0 ? results[0] : {};
                res.send({
                    code: 200,
                    data: retObj,
                    msg: '查询成功'
                });
            });
        });
        router.post('/getChartData', function (req, res) {
            const reqParam = req.body;
            const dimStr = reqParam.dimensions.map(item => {
                return item.field;
            }).join(', ');
            const metricStr = reqParam.metrics.map(item => {
                if (item.aggregator) {
                    return `${item.aggregator}(${item.field}) as ${item.field}`;
                }
                else {
                    return item.field;
                }
            }).join(', ');
            const groupStr = reqParam.groupBy.map(item => {
                return item.field;
            }).join(', ');
            const page = reqParam.limit.page;
            const pageSize = reqParam.limit.pageSize;
            const limitStr = (page - 1) * pageSize + ', ' + pageSize;
            that.getDataSetById(reqParam.cubeId, connection, (retObj) => {
                const sql = `select ${dimStr}, ${metricStr} from qe_data.${retObj.tableName} 
                where 1 = 1 
                group by ${groupStr} limit ${limitStr}`;
                connection.query(sql, function (error, results, fields) {
                    if (error)
                        throw error;
                    console.log(sql);
                    res.send({
                        data: results,
                        result: {
                            message: `查询成功：共${results.length}条，返回${results.length}条`,
                            sql: sql,
                            status: true
                        },
                        success: true
                    });
                });
            });
        });
    }
    getDataSetById(dsId, connection, callback) {
        const preSql = `select a.*, b.name as tableName from TD_DR_META_OBJECT a, TD_DR_PHYSICAL_META_OBJECT b 
        where a.physical_meta_object_id = b.id and a.id = ${dsId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            callback(results[0]);
        });
    }
}
exports.LayoutService = LayoutService;
//# sourceMappingURL=LayoutService.js.map