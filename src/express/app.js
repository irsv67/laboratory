"use strict";
const mysql_1 = require("mysql");
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
//接收分页查询请求，必选参数：tableName，可选参数：start，rows
//http://localhost:3000/queryPage?tableName=TD_TAG
app.get('/queryPage', function (req, res) {
    let tableName = req.query.tableName;
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
app.get('/queryAll', function (req, res) {
    let tableName = req.query.tableName;
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
app.get('/queryOne', function (req, res) {
    let tableName = req.query.tableName;
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
app.get('/queryColumn', function (req, res) {
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
let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
//# sourceMappingURL=app.js.map