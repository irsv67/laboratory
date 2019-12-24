
// mysql 视图模拟sql模板
import { createConnection } from "mysql";
import { RouterService } from "./service/RouterService";
import { LayoutService } from "./service/LayoutService";
import { DataSetService } from "./service/DataSetService";
import { DataSourceService } from "./service/DataSourceService";
import { DataModelService } from "./service/DataModelService";

import { BaseRouter } from "./BaseRouter";

const express = require('express');

export class MainService {

    connection: any;
    router: any;

    constructor() {
        this.connection = createConnection({
            host: '127.0.0.1',
            database: 'data_report',
            user: 'root',
            password: 'root'
        });
        this.connection.connect();

        this.router = express.Router();

        const routerService = new RouterService();
        routerService.initRouter(this.router, this.connection);

        const layoutService = new LayoutService();
        layoutService.initRouter(this.router, this.connection);

        const dataSetService = new DataSetService();
        dataSetService.initRouter(this.router, this.connection);

        const dataSourceService = new DataSourceService();
        dataSourceService.initRouter(this.router, this.connection);

        const dataModelService = new DataModelService();
        dataModelService.initRouter(this.router, this.connection);

        const baseRouter = new BaseRouter();
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

const server = new MainService();
server.start();