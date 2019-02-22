"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const conch_communication_1 = require("./conch-communication");
class TemplateBusiness {
    constructor() {
        let _that = this;
        let connection = mysql_1.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'region'
        });
        connection.query('SELECT * from ud_project', function (error, results, fields) {
            if (error)
                throw error;
            console.log('query table ud_project' + ', length: ', results.length);
            for (let i = 0; i < results.length; i++) {
                const obj = results[i];
                conch_communication_1.ConchCommunication.getInstance().projectMap[obj.id] = obj;
            }
        });
        connection.query('SELECT * from ud_page', function (error, results, fields) {
            if (error)
                throw error;
            console.log('query table ud_page' + ', length: ', results.length);
            for (let i = 0; i < results.length; i++) {
                const obj = results[i];
                conch_communication_1.ConchCommunication.getInstance().pageMap[obj.id] = obj;
            }
        });
        connection.query('SELECT * from ud_comp', function (error, results, fields) {
            if (error)
                throw error;
            console.log('query table ud_comp' + ', length: ', results.length);
            for (let i = 0; i < results.length; i++) {
                const obj = results[i];
                conch_communication_1.ConchCommunication.getInstance().compMap[obj.id] = obj;
            }
        });
    }
    //    getHtmlUrlByPageId(pageId: any) {
    //        let pageObj = ConchCommunication.getInstance().pageMap[pageId];
    //        return ConchCommunication.getInstance().base_path + pageObj['html_url'];
    //    }
    //
    //    getHtmlTempByCompId(compId: any) {
    //        let compObj = ConchCommunication.getInstance().compMap[compId];
    //        return compObj;
    //    }
    //
    //    getCompUrlByPageId(pageId: any) {
    //        let pageObj = ConchCommunication.getInstance().pageMap[pageId];
    //        return ConchCommunication.getInstance().base_path + pageObj['script_url'];
    //    }
    //
    //    getCompTempByCompId(compId: any) {
    //        let compObj = ConchCommunication.getInstance().compMap[compId];
    //        return compObj['script_temp'];
    //    }
    getHtmlStr(pageName, pageNameUpper) {
        let str_b = '';
        str_b += `<div editable-id="${pageName}" style="background-color: rgba(238,240,243,1); min-height: 200px;">\r\n`;
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