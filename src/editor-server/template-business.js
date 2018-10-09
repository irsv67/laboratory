"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class TemplateBusiness {
    constructor() {
        this.listMap = {};
        this.base_path = 'D:/_git_work/aeplus-front-end_dev/src/app/framework';
        this.base_app = 'D:/_git_work/aeplus-front-end_dev/src/app';
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
        return this.base_path + pageObj['html_url'];
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
        return compObj;
    }
    getCompUrlByPageId(pageId) {
        let pageObj = {};
        let pageList = this.listMap['ud_page'];
        for (let i = 0; i < pageList.length; i++) {
            let obj = pageList[i];
            if (obj.id == pageId) {
                pageObj = obj;
            }
        }
        return this.base_path + pageObj['script_url'];
    }
    getCompTempByCompId(compId) {
        let compObj = {};
        let compList = this.listMap['ud_comp'];
        for (let i = 0; i < compList.length; i++) {
            let obj = compList[i];
            if (obj.id == compId) {
                compObj = obj;
            }
        }
        return compObj['script_temp'];
    }
    getHtmlStr(pageName, pageNameUpper) {
        let str_b = '';
        str_b += `<div editable-id="${pageName}" style="background-color: #ffffff; min-height: 200px;">\r\n`;
        str_b += `\r\n`;
        str_b += `</div>\r\n`;
        return str_b;
    }
    getCompStr(pageName, pageNameUpper) {
        let str_b = '';
        str_b += `import {Component, OnInit} from '@angular/core';\r\n`;
        str_b += `\r\n`;
        str_b += `@Component({\r\n`;
        str_b += `    selector: 'app-${pageName}',\r\n`;
        str_b += `    templateUrl: './${pageName}.component.html',\r\n`;
        str_b += `    styleUrls: ['./${pageName}.component.less']\r\n`;
        str_b += `})\r\n`;
        str_b += `export class ${pageNameUpper}Component implements OnInit {\r\n`;
        str_b += `\r\n`;
        str_b += `    // ====include_start====\r\n`;
        str_b += `    // ====include_end====\r\n`;
        str_b += `    constructor() {\r\n`;
        str_b += `    }\r\n`;
        str_b += `\r\n`;
        str_b += `    ngOnInit() {\r\n`;
        str_b += `    }\r\n`;
        str_b += `\r\n`;
        str_b += `}\r\n`;
        return str_b;
    }
    getModuleStr(pageName, pageNameUpper) {
        let str_b = '';
        str_b += `import {NgModule} from '@angular/core';\r\n`;
        str_b += `import {CommonModule} from '@angular/common';\r\n`;
        str_b += `import {FormsModule} from '@angular/forms';\r\n`;
        str_b += `import {NgZorroAntdModule} from 'ng-zorro-antd';\r\n`;
        str_b += `import {${pageNameUpper}Service} from './${pageName}.service';\r\n`;
        str_b += `import {${pageNameUpper}RoutingModule} from './${pageName}.routing';\r\n`;
        str_b += `import {${pageNameUpper}Component} from './${pageName}.component';\r\n`;
        str_b += `\r\n`;
        str_b += `@NgModule({\r\n`;
        str_b += `    imports: [\r\n`;
        str_b += `        CommonModule,\r\n`;
        str_b += `        FormsModule,\r\n`;
        str_b += `        ${pageNameUpper}RoutingModule,\r\n`;
        str_b += `        NgZorroAntdModule.forRoot()\r\n`;
        str_b += `    ],\r\n`;
        str_b += `    declarations: [${pageNameUpper}Component],\r\n`;
        str_b += `    providers: [${pageNameUpper}Service]\r\n`;
        str_b += `})\r\n`;
        str_b += `export class ${pageNameUpper}Module {\r\n`;
        str_b += `}\r\n`;
        return str_b;
    }
    getServiceStr(pageName, pageNameUpper) {
        let str_b = '';
        str_b += `import {Injectable} from '@angular/core';\r\n`;
        str_b += `\r\n`;
        str_b += `@Injectable()\r\n`;
        str_b += `export class ${pageNameUpper}Service {\r\n`;
        str_b += `\r\n`;
        str_b += `    constructor() {\r\n`;
        str_b += `    }\r\n`;
        str_b += `\r\n`;
        str_b += `}\r\n`;
        return str_b;
    }
    getRoutingStr(pageName, pageNameUpper) {
        let str_b = '';
        str_b += `import {NgModule} from '@angular/core';\r\n`;
        str_b += `import {RouterModule, Routes} from '@angular/router';\r\n`;
        str_b += `import {${pageNameUpper}Component} from './${pageName}.component';\r\n`;
        str_b += `\r\n`;
        str_b += `const appRoutes: Routes = [\r\n`;
        str_b += `    {\r\n`;
        str_b += `        path: '',\r\n`;
        str_b += `        redirectTo: '${pageName}',\r\n`;
        str_b += `        pathMatch: 'full'\r\n`;
        str_b += `    }, {\r\n`;
        str_b += `        path: '${pageName}',\r\n`;
        str_b += `        component: ${pageNameUpper}Component,\r\n`;
        str_b += `    }\r\n`;
        str_b += `];\r\n`;
        str_b += `\r\n`;
        str_b += `@NgModule({\r\n`;
        str_b += `    imports: [\r\n`;
        str_b += `        RouterModule.forChild(appRoutes)\r\n`;
        str_b += `    ],\r\n`;
        str_b += `    exports: [\r\n`;
        str_b += `        RouterModule\r\n`;
        str_b += `    ]\r\n`;
        str_b += `})\r\n`;
        str_b += `export class ${pageNameUpper}RoutingModule {\r\n`;
        str_b += `\r\n`;
        str_b += `}\r\n`;
        return str_b;
    }
    getRouterStr(pageName, pageNameUpper) {
        let str_b = '';
        str_b += `    {\r\n`;
        str_b += `        path: '${pageName}',\r\n`;
        str_b += `        loadChildren: './framework/${pageName}/${pageName}.module#${pageNameUpper}Module'\r\n`;
        str_b += `    },\r\n`;
        return str_b;
    }
}
exports.TemplateBusiness = TemplateBusiness;
//# sourceMappingURL=template-business.js.map