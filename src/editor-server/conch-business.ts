import {ConchDao} from "./conch-dao";
import {ConchCommunication} from "./conch-communication";
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
import {EOL} from "os";
import {createInterface} from "readline";

import {TemplateBusiness} from "./template-business";
import {GenFileService} from "./gen-file.service";

export class ConchBusiness {

    conchDao: any;
    cheerio: any;

    businessService: any;
    genFileService: any;

    constructor() {
        this.conchDao = new ConchDao();
        this.cheerio = require('cheerio');

        this.businessService = new TemplateBusiness();
        this.genFileService = new GenFileService();
    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    queryTableAll(tableName, queryObj, res) {
        let whereClause = " where 1 = 1";
        for (let key in queryObj) {
            if (key != "tableName") {
                whereClause += " and " + key + " = '" + queryObj[key] + "'";
            }
        }

        let sql = 'SELECT * from ' + tableName + whereClause;

        if (tableName === 'ud_comp') {
            sql += ' order by order_index';
        }

        const callback = function (error, results, fields) {
            if (error) throw error;
            console.log('query table ' + tableName + ', length: ', results.length);
            res.send({
                total: results.length,
                data: results,
                fields: fields
            });
        };

        this.conchDao.queryTableAll(sql, callback);

    };

    selectItem(pageId, compId, res) {
        let fReadName = ConchCommunication.getInstance().getHtmlUrlByPageId(pageId);

        let data = readFileSync(fReadName, {encoding: 'utf-8'});
        let $ = this.cheerio.load(data, {
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
    };

    removeItem(pageId, compId, res) {
        let fReadName = ConchCommunication.getInstance().getHtmlUrlByPageId(pageId);

        let data = readFileSync(fReadName, {encoding: 'utf-8'});
        let $ = this.cheerio.load(data, {
            decodeEntities: false,
            _useHtmlParser2: true,
            lowerCaseAttributeNames: false
        });
        let container = $("[editable-id='" + compId + "']");

        container.remove();

        let aaa = $.html();

        if (compId) {
            writeFileSync(fReadName, aaa);
        }

        res.send(JSON.stringify({
            status: "success"
        }));
    };

    saveItem(pageId, compId, style, res) {
        let fReadName = ConchCommunication.getInstance().getHtmlUrlByPageId(pageId);

        let data = readFileSync(fReadName, {encoding: 'utf-8'});
        let $ = this.cheerio.load(data, {
            decodeEntities: false,
            _useHtmlParser2: true,
            lowerCaseAttributeNames: false
        });
        let container = $("[editable-id='" + compId + "']");
        container.attr("style", style);
        let aaa = $.html();

        if (compId) {
            writeFileSync(fReadName, aaa);
        }

        res.send(JSON.stringify({
            status: "success"
        }));
    };

    addComp(compId, pageId, dropPointId, position, res) {
// 植入html代码
        let compObj: any = ConchCommunication.getInstance().getHtmlTempByCompId(compId);
        let fReadName = ConchCommunication.getInstance().getHtmlUrlByPageId(pageId);

        let data = readFileSync(fReadName, {encoding: 'utf-8'});
        let $ = this.cheerio.load(data, {
            decodeEntities: false,
            _useHtmlParser2: true,
            lowerCaseAttributeNames: false
        });
        let container = $("[editable-id=" + dropPointId + "]");

        let html_temp_dom = this.cheerio.load(compObj.html_temp, {
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
                firstNode.attr('editable-id', this.guid());
            }
        }

        if (position && position == 'append') {
            container.append('\r\n' + html_temp_dom.html() + '\r\n');
        } else {
            container.after('\r\n' + html_temp_dom.html() + '\r\n');
        }
        let aaa = $.html();

        writeFileSync(fReadName, aaa);

        // 植入ts代码111
        let CompTemp = ConchCommunication.getInstance().getCompTempByCompId(compId);
        let CompUrl = ConchCommunication.getInstance().getCompUrlByPageId(pageId);

        let fRead = createReadStream(CompUrl);
        let fWrite = createWriteStream(CompUrl + '.tmp');

        let objReadline = createInterface({
            input: fRead,
            output: fWrite
        });
        let index = 1;
        let blockFound = false;
        objReadline.on('line', (line) => {

            if (line.indexOf('block_start_' + compObj.name) != -1) {
                blockFound = true;
                fWrite.write(line + EOL);
            } else if (line.indexOf('include_end') != -1 && !blockFound) {
                fWrite.write('// ====block_start_' + compObj.name + '====' + EOL);
                fWrite.write(CompTemp + EOL);
                fWrite.write('// ====block_end_' + compObj.name + '====' + EOL);
                fWrite.write(line + EOL);
            } else {
                fWrite.write(line + EOL);
            }

            //        console.log(line + EOL);
            index++;
        });

        objReadline.on('close', () => {
            console.log('objReadline-close');
            setTimeout(() => {
                let data = readFileSync(CompUrl + '.tmp', {encoding: 'utf-8'});
                writeFileSync(CompUrl, data);
            }, 1000)
            //        unlinkSync(CompUrl + '.tmp');
        });

        fWrite.on('end', () => {
            console.log('fWrite-end');
        });

        // 返回正确
        res.send(JSON.stringify({
            status: "success"
        }));
    };

    createPage(pageName, res) {
        let pageNameUpper = '';
        let tmpArray = pageName.split('-');
        for (var i = 0; i < tmpArray.length; i++) {
            var obj = tmpArray[i];
            pageNameUpper += obj.charAt(0).toUpperCase() + obj.substring(1);
        }

        console.log('==pageName==:' + pageName);
        console.log('==pageNameUpper==:' + pageNameUpper);

        if (!existsSync(ConchCommunication.getInstance().base_path)) {
            mkdirSync(ConchCommunication.getInstance().base_path);
        }

        let dir_path = ConchCommunication.getInstance().base_path + '/' + pageName;
        if (!existsSync(dir_path)) {
            mkdirSync(dir_path);
        }

        let file_1 = '/' + pageName + '/' + pageName + '.component.html';
        let file_2 = '/' + pageName + '/' + pageName + '.component.less';
        let file_3 = '/' + pageName + '/' + pageName + '.component.ts';
        let file_4 = '/' + pageName + '/' + pageName + '.module.ts';
        let file_5 = '/' + pageName + '/' + pageName + '.service.ts';
        let file_6 = '/' + pageName + '/' + pageName + '.routing.ts';

        let str_1 = this.businessService.getHtmlStr(pageName, pageNameUpper);
        let str_3 = this.businessService.getCompStr(pageName, pageNameUpper);
        let str_4 = this.businessService.getModuleStr(pageName, pageNameUpper);
        let str_5 = this.businessService.getServiceStr(pageName, pageNameUpper);
        let str_6 = this.businessService.getRoutingStr(pageName, pageNameUpper);

        writeFileSync(ConchCommunication.getInstance().base_path + file_1, str_1);
        writeFileSync(ConchCommunication.getInstance().base_path + file_2, '');
        writeFileSync(ConchCommunication.getInstance().base_path + file_3, str_3);
        writeFileSync(ConchCommunication.getInstance().base_path + file_4, str_4);
        writeFileSync(ConchCommunication.getInstance().base_path + file_5, str_5);
        writeFileSync(ConchCommunication.getInstance().base_path + file_6, str_6);

        // ===============================

        let str_router = this.businessService.getRouterStr(pageName, pageNameUpper);
        let CompUrl = ConchCommunication.getInstance().base_app + '/app.routing.ts';

        let fRead = createReadStream(CompUrl);
        let fWrite = createWriteStream(CompUrl + '.tmp');

        let objReadline = createInterface({
            input: fRead,
            output: fWrite
        });
        objReadline.on('line', (line) => {

            if (line.indexOf('include_start') != -1) {
                fWrite.write(line + EOL);
                fWrite.write(str_router + EOL);
            } else {
                fWrite.write(line + EOL);
            }
        });

        objReadline.on('close', () => {
            console.log('objReadline-close');
            setTimeout(() => {
                let data = readFileSync(CompUrl + '.tmp', {encoding: 'utf-8'});
                writeFileSync(CompUrl, data);
            }, 1000)
            //        unlinkSync(CompUrl + '.tmp');
        });

        // ===============================
        let selectSql = `select count(*) as count from ud_page where name = '${pageName}'`;

        let updateSql = `
INSERT
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
        '#/${pageName}/${pageName}'
    );`;

        this.conchDao.updateTable(selectSql, updateSql);

        res.send(JSON.stringify({
            status: "success"
        }));
    };

    createProject(projectName, res) {

        this.genFileService.createProject(projectName);

        // ===============================
        let selectSql = `select count(*) as count from ud_project where name = '${projectName}'`;

        let updateSql = `
INSERT
    INTO
    ud_project
    (
        name,
        profile,
        base_path,
        root_path
    )
    VALUES
    (
        '${projectName}',
        'tommy',
        'J:/test/${projectName}/src/app',
        'J:/test/${projectName}'
    );`;

        this.conchDao.updateTable(selectSql, updateSql);

        res.send(JSON.stringify({
            status: "success"
        }));
    }

    chooseProject(projectId, res) {
        ConchCommunication.getInstance().curProject = ConchCommunication.getInstance().projectMap[projectId];
        ConchCommunication.getInstance().base_path = ConchCommunication.getInstance().curProject.base_path;
        ConchCommunication.getInstance().base_app = ConchCommunication.getInstance().curProject.root_path + '/src/app';

        res.send(JSON.stringify({
            status: "success"
        }));
    }
}