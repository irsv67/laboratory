"use strict";
const mysql_1 = require("mysql");
/**
 * 公共查询后台
 * @type {Connection}
 */
let connection = mysql_1.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});
connection.connect();
//=============service===========
let express = require('express');
let app = express();
let router = express.Router();
//接收分页查询请求，必选参数：tableName，可选参数：start，rows
//http://localhost:3000/queryPage?tableName=TD_TAG
router.get('/queryPage/:tableName', function (req, res) {
    let tableName = req.params.tableName;
    let start = req.query.start || 0;
    let rows = req.query.rows || 10;
    connection.query('SELECT count(*) as total from ' + tableName, function (error, results, fields) {
        if (error)
            throw error;
        let total = results[0].total;
        connection.query('SELECT * from ' + tableName + ' limit ' + start + ',' + rows, function (error, results, fields) {
            if (error)
                throw error;
            console.log('query table ' + tableName + ', length: ', total);
            res.send({
                total: total,
                data: results,
                fields: fields
            });
        });
    });
});
//查询所有，必选参数：tableName,可选参数：filter
//http://localhost:3000/queryAll?tableName=TD_TAG&creator=bjadmin
router.get('/queryAll/:tableName', function (req, res) {
    let tableName = req.params.tableName;
    let whereClause = " where 1 = 1";
    for (let key in req.query) {
        if (key != "tableName") {
            whereClause += " and " + key + " = '" + req.query[key] + "'";
        }
    }
    connection.query('SELECT * from ' + tableName + whereClause, function (error, results, fields) {
        if (error)
            throw error;
        console.log('query table ' + tableName + ', length: ', results.length);
        res.send({
            total: results.length,
            data: results,
            fields: fields
        });
    });
});
//查询所有，必选参数：tableName,可选参数：filter
//http://localhost:3000/queryAll?tableName=TD_TAG&creator=bjadmin
router.get('/queryOne/:tableName/:id', function (req, res) {
    let tableName = req.params.tableName;
    let whereClause = " where 1 = 1 and id = " + req.params.id;
    connection.query('SELECT * from ' + tableName + whereClause, function (error, results, fields) {
        if (error)
            throw error;
        console.log('query table ' + tableName + ', length: ', results.length);
        if (results.length == 1) {
            res.send(results[0]);
        }
        else {
            res.send({
                total: results.length,
                data: results,
                fields: fields
            });
        }
    });
});
//查询列配置，必选参数：MODEL_ID
//http://localhost:3000/queryColumn?MODEL_ID=7cabd6ff-9425-4cea-91ec-64dc3b72c6f8
router.get('/queryColumn/:tableName', function (req, res) {
    let tableName = "MT_MODEL_ITEM";
    let whereClause = " where 1 = 1 and MODEL_ID = '" + req.query["MODEL_ID"] + "'";
    let orderClause = " order by ORDER_INDEX";
    connection.query('SELECT * from ' + tableName + whereClause + orderClause, function (error, results, fields) {
        if (error)
            throw error;
        console.log('query table ' + tableName + ', length: ', results.length);
        let searchArray = [];
        let listArray = [];
        let formArray = [];
        for (let i = 0; i < results.length; i++) {
            let obj = results[i];
            if (obj['SEARCH_ON'] == "1") {
                searchArray.push({
                    name: obj["COLUMN_NAME"],
                    desc: obj["COLUMN_DESC"],
                    type: "normal"
                });
            }
            if (obj['CM_ON'] == "1") {
                listArray.push({
                    name: obj["COLUMN_NAME"],
                    desc: obj["COLUMN_DESC"],
                    type: "normal"
                });
            }
            if (obj['FORM_ON'] == "1") {
                formArray.push({
                    name: obj["COLUMN_NAME"],
                    desc: obj["COLUMN_DESC"],
                    type: "normal"
                });
            }
        }
        res.send({
            searchArray: searchArray,
            listArray: listArray,
            formArray: formArray
        });
    });
});
// 含有參數的路由 (http://localhost:8080/hello/:name)
router.get('/hello/:name', function (req, res) {
    res.send('hello ' + req.params.name + '!');
});
// 將路由套用至應用程式
app.use('/express', router);
let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
//# sourceMappingURL=app2.js.map