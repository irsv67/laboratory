"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonService_1 = require("./CommonService");
class DataSetService {
    constructor() {
        this.commonService = new CommonService_1.CommonService();
    }
    createMetadata(connection, req, callback) {
        const that = this;
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
                callback({
                    code: 200,
                    msg: '修改成功',
                    success: true,
                });
            });
        });
    }
    updateMetadata(connection, req, callback) {
        const that = this;
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
                callback({
                    code: 200,
                    msg: '修改成功',
                    success: true,
                });
            });
        });
    }
    retrieveMetadataList(connection, req, callback) {
        const that = this;
        const preSql = `select a.*, c.name as dataSourceName, c.type as dataSourceType 
        from TD_DR_META_OBJECT a, TD_DR_DATA_SOURCE c 
        where a.datasource_id = c.id 
        order by a.create_time desc`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            const list = that.commonService.convertResponse(results);
            callback({
                code: 200,
                data: list,
                msg: '查询成功'
            });
        });
    }
    deleteMetadata(connection, req, callback) {
        const that = this;
        const metaId = req.query.metaId;
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
                callback({
                    code: 200,
                    msg: '删除成功'
                });
            });
        });
    }
    findMetaById(connection, req, callback) {
        const that = this;
        const metaId = req.query.metaId;
        const preSql = `select a.*, 
        c.id as dataSourceId, c.name as dataSourceName, c.type as dataSourceType 
        from TD_DR_META_OBJECT a, TD_DR_DATA_SOURCE c 
        where a.datasource_id = c.id  and a.id = ${metaId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            const list = that.commonService.convertResponse(results);
            const item = list[0];
            item['metaObjectName'] = item['name'];
            item['metaObjectType'] = item['type'];
            const sql = `select * from TD_DR_META_ATTRIBUTE where object_id = ${metaId}`;
            connection.query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                console.log(preSql);
                const list = that.commonService.convertResponse(results);
                list.forEach(item => {
                    item['metaAttributeName'] = item['name'];
                    item['metaAttributeType'] = item['attributeType'];
                });
                item['attributes'] = list;
                callback(item);
            });
        });
    }
    getMetaAttrList(connection, req, callback) {
        const that = this;
        const cubeId = req.query.cubeId;
        const preSql = `select * from TD_DR_META_ATTRIBUTE where object_id = ${cubeId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error)
                throw error;
            console.log(preSql);
            const list = that.commonService.convertResponse(results);
            list.forEach(item => {
                item['metaAttributeName'] = item['name'];
            });
            callback({
                code: 200,
                data: list,
                msg: '查询成功'
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
}
exports.DataSetService = DataSetService;
//# sourceMappingURL=DataSetService.js.map