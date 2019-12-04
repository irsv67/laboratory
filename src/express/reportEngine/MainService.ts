
// mysql 视图模拟sql模板
import { createConnection } from "mysql";
import { RouterService } from "./RouterService";
import { LayoutService } from "./LayoutService";

const express = require('express');

export class MainService {

    connection: any;
    router: any;

    constructor() {
        this.connection = createConnection({
            host: '172.23.6.215',
            database: 'data_report',
            user: 'meta',
            password: 'meta2015'
        });
        this.connection.connect();

        this.router = express.Router();

        const routerService = new RouterService();
        routerService.initRouter(this.router, this.connection);

        const layoutService = new LayoutService();
        layoutService.initRouter(this.router, this.connection);

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