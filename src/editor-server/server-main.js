"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const mysql_1 = require("mysql");
const template_business_1 = require("./template-business");
const os_1 = require("os");
const fs_2 = require("fs");
const readline_1 = require("readline");
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
    // 植入html代码
    let compObj = businessService.getHtmlTempByCompId(compId);
    let fReadName = businessService.getHtmlUrlByPageId(pageId);
    let data = fs_1.readFileSync(fReadName, { encoding: 'utf-8' });
    let $ = cheerio.load(data, {
        decodeEntities: false,
        _useHtmlParser2: true,
        lowerCaseAttributeNames: false
    });
    let container = $("[editable-id=" + dropPointId + "]");
    let html_temp_dom = cheerio.load(compObj.html_temp, {
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
    // 植入ts代码111
    let CompTemp = businessService.getCompTempByCompId(compId);
    let CompUrl = businessService.getCompUrlByPageId(pageId);
    let fRead = fs_2.createReadStream(CompUrl);
    let fWrite = fs_2.createWriteStream(CompUrl + '.tmp');
    let objReadline = readline_1.createInterface({
        input: fRead,
        output: fWrite
    });
    let index = 1;
    let blockFound = false;
    objReadline.on('line', (line) => {
        if (line.indexOf('block_start_' + compObj.name) != -1) {
            blockFound = true;
            fWrite.write(line + os_1.EOL);
        }
        else if (line.indexOf('include_end') != -1 && !blockFound) {
            fWrite.write('// ====block_start_' + compObj.name + '====' + os_1.EOL);
            fWrite.write(CompTemp + os_1.EOL);
            fWrite.write('// ====block_end_' + compObj.name + '====' + os_1.EOL);
            fWrite.write(line + os_1.EOL);
        }
        else {
            fWrite.write(line + os_1.EOL);
        }
        //        console.log(line + EOL);
        index++;
    });
    objReadline.on('close', () => {
        console.log('objReadline-close');
        setTimeout(() => {
            let data = fs_1.readFileSync(CompUrl + '.tmp', { encoding: 'utf-8' });
            fs_1.writeFileSync(CompUrl, data);
        }, 1000);
        //        unlinkSync(CompUrl + '.tmp');
    });
    fWrite.on('end', () => {
        console.log('fWrite-end');
    });
    // 返回正确
    res.send(JSON.stringify({
        status: "success"
    }));
});
// ==========================
router.post('/createPage', function (req, res) {
    let pageName = req.body.pageName;
    let pageNameUpper = '';
    let tmpArray = pageName.split('-');
    for (var i = 0; i < tmpArray.length; i++) {
        var obj = tmpArray[i];
        pageNameUpper += obj.charAt(0).toUpperCase() + obj.substring(1);
    }
    console.log('==pageName==:' + pageName);
    console.log('==pageNameUpper==:' + pageNameUpper);
    if (!fs_1.existsSync(businessService.base_path)) {
        fs_1.mkdirSync(businessService.base_path);
    }
    let dir_path = businessService.base_path + '/' + pageName;
    if (!fs_1.existsSync(dir_path)) {
        fs_1.mkdirSync(dir_path);
    }
    let file_1 = '/' + pageName + '/' + pageName + '.component.html';
    let file_2 = '/' + pageName + '/' + pageName + '.component.less';
    let file_3 = '/' + pageName + '/' + pageName + '.component.ts';
    let file_4 = '/' + pageName + '/' + pageName + '.module.ts';
    let file_5 = '/' + pageName + '/' + pageName + '.service.ts';
    let file_6 = '/' + pageName + '/' + pageName + '.routing.ts';
    let str_1 = businessService.getHtmlStr(pageName, pageNameUpper);
    let str_3 = businessService.getCompStr(pageName, pageNameUpper);
    let str_4 = businessService.getModuleStr(pageName, pageNameUpper);
    let str_5 = businessService.getServiceStr(pageName, pageNameUpper);
    let str_6 = businessService.getRoutingStr(pageName, pageNameUpper);
    fs_1.writeFileSync(businessService.base_path + file_1, str_1);
    fs_1.writeFileSync(businessService.base_path + file_2, '');
    fs_1.writeFileSync(businessService.base_path + file_3, str_3);
    fs_1.writeFileSync(businessService.base_path + file_4, str_4);
    fs_1.writeFileSync(businessService.base_path + file_5, str_5);
    fs_1.writeFileSync(businessService.base_path + file_6, str_6);
    let selectSql = `select count(*) as count from ud_page where name = '${pageName}'`;
    let updateSql = `INSERT
    INTO
    ud_page
    (
        name,
        html_url,
        style_url,
        script_url,
        module_url,
        service_url,
        url
    )
    VALUES
    (
        '${pageName}',
        '${file_1}',
        '${file_2}',
        '${file_3}',
        '${file_4}',
        '${file_5}',
        'aaa'
    );`;
    let bbb = 1;
    console.log(bbb);
    connection.query(selectSql, function (error, results, fields) {
        let count = results[0].count;
        if (count === 0) {
            connection.query(updateSql, function (error, results, fields) {
                console.log('affectedRows:' + results.affectedRows);
            });
        }
    });
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