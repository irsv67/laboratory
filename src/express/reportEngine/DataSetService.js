"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataSetService {
    constructor() {
    }
    initRouter(router, connection) {
        const that = this;
        router.get('/retrieveDataSourceList', function (req, res) {
            const preSql = `select * from TD_DR_DATA_SOURCE order by create_time desc`;
            connection.query(preSql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                list.forEach(item => {
                    item['url'] = item['attr1'];
                });
                res.send({
                    code: 200,
                    data: list,
                    msg: '查询成功'
                });
            });
        });
        router.get('/retrieveMetadataList', function (req, res) {
            const preSql = `select a.*, c.name as dataSourceName, c.type as dataSourceType 
            from TD_DR_META_OBJECT a, TD_DR_DATA_SOURCE c 
            where a.datasource_id = c.id 
            order by a.create_time desc`;
            connection.query(preSql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                res.send({
                    code: 200,
                    data: list,
                    msg: '查询成功'
                });
            });
        });
        // create
        router.post('/createMetadata', function (req, res) {
        });
        // update
        router.put('/createMetadata', function (req, res) {
            const user = req.headers['dr-user'];
            const tenant = req.headers['dr-tenant'];
            const paramObj = req.body;
            const preSql = `
            UPDATE
                TD_DR_META_OBJECT
            SET
                name = '${paramObj.metaObjectName}',
                type = '${paramObj.metaObjectType}',
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
                res.send({
                    code: 200,
                    msg: '修改成功',
                    success: true,
                });
            });
        });
        router.get('/findMetaById/:metaId', function (req, res) {
            const metaId = req.params.metaId;
            const preSql = `select a.*, 
            c.id as dataSourceId, c.name as dataSourceName, c.type as dataSourceType 
            from TD_DR_META_OBJECT a, TD_DR_DATA_SOURCE c 
            where a.datasource_id = c.id  and a.id = ${metaId}`;
            connection.query(preSql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                const item = list[0];
                item['metaObjectName'] = item['name'];
                item['metaObjectType'] = item['type'];
                const sql = `select * from TD_DR_META_ATTRIBUTE where object_id = ${metaId}`;
                connection.query(sql, function (error, results, fields) {
                    if (error)
                        throw error;
                    console.log(preSql);
                    const list = that.convertResponse(results);
                    list.forEach(item => {
                        item['metaAttributeName'] = item['name'];
                        item['metaAttributeType'] = item['attributeType'];
                    });
                    item['attributes'] = list;
                    res.send(item);
                });
            });
        });
        router.get('/getCubeList', function (req, res) {
            const preSql = `select a.*, c.type as dataSourceType 
            from TD_DR_META_OBJECT a, TD_DR_DATA_SOURCE c 
            where a.datasource_id = c.id 
            order by a.create_time desc`;
            connection.query(preSql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                res.send({
                    code: 200,
                    data: results,
                    total: results.length,
                    msg: '查询成功'
                });
            });
        });
        router.get('/getCubeAttr', function (req, res) {
            const cubeId = req.query.cubeId;
            const preSql = `select * from TD_DR_META_ATTRIBUTE where object_id = ${cubeId}`;
            connection.query(preSql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                const list = that.convertResponse(results);
                list.forEach(item => {
                    item['metaAttributeName'] = item['name'];
                });
                res.send({
                    code: 200,
                    data: list,
                    msg: '查询成功'
                });
            });
        });
    }
    convertResponse(results) {
        const list = results.map(item => {
            const tmpObj = {};
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const value = item[key];
                    const keyNew = key.replace(/\_(\w)/g, function (all, letter) {
                        return letter.toUpperCase();
                    });
                    tmpObj[keyNew] = value;
                }
            }
            return tmpObj;
        });
        return list;
    }
}
exports.DataSetService = DataSetService;
//# sourceMappingURL=DataSetService.js.map