import {createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {createInterface} from 'readline';
import * as _ts from 'typescript';
import {Parser} from '../parser';
import {ScanScript} from './scan-script';
import {ScanHtml} from './scan-html';
import {Const} from './const';

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
            [Const.CLASS_LIST]: {
                [Const.NG_MODULE]: [],
                [Const.COMPONENT]: [],
                [Const.INJECTABLE]: []
            },
            [Const.FULL_MAP]: {
                [Const.NG_MODULE]: {},
                [Const.COMPONENT]: {},
                [Const.INJECTABLE]: {},
                [Const.TEMPLATE]: {}
            },
            [Const.TYPE_MAP]: {
                [Const.NG_MODULE]: {},
                [Const.COMPONENT]: {},
                [Const.INJECTABLE]: {}
            }
        };

        this.scanProjectAllRecu(root_path, '.', moduleMap);

        setTimeout(() => {
            this.convertData(moduleMap);

            const d3_data = {
                nodes: [],
                edges: []
            };

            this.parseModuleAndComp(moduleMap, d3_data);

            writeFileSync(projectConchPath + '/s_moduleMap.json', JSON.stringify(moduleMap));

            writeFileSync(projectConchPath + '/s_d3_data.json', JSON.stringify(d3_data));

        }, 1000);
    }

    private parseCompAndComp(moduleMap, compAndComp) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };

        for (let module in moduleMap[Const.COMPONENT]) {
            const moduleList = moduleMap[Const.COMPONENT][module];
            moduleList.forEach((moduleObj: any) => {
                if (moduleObj.compList) {
                    moduleObj.compList.forEach((compObj: any) => {

                        let type;
                        if (moduleMap[Const.COMPONENT][compObj]) {
                            type = Const.D3_COMPONENT;
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

    private parseModuleAndComp(moduleMap, d3_data) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };

        const moduleList = moduleMap[Const.CLASS_LIST][Const.NG_MODULE];
        moduleList.forEach((moduleObj: any) => {
            if (moduleObj.importList) {
                moduleObj.importList.forEach((importObj: any) => {

                    let type;
                    if (moduleMap[Const.TYPE_MAP][Const.NG_MODULE][importObj.class]) {
                        type = Const.D3_NG_MODULE;
                    } else if (moduleMap[Const.TYPE_MAP][Const.COMPONENT][importObj.class]) {
                        type = Const.D3_COMPONENT;
                    }

                    if (type) {
                        if (!tmpObj.nodeMap[moduleObj.className]) {
                            tmpObj.nodeMap[moduleObj.className] = 1;

                            d3_data.nodes.push({
                                "id": moduleObj.className,
                                "type": Const.D3_NG_MODULE,
                                "name": moduleObj.className,
                                "degree": 57
                            });
                        }

                        if (!tmpObj.nodeMap[importObj.class]) {
                            tmpObj.nodeMap[importObj.class] = 1;

                            let degree = (type === Const.D3_NG_MODULE ? 57 : 23);

                            d3_data.nodes.push({
                                "id": importObj.class,
                                "type": type,
                                "name": importObj.class,
                                "degree": degree
                            });
                        }

                        if (!tmpObj.edgeMap[moduleObj.className + importObj.class]) {
                            tmpObj.edgeMap[moduleObj.className + importObj.class] = 1;
                            d3_data.edges.push({
                                "id": "edge_" + countId++,
                                "source": moduleObj.className,
                                "target": importObj.class
                            });
                        }
                    }
                });
            }
        });
    }

    private convertData(moduleMap) {

        // 将html依赖拼装进moduleMap
        const compFullList = moduleMap[Const.CLASS_LIST][Const.COMPONENT];
        compFullList.forEach((moduleObj: any) => {
            const key = moduleObj.subPath + moduleObj.templateKey.substring(1);
            const templateMap = moduleMap[Const.FULL_MAP][Const.TEMPLATE];
            if (templateMap[key]) {
                // 找到对应的html对象
                const htmlObj = templateMap[key];
                moduleObj.compList = htmlObj.compList
            }
        });
    }

    scanProjectAllRecu(filePath, subPath, moduleMap) {
        const that = this;

        let files = [];
        if (existsSync(filePath)) {
            files = readdirSync(filePath);
            files.forEach(function (file: string, index) {
                const curPath = filePath + '/' + file;
                if (statSync(curPath).isDirectory()) {
                    that.scanProjectAllRecu(curPath, subPath + '/' + file, moduleMap);
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
                    that.scanHtml.writeHtmlMap($, subPath, file, moduleMap);
                }
            });
        }
    }

}
