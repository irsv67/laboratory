
export class RouterService {

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

    constructor() {
    }

    initRouter(router, connection) {
        const that = this;

        router.get('/physicalMetaObjects/:dsId', function (req, res) {
            const sql = `SELECT * FROM information_schema.tables WHERE table_schema = 'qe_data'`;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql, results.length);
                const retList = results.map(item => {
                    return item['TABLE_NAME']
                });
                res.send({
                    data: retList,
                    success: true
                });
            });
        });

        router.post('/physicalMetaAttributes/:dsId', function (req, res) {
            const dsId = req.params.dsId;
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
                    res.send({
                        data: retList,
                        success: true
                    });
                });
            } else {
                that.getDataSourceById(dsId, connection, (retObj) => {
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
                            res.send(body)
                        }
                    });
                })
            }
        });

        // 含有參數的路由 (http://localhost:8080/hello/:name)
        router.get('/', function (req, res) {
            res.send('hello world!');
        });

        // 查询视图数据
        router.get('/data/:name', function (req, res) {
            let name = req.params.name;
            const sql = `SELECT * FROM information_schema.views WHERE table_schema = 'enterprise' and  table_name = '${name}'`;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql, results.length);
                const sql2 = results[0]['VIEW_DEFINITION'];

                connection.query(sql2, function (error, results, fields) {
                    if (error) throw error;
                    console.log(sql2, results.length);
                    res.send(results);
                });
            });
        });
    }

    getDataSourceById(dsId, connection, callback) {
        const that = this;
        const preSql = `select * from TD_DR_DATA_SOURCE where id = ${dsId}`;
        connection.query(preSql, function (error, results, fields) {
            if (error) throw error;
            console.log(preSql);
            const list = that.convertResponse(results);
            callback(list[0])
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
        })
        return list;
    }
}
