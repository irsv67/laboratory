
// mysql 视图模拟sql模板
import { createConnection } from "mysql";

let connection = createConnection({
    host: '172.23.5.54',
    database: 'enterprise',
    user: 'meta',
    password: 'meta2015'
});

connection.connect();

//=============service===========

let express = require('express');
let app = express();
let router = express.Router();



// 含有參數的路由 (http://localhost:8080/hello/:name)
router.get('/hello/:name', function (req, res) {
    res.send('hello ' + req.params.name + '!');
});

// ===================================
// 查询数据集列表
router.get('/dataSets', function (req, res) {
    const sql = `SELECT * FROM information_schema.views WHERE table_schema = 'enterprise'`;
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log(sql, results.length);
        const retList = results.map(item => {
            return {
                name: item['TABLE_NAME'],
                sql: item['VIEW_DEFINITION']
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

// 將路由套用至應用程式
app.use('/express', router);

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});