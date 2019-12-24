"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataSetService {
    constructor() {
    }
    initRouter(router, connection) {
        const that = this;
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
            const user = req.headers['dr-user'];
            const tenant = req.headers['dr-tenant'];
            const paramObj = req.body;
            const preSql = `
            insert into TD_DR_META_OBJECT (name, datasource_id, type, status, 
            split, multi_dimensional, product_id, tenant_id, physical_meta_object_name, 
            creator, create_by, updater, update_by) values (?)`;
            const values = [paramObj.metaObjectName, paramObj.dataSourceId, '' + paramObj.metaObjectType,
                paramObj.status, paramObj.split, paramObj.multiDimensional, paramObj.productId,
                tenant, paramObj.physicalMetaObjectName, user, user, user, user];
            connection.query(preSql, [values], function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                that._updateAttributes(results.insertId, tenant, paramObj.attributes, connection, (attrRes) => {
                    res.send({
                        code: 200,
                        msg: '修改成功',
                        success: true,
                    });
                });
            });
        });
        // update
        router.put('/updateMetadata', function (req, res) {
            const user = req.headers['dr-user'];
            const tenant = req.headers['dr-tenant'];
            const paramObj = req.body;
            const preSql = `
            UPDATE
                TD_DR_META_OBJECT
            SET
                datasource_id = '${paramObj.dataSourceId}',
                name = '${paramObj.metaObjectName}',
                type = '${paramObj.metaObjectType}',
                physical_meta_object_name = '${paramObj.physicalMetaObjectName}',
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
                that._updateAttributes(paramObj.id, tenant, paramObj.attributes, connection, (attrRes) => {
                    res.send({
                        code: 200,
                        msg: '修改成功',
                        success: true,
                    });
                });
            });
        });
        router.delete('/deleteMetadata/:metaId', function (req, res) {
            const metaId = req.params.metaId;
            const preSql = `delete from TD_DR_META_ATTRIBUTE where object_id = ${metaId}`;
            connection.query(preSql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                const sql = `delete from TD_DR_META_OBJECT where id = ${metaId}`;
                connection.query(sql, function (error, results, fields) {
                    if (error)
                        throw error;
                    console.log(sql);
                    res.send({
                        code: 200,
                        msg: '删除成功'
                    });
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
        router.get('/getMetaAttrList/:cubeId', function (req, res) {
            const cubeId = req.params.cubeId;
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
    _updateAttributes(objId, tenant, attrList, connection, callback) {
        const preSql = `delete from TD_DR_META_ATTRIBUTE where object_id = ${objId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            const sql = `insert into TD_DR_META_ATTRIBUTE 
            (name, object_id, attribute_type, is_enum, type, is_logic, expression, 
            physical_meta_attribute_name, physical_meta_attribute_type, mapping_rule, tenant_id) 
            values ?`;
            let values = attrList.map(item => {
                return [item.metaAttributeName, objId, item.metaAttributeType,
                    item.isEnum, item.type, item.isLogic, 'false',
                    item.physicalMetaAttributeName, item.physicalMetaAttributeType,
                    item.mappingRule, tenant];
            });
            connection.query(sql, [values], function (error, results, fields) {
                if (error)
                    throw error;
                console.log(sql);
                callback(results);
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