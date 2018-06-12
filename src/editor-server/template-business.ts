import {createConnection} from "mysql";

export class TemplateBusiness {

    listMap: any = {};

    constructor() {

        let _that = this;
        let connection = createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'region'
        });

        connection.query('SELECT * from ud_page', function (error, results, fields) {
            if (error) throw error;
            console.log('query table ud_page' + ', length: ', results.length);
            _that.listMap['ud_page'] = results;
        });
        connection.query('SELECT * from ud_comp', function (error, results, fields) {
            if (error) throw error;
            console.log('query table ud_comp' + ', length: ', results.length);
            _that.listMap['ud_comp'] = results;
        });
    }

    getHtmlUrlByPageId(pageId: any) {
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

    getHtmlTempByCompId(compId: any) {
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