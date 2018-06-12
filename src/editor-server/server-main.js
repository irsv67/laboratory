"use strict";
const fs_1 = require("fs");
const mysql_1 = require("mysql");
const template_business_1 = require("./template-business");
let connection = mysql_1.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'region'
});
connection.connect();
//=============service===========
let express = require('express');
let app = express();
let router = express.Router();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let cheerio = require('cheerio');
//=============attribute===========
let businessService = new template_business_1.TemplateBusiness();
//=============attribute_end===========
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//=============init===========
//=============init_end===========
// 含有參數的路由 (http://localhost:8080/hello/:name)
router.get('/hello/:name', function (req, res) {
    res.send('hello ' + req.params.name + '!');
});
//查询所有，必选参数：tableName,可选参数：filter
//http://localhost:3000/queryAll?tableName=TD_TAG&creator=bjadmin
router.get('/queryAll/:tableName', function (req, res) {
    let tableName = req.params.tableName;
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
router.get('/removeItem/:pageId/:compId', function (req, res) {
    let pageId = req.params.pageId;
    let compId = req.params.compId;
    let fReadName = businessService.getHtmlUrlByPageId(pageId);
    let data = fs_1.readFileSync(fReadName, { encoding: 'utf-8' });
    let $ = cheerio.load(data, {
        decodeEntities: false,
        _useHtmlParser2: true,
        lowerCaseAttributeNames: false
    });
    let container = $("[editable-id='" + compId + "']");
    container.remove();
    let aaa = $.html();
    if (compId) {
        fs_1.writeFileSync(fReadName, aaa);
    }
    res.send(JSON.stringify({
        status: "success"
    }));
});
router.get('/selectItem/:pageId/:compId', function (req, res) {
    let pageId = req.params.pageId;
    let compId = req.params.compId;
    let fReadName = businessService.getHtmlUrlByPageId(pageId);
    let data = fs_1.readFileSync(fReadName, { encoding: 'utf-8' });
    let $ = cheerio.load(data, {
        decodeEntities: false,
        _useHtmlParser2: true,
        lowerCaseAttributeNames: false
    });
    let container = $("[editable-id='" + compId + "']");
    let obj = container[0].attribs;
    let serverElement = {
        localName: container[0].name,
        style: obj.style,
        class: obj.class,
        editableId: obj['editable-id']
    };
    if (container.length > 0) {
        res.send(JSON.stringify(serverElement));
    }
});
router.post('/saveItem/:pageId/:compId', function (req, res) {
    let pageId = req.params.pageId;
    let compId = req.params.compId;
    let style = req.body.style;
    let fReadName = businessService.getHtmlUrlByPageId(pageId);
    let data = fs_1.readFileSync(fReadName, { encoding: 'utf-8' });
    let $ = cheerio.load(data, {
        decodeEntities: false,
        _useHtmlParser2: true,
        lowerCaseAttributeNames: false
    });
    let container = $("[editable-id='" + compId + "']");
    container.attr("style", style);
    let aaa = $.html();
    if (compId) {
        fs_1.writeFileSync(fReadName, aaa);
    }
    res.send(JSON.stringify({
        status: "success"
    }));
});
router.post('/addComp', function (req, res) {
    let compId = req.body.compId;
    let pageId = req.body.pageId;
    let dropPointId = req.body.dropPointId;
    let position = req.body.position;
    let compHtml = businessService.getHtmlTempByCompId(compId);
    let fReadName = businessService.getHtmlUrlByPageId(pageId);
    let data = fs_1.readFileSync(fReadName, { encoding: 'utf-8' });
    let $ = cheerio.load(data, {
        decodeEntities: false,
        _useHtmlParser2: true,
        lowerCaseAttributeNames: false
    });
    let container = $("[editable-id=" + dropPointId + "]");
    let html_temp_dom = cheerio.load(compHtml, {
        decodeEntities: false,
        _useHtmlParser2: true,
        lowerCaseAttributeNames: false
    });
    let root_dom = html_temp_dom.root();
    let firstNode = null;
    for (let i = 0; i < root_dom[0].children.length; i++) {
        let obj = root_dom[0].children[i];
        if (obj.type == 'tag') {
            firstNode = $(obj);
            firstNode.attr('editable-id', guid());
        }
    }
    if (position && position == 'append') {
        container.append('\r\n' + html_temp_dom.html() + '\r\n');
    }
    else {
        container.after('\r\n' + html_temp_dom.html() + '\r\n');
    }
    let aaa = $.html();
    fs_1.writeFileSync(fReadName, aaa);
    res.send(JSON.stringify({
        status: "success"
    }));
});
// 將路由套用至應用程式
app.use('/express', router);
let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
//# sourceMappingURL=server-main.js.map