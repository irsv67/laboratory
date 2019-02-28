import {createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {createInterface} from 'readline';
import * as _ts from 'typescript';
import {Parser} from '../parser';
import {ScanScript} from './scan-script';
import {ScanHtml} from './scan-html';

export class ScanMain {

    parser: any;
    cheerio: any;

    scanScript: any;
    scanHtml: any;

    constructor() {

        this.parser = new Parser();
        this.cheerio = require('cheerio');

        this.scanScript = new ScanScript();
        this.scanHtml = new ScanHtml();
    }

    scanProject(projectObj: any) {

        const projectConchPath = projectObj.root_path + '/_con_pro';
        if (!existsSync(projectConchPath)) {
            mkdirSync(projectConchPath);
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

            writeFileSync(projectConchPath + '/s_moduleMap.json', JSON.stringify(moduleMap));

            writeFileSync(projectConchPath + '/s_htmlMap.json', JSON.stringify(htmlMap));

            writeFileSync(projectConchPath + '/s_netMap.json', JSON.stringify(netData));

            writeFileSync(projectConchPath + '/s_compAndComp.json', JSON.stringify(compAndComp));

        }, 1000);
    }

    private parseCompAndComp(moduleMap, compAndComp) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };

        for (let module in moduleMap['Component']) {
            const moduleList = moduleMap['Component'][module];
            moduleList.forEach((moduleObj: any) => {
                if (moduleObj.compList) {
                    moduleObj.compList.forEach((compObj: any) => {

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

    private parseModuleAndComp(moduleMap, netData) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };

        for (let module in moduleMap['NgModule']) {
            const moduleList = moduleMap['NgModule'][module];
            moduleList.forEach((moduleObj: any) => {
                if (moduleObj.importList) {
                    moduleObj.importList.forEach((importObj: any) => {

                        let type;
                        if (moduleMap['NgModule'][importObj.class]) {
                            type = 'NgModule';
                        } else if (moduleMap['Component'][importObj.class]) {
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

    private convertData(moduleMap, htmlMap) {

        // 将html依赖拼装进moduleMap
        for (let module in moduleMap['Component']) {
            const moduleList = moduleMap['Component'][module];
            moduleList.forEach((modlueObj: any) => {
                if (htmlMap[module]) {
                    // 找到对应的html对象
                    const htmlList = htmlMap[module];
                    let htmlObj;
                    if (htmlList.length == 1) {
                        htmlObj = htmlList[0];
                    } else {
                        htmlList.forEach((obj: any) => {
                            if (obj.fullPath === modlueObj.fullPath) {
                                htmlObj = obj;
                            }
                        });
                    }
                    if (htmlObj && htmlObj.compList) {
                        console.log('compList:' + module);
                        modlueObj.compList = htmlObj.compList
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

            moduleList.forEach((moduleObj: any) => {
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
        if (existsSync(filePath)) {
            files = readdirSync(filePath);
            files.forEach(function (file: string, index) {
                const curPath = filePath + '/' + file;
                if (statSync(curPath).isDirectory()) {
                    that.scanProjectAllRecu(curPath, subPath + '/' + file, moduleMap, htmlMap);
                } else if (file.endsWith('.ts')) {
                    console.log('----' + file);

                    const data = readFileSync(curPath, {encoding: 'utf-8'});

                    const ast = that.parser.parse(_ts, data, {
                        experimentalAsyncFunctions: true,
                        experimentalDecorators: true,
                        jsx: true
                    });

                    that.scanScript.writeModuleMap(ast, subPath, file, moduleMap);

                } else if (file.indexOf('.html') !== -1) {
                    console.log('----' + file);

                    const data = readFileSync(curPath, {encoding: 'utf-8'});

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
