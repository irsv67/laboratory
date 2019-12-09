"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mysql 视图模拟sql模板
const mysql_1 = require("mysql");
const RouterService_1 = require("./RouterService");
const LayoutService_1 = require("./LayoutService");
const DataSetService_1 = require("./DataSetService");
const DataSourceService_1 = require("./DataSourceService");
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
        const routerService = new RouterService_1.RouterService();
        routerService.initRouter(this.router, this.connection);
        const layoutService = new LayoutService_1.LayoutService();
        layoutService.initRouter(this.router, this.connection);
        const dataSetService = new DataSetService_1.DataSetService();
        dataSetService.initRouter(this.router, this.connection);
        const dataSourceService = new DataSourceService_1.DataSourceService();
        dataSourceService.initRouter(this.router, this.connection);
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