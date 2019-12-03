
export class RouterService {
    constructor() {
    }

    initRouter(router, connection) {

        // 含有參數的路由 (http://localhost:8080/hello/:name)
        router.get('/', function (req, res) {
            res.send('hello world!');
        });

        // /metadata/datasources/rows
        router.get('/metadata/datasources/rows', function (req, res) {
            const sql = `SELECT * FROM information_schema.tables WHERE table_schema = 'data_report'`;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql, results.length);
                const retList = results.map(item => {
                    return {
                        name: item['TABLE_NAME']
                    }
                });
                res.send(retList);
            });
        });
        // ===================================
        // 查询数据集列表
        router.get('/dataSets', function (req, res) {
            const sql = `SELECT * FROM information_schema.tables WHERE table_schema = 'data_report'`;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql, results.length);
                const retList = results.map(item => {
                    return {
                        name: item['TABLE_NAME']
                    }
                });
                res.send(retList);
            });
        });

        // 查询数据集属性
        router.get('/dataSet/:name', function (req, res) {
            let name = req.params.name;
            const sql = `SELECT * FROM information_schema.columns WHERE table_name = '${name}'`;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(sql, results.length);
                const retList = results.map(item => {
                    return {
                        name: item['COLUMN_NAME'],
                        desc: item['COLUMN_COMMENT'] || item['COLUMN_NAME'],
                        dataType: item['DATA_TYPE'],
                    }
                });
                res.send(retList);
            });
        });

        // 查询数据
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
}
