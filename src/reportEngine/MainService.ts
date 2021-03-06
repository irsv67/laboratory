
// mysql 视图模拟sql模板
import { createConnection } from "mysql";
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