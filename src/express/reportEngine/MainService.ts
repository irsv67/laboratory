
// mysql 视图模拟sql模板
import { createConnection } from "mysql";
import { RouterService } from "./RouterService";
const express = require('express');

export class MainService {

    connection: any;
    router: any;
    routerService: any;

    constructor() {
        this.connection = createConnection({
            host: '172.23.6.215',
            database: 'data_report',
            user: 'meta',
            password: 'meta2015'
        });
        this.connection.connect();

        this.router = express.Router();

        this.routerService = new RouterService();
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

const server = new MainService();
server.start();