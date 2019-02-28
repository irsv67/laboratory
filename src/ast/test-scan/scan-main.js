"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const _ts = require("typescript");
const parser_1 = require("../parser");
const scan_script_1 = require("./scan-script");
const scan_html_1 = require("./scan-html");
class ScanMain {
    constructor() {
        this.parser = new parser_1.Parser();
        this.cheerio = require('cheerio');
        this.scanScript = new scan_script_1.ScanScript();
        this.scanHtml = new scan_html_1.ScanHtml();
    }
    scanProject(projectObj) {
        const projectConchPath = projectObj.root_path + '/_con_pro';
        if (!fs_1.existsSync(projectConchPath)) {
            fs_1.mkdirSync(projectConchPath);
        }
        const root_path = projectObj.root_path + '/src/app';
        const moduleMap = {
            NgModule: {},
            Component: {},
            Injectable: {}
        };
        const htmlMap = {};
        this.scanProjectAllRecu(root_path, '.', moduleMap, htmlMap);
        setTimeout(() => {
            this.convertData(moduleMap, htmlMap);
            const netData = {
                nodes: [],
                edges: []
            };
            this.parseModuleAndComp(moduleMap, netData);
            const compAndComp = {
                nodes: [],
                edges: []
            };
            this.parseCompAndComp(moduleMap, compAndComp);
            fs_1.writeFileSync(projectConchPath + '/s_moduleMap.json', JSON.stringify(moduleMap));
            fs_1.writeFileSync(projectConchPath + '/s_htmlMap.json', JSON.stringify(htmlMap));
            fs_1.writeFileSync(projectConchPath + '/s_netMap.json', JSON.stringify(netData));
            fs_1.writeFileSync(projectConchPath + '/s_compAndComp.json', JSON.stringify(compAndComp));
        }, 1000);
    }
    parseCompAndComp(moduleMap, compAndComp) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };
        for (let module in moduleMap['Component']) {
            const moduleList = moduleMap['Component'][module];
            moduleList.forEach((moduleObj) => {
                if (moduleObj.compList) {
                    moduleObj.compList.forEach((compObj) => {
                        let type;
                        if (moduleMap['Component'][compObj]) {
                            type = 'Component';
                        }
                        if (type) {
                            if (!tmpObj.nodeMap[module]) {
                                tmpObj.nodeMap[module] = 1;
                                compAndComp.nodes.push({
                                    "id": module,
                                    "type": type,
                                    "name": module,
                                    "degree": 57
                                });
                            }
                            if (!tmpObj.nodeMap[compObj]) {
                                tmpObj.nodeMap[compObj] = 1;
                                compAndComp.nodes.push({
                                    "id": compObj,
                                    "type": type,
                                    "name": compObj,
                                    "degree": 57
                                });
                            }
                            if (!tmpObj.edgeMap[module + compObj]) {
                                tmpObj.edgeMap[module + compObj] = 1;
                                compAndComp.edges.push({
                                    "id": "edge_" + countId++,
                                    "source": module,
                                    "target": compObj
                                });
                            }
                        }
                    });
                }
            });
        }
    }
    parseModuleAndComp(moduleMap, netData) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };
        for (let module in moduleMap['NgModule']) {
            const moduleList = moduleMap['NgModule'][module];
            moduleList.forEach((moduleObj) => {
                if (moduleObj.importList) {
                    moduleObj.importList.forEach((importObj) => {
                        let type;
                        if (moduleMap['NgModule'][importObj.class]) {
                            type = 'NgModule';
                        }
                        else if (moduleMap['Component'][importObj.class]) {
                            type = 'Component';
                        }
                        if (type) {
                            if (!tmpObj.nodeMap[module]) {
                                tmpObj.nodeMap[module] = 1;
                                netData.nodes.push({
                                    "id": module,
                                    "type": 'NgModule',
                                    "name": module,
                                    "degree": 57
                                });
                            }
                            if (!tmpObj.nodeMap[importObj.class]) {
                                tmpObj.nodeMap[importObj.class] = 1;
                                let degree = (type === 'NgModule' ? 57 : 23);
                                netData.nodes.push({
                                    "id": importObj.class,
                                    "type": type,
                                    "name": importObj.class,
                                    "degree": degree
                                });
                            }
                            if (!tmpObj.edgeMap[module + importObj.class]) {
                                tmpObj.edgeMap[module + importObj.class] = 1;
                                netData.edges.push({
                                    "id": "edge_" + countId++,
                                    "source": module,
                                    "target": importObj.class
                                });
                            }
                        }
                    });
                }
            });
        }
    }
    convertData(moduleMap, htmlMap) {
        // 将html依赖拼装进moduleMap
        for (let module in moduleMap['Component']) {
            const moduleList = moduleMap['Component'][module];
            moduleList.forEach((modlueObj) => {
                if (htmlMap[module]) {
                    // 找到对应的html对象
                    const htmlList = htmlMap[module];
                    let htmlObj;
                    if (htmlList.length == 1) {
                        htmlObj = htmlList[0];
                    }
                    else {
                        htmlList.forEach((obj) => {
                            if (obj.fullPath === modlueObj.fullPath) {
                                htmlObj = obj;
                            }
                        });
                    }
                    if (htmlObj && htmlObj.compList) {
                        console.log('compList:' + module);
                        modlueObj.compList = htmlObj.compList;
                    }
                }
            });
        }
        // 筛选出重名组件存入独立的对象副本
        moduleMap['NgModule_multi'] = {};
        moduleMap['Component_multi'] = {};
        moduleMap['Injectable_multi'] = {};
        moduleMap['RoutingConfigMap'] = {};
        for (let module in moduleMap['NgModule']) {
            const moduleList = moduleMap['NgModule'][module];
            if (moduleList.length > 1) {
                moduleMap['NgModule_multi'][module] = moduleList;
            }
            moduleList.forEach((moduleObj) => {
                if (moduleObj.routingList) {
                    if (moduleMap['RoutingConfigMap'][module] === undefined) {
                        moduleMap['RoutingConfigMap'][module] = [];
                    }
                    moduleMap['RoutingConfigMap'][module].push(moduleObj);
                }
            });
        }
        for (let module in moduleMap['Component']) {
            const moduleList = moduleMap['Component'][module];
            if (moduleList.length > 1) {
                moduleMap['Component_multi'][module] = moduleList;
            }
        }
        for (let module in moduleMap['Injectable']) {
            const moduleList = moduleMap['Injectable'][module];
            if (moduleList.length > 1) {
                moduleMap['Injectable_multi'][module] = moduleList;
            }
        }
    }
    scanProjectAllRecu(filePath, subPath, moduleMap, htmlMap) {
        const that = this;
        let files = [];
        if (fs_1.existsSync(filePath)) {
            files = fs_1.readdirSync(filePath);
            files.forEach(function (file, index) {
                const curPath = filePath + '/' + file;
                if (fs_1.statSync(curPath).isDirectory()) {
                    that.scanProjectAllRecu(curPath, subPath + '/' + file, moduleMap, htmlMap);
                }
                else if (file.endsWith('.ts')) {
                    console.log('----' + file);
                    const data = fs_1.readFileSync(curPath, { encoding: 'utf-8' });
                    const ast = that.parser.parse(_ts, data, {
                        experimentalAsyncFunctions: true,
                        experimentalDecorators: true,
                        jsx: true
                    });
                    that.scanScript.writeModuleMap(ast, subPath, file, moduleMap);
                }
                else if (file.indexOf('.html') !== -1) {
                    console.log('----' + file);
                    const data = fs_1.readFileSync(curPath, { encoding: 'utf-8' });
                    const $ = that.cheerio.load(data, {
                        decodeEntities: false,
                        _useHtmlParser2: true,
                        lowerCaseAttributeNames: false
                    });
                    that.scanHtml.writeHtmlMap($, subPath, file, htmlMap);
                }
            });
        }
    }
}
exports.ScanMain = ScanMain;
//# sourceMappingURL=scan-main.js.map