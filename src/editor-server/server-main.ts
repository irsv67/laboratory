import {
    createReadStream,
    createWriteStream,
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    renameSync,
    statSync,
    unlinkSync,
    writeFileSync
} from "fs";
import {ConchBusiness} from "./conch-business";
import {ConchCommunication} from "./conch-communication";

export class ServerMain {

    app: any;
    router: any;

    conchBusiness: any;

    constructor() {

        this.conchBusiness = new ConchBusiness();

        let express = require('express');
        this.app = express();

        let bodyParser = require('body-parser');
        this.app.use(bodyParser.json());

        this.router = express.Router();
    }

    initRouter() {
        let that = this;

        // 测试express接口
        this.router.get('/hello/:name', function (req, res) {
            res.send('hello ' + req.params.name + '!');
        });

        // 查询所有表格，必选参数：tableName,可选参数：filter
        this.router.get('/queryAll/:tableName', function (req, res) {
            let tableName = req.params.tableName;
            const queryObj = req.query;
            that.conchBusiness.queryTableAll(tableName, queryObj, res);
        });

        // 选择页面元素
        this.router.get('/selectItem/:pageId/:compId', function (req, res) {
            let pageId = req.params.pageId;
            let compId = req.params.compId;
            that.conchBusiness.selectItem(pageId, compId, res);
        });

        // 删除页面元素
        this.router.get('/removeItem/:pageId/:compId', function (req, res) {
            let pageId = req.params.pageId;
            let compId = req.params.compId;
            that.conchBusiness.removeItem(pageId, compId, res);
        });

        // 保存页面元素
        this.router.post('/saveItem/:pageId/:compId', function (req, res) {
            let pageId = req.params.pageId;
            let compId = req.params.compId;
            let style = req.body.style;
            that.conchBusiness.saveItem(pageId, compId, style, res);
        });

        // 添加组件
        this.router.post('/addComp', function (req, res) {
            let compId = req.body.compId;
            let pageId = req.body.pageId;
            let dropPointId = req.body.dropPointId;
            let position = req.body.position;
            that.conchBusiness.addComp(compId, pageId, dropPointId, position, res);
        });

        // ==========================

        this.router.post('/createProject', function (req, res) {
            let projectName = req.body.projectName;

            that.conchBusiness.createProject(projectName, res);

        });

        this.router.post('/chooseProject', function (req, res) {
            let projectId = req.body.projectId;
            that.conchBusiness.chooseProject(projectId, res);
        });

        this.router.post('/createPage', function (req, res) {
            let pageName = req.body.pageName;
            that.conchBusiness.createPage(pageName, res);
        });
    }



    startServer() {

        this.initRouter();

        // 应用路由配置
        this.app.use('/express', this.router);

        let server = this.app.listen(3000, function () {
            let host = server.address().address;
            let port = server.address().port;
            console.log('Example app listening at http://%s:%s', host, port);
        });

    }
}

let serverMain = new ServerMain();
serverMain.startServer();