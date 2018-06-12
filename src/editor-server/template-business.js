"use strict";
const mysql_1 = require("mysql");
class TemplateBusiness {
    constructor() {
        this.listMap = {};
        let _that = this;
        let connection = mysql_1.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'region'
        });
        connection.query('SELECT * from ud_page', function (error, results, fields) {
            if (error)
                throw error;
            console.log('query table ud_page' + ', length: ', results.length);
            _that.listMap['ud_page'] = results;
        });
        connection.query('SELECT * from ud_comp', function (error, results, fields) {
            if (error)
                throw error;
            console.log('query table ud_comp' + ', length: ', results.length);
            _that.listMap['ud_comp'] = results;
        });
    }
    getHtmlUrlByPageId(pageId) {
        let pageObj = {};
        let pageList = this.listMap['ud_page'];
        for (let i = 0; i < pageList.length; i++) {
            let obj = pageList[i];
            if (obj.id == pageId) {
                pageObj = obj;
            }
        }
        return pageObj['html_url'];
    }
    getHtmlTempByCompId(compId) {
        let compObj = {};
        let compList = this.listMap['ud_comp'];
        for (let i = 0; i < compList.length; i++) {
            let obj = compList[i];
            if (obj.id == compId) {
                compObj = obj;
            }
        }
        return compObj['html_temp'];
    }
}
exports.TemplateBusiness = TemplateBusiness;
//# sourceMappingURL=template-business.js.map