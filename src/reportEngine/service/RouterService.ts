import { CommonService } from "./CommonService";

export class RouterService {

    commonService: any;

    constructor() {
        this.commonService = new CommonService();
    }

    mysqlTypeMap: any = {
        tinyint: 'short',
        smallint: 'short',
        mediumint: 'short',
        int: 'integer',
        bigint: 'long',

        float: 'float',
        double: 'double',
        decimal: 'decimal',

        char: 'string',
        varchar: 'string',

        text: 'string',
        tinytext: 'string',
        mediumtext: 'string',
        longtext: 'string',

        date: 'date',
        time: 'timestamp',
        datetime: 'timestamp',
        timestamp: 'timestamp',

        bool: 'boolean',
        bit: 'byte',
        binary: 'binary',
        varbinary: 'binary',

        blob: 'binary',
        tinyblob: 'binary',
        mediumblob: 'binary',
        longblob: 'binary',
    }

    physicalMetaObjects(connection, req, callback) {
        const that = this;
        const sql = `SELECT * FROM information_schema.tables WHERE table_schema = 'qe_data'`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log(sql, results.length);
            const retList = results.map(item => {
                return item['TABLE_NAME']
            });
            callback({
                data: retList,
                success: true
            });
        });
    }

    physicalMetaAttributes(connection, req, callback) {
        const that = this;
        const dsId = req.query.dsId;
        const tableName = req.body.physicalMetaObjectName;

        if (tableName !== 'queryMetadata') {
            const sql = `SELECT * FROM information_schema.columns WHERE table_name = '${tableName}'`;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql, results.length);
                const retList = results.map(item => {
                    const qeType = that.mysqlTypeMap[item['DATA_TYPE']] || 'string';
                    return {
                        columnName: item['COLUMN_NAME'],
                        columnDescription: item['COLUMN_COMMENT'] || item['COLUMN_NAME'],
                        columnType: qeType,
                    }
                });
                callback({
                    data: retList,
                    success: true
                });
            });
        } else {
            that._getDataSourceById(dsId, connection, (retObj) => {
                var request = require("request");
                request({
                    url: retObj.attr1 + '/queryMetadata',
                    method: "post",
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        callback(body)
                    }
                });
            })
        }
    }

    _getDataSourceById(dsId, connection, callback) {
        const that = this;
        const preSql = `select * from TD_DR_DATA_SOURCE where id = ${dsId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error) throw error;
            console.log(preSql);
            const list = that.commonService.convertResponse(results);
            callback(list[0])
        });
    }
}
