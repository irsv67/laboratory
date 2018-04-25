import {createConnection} from 'mysql';

let connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'visual'
});

connection.connect();

//=============service===========

let express = require('express');
let app = express();

app.get('/query', function (req, res) {
    let tableName = req.query.tableName;
    let start = req.query.start || 0;
    let rows = req.query.rows || 10;

    connection.query('SELECT count(*) as total from ' + tableName, function (error, results, fields) {
        if (error) throw error;
        let total = results[0].total;
        connection.query('SELECT * from ' + tableName + ' limit ' + start + ',' + rows, function (error, results, fields) {
            if (error) throw error;
            console.log('query table ' + tableName + ', length: ', total);
            res.send({
                total: total,
                data: results,
                fields: fields
            });
        });
    });

});

app.get('/TD_DC_VISUAL_CHART', function (req, res) {
    connection.query('SELECT * from TD_DC_VISUAL_CHART', function (error, results, fields) {
        if (error) throw error;
        console.log('query table TD_DC_VISUAL_CHART, length: ', results.length);
        res.send({
            total: results.length,
            data: results.splice(0, 10),
            fields: fields
        });
    });
});

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});