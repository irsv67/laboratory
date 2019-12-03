"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mysql 视图模拟sql模板
const mysql_1 = require("mysql");
const RouterService_1 = require("./RouterService");
const express = require('express');
class MainService {
    constructor() {
        this.connection = mysql_1.createConnection({
            host: '172.23.6.215',
            database: 'data_report',
            user: 'meta',
            password: 'meta2015'
        });
        this.connection.connect();
        this.router = express.Router();
        this.routerService = new RouterService_1.RouterService();
        this.routerService.initRouter(this.router, this.connection);
    }
    start() {
        let app = express();
        app.use('/report-api', this.router);
        let server = app.listen(3000, function () {
            let host = '127.0.0.1';
            let port = server.address().port;
            console.log('server is listening at http://%s:%s/report-api', host, port);
        });
    }
}
exports.MainService = MainService;
const server = new MainService();
server.start();
//# sourceMappingURL=MainService.js.map