"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mysql 视图模拟sql模板
const mysql_1 = require("mysql");
const BaseRouter_1 = require("./BaseRouter");
const express = require('express');
class MainService {
    constructor() {
        this.connection = mysql_1.createConnection({
            host: '127.0.0.1',
            database: 'data_report',
            user: 'root',
            password: 'root'
        });
        this.connection.connect();
        this.router = express.Router();
        const baseRouter = new BaseRouter_1.BaseRouter();
        baseRouter.initRouter(this.router, this.connection);
    }
    start() {
        let app = express();
        const bodyParser = require('body-parser');
        app.use(bodyParser.json());
        app.use('/report-local', this.router);
        let server = app.listen(3000, function () {
            let host = '127.0.0.1';
            let port = server.address().port;
            console.log('server is listening at http://%s:%s/report-local', host, port);
        });
    }
}
exports.MainService = MainService;
const server = new MainService();
server.start();
//# sourceMappingURL=MainService.js.map