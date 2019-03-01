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
            this.convertCompList(moduleMap);
            this.convertRoutingList(moduleMap);
            writeFileSync(projectConchPath + '/s_moduleMap.json', JSON.stringify(moduleMap));

            const d3_data = {
                nodes: [],
                edges: []
            };
            this.parseModuleAndComp(moduleMap, d3_data);
            writeFileSync(projectConchPath + '/s_d3_data.json', JSON.stringify(d3_data));

        }, 1000);
    }

    // 将html依赖拼装进moduleMap
    private convertData(moduleMap) {
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

    // 将组件依赖转换为完整路径key
    private convertCompList(moduleMap) {
        const compFullList = moduleMap[Const.CLASS_LIST][Const.COMPONENT];

        compFullList.forEach((compObj: any) => {
            if (compObj.compList) {

                const curCompMap = {};
                compObj.compList.forEach((subCompObj: any) => {
                    curCompMap[subCompObj] = 1;
                });

                const curClassName = compObj.className;
                const curCompList = this.getFullKeyList(curClassName, curCompMap, moduleMap);

                compObj.compListFull = curCompList;
            }
        });
    }

    private convertRoutingList(moduleMap) {
        const compFullList = moduleMap[Const.CLASS_LIST][Const.NG_MODULE];

        compFullList.forEach((compObj: any) => {
            if (compObj.routingList) {

                const curCompMap = {};
                compObj.routingList.forEach((subCompObj: any) => {
                    if (subCompObj.component) {
                        curCompMap[subCompObj.component] = 1;
                    }

                    // todo 遍历一级子列表，需要改为递归
                    if (subCompObj.children) {
                        subCompObj.children.forEach((child: any) => {
                            if (child.component) {
                                curCompMap[child.component] = 1;
                            }
                        });
                    }
                });

                if (curCompMap['AppPushManageComponent']) {
                    debugger
                }

                if (curCompMap['AppPushComponent']) {
                    debugger
                }

                const curClassName = compObj.className;
                const curCompList = this.getFullKeyList(curClassName, curCompMap, moduleMap);

                // todo 两个问题，有重复的，有缺失的
                compObj.routingListFull = curCompList;
            }
        });
    }

    private getFullKeyList(curClassName, curCompMap, moduleMap) {

        const moduleFullList = moduleMap[Const.CLASS_LIST][Const.NG_MODULE];
        const moduleTypeMap = moduleMap[Const.TYPE_MAP][Const.NG_MODULE];
        const compTypeMap = moduleMap[Const.TYPE_MAP][Const.COMPONENT];

        const curCompList = [];

        const parentModuleList = [];
        this.getParentModuleList(moduleFullList, curClassName, parentModuleList);

        parentModuleList.forEach((parentModuleObj: any) => {
            parentModuleObj.importList.forEach((importForModule: any) => {

                // 在直属module中寻找引用
                if (compTypeMap[importForModule.className]) {
                    if (curCompMap[importForModule.className]) {
                        const key2 = importForModule.fullPath + '#' + importForModule.className;
                        const curComp = moduleMap[Const.FULL_MAP][Const.COMPONENT][key2];
                        curCompList.push(key2);
                    }
                }

                // 在直属module引用打的module中寻找引用
                if (moduleTypeMap[importForModule.className]) {

                    const key = importForModule.fullPath + '#' + importForModule.className;
                    const curModule = moduleMap[Const.FULL_MAP][Const.NG_MODULE][key];

                    if (curModule) {
                        curModule.importList.forEach((importObj: any) => {
                            if (curCompMap[importObj.className]) {

                                const key2 = importObj.fullPath + '#' + importObj.className;
                                const curComp = moduleMap[Const.FULL_MAP][Const.COMPONENT][key2];
                                curCompList.push(key2);
                            }
                        });
                    }
                }
            });
        });
        return curCompList;
    }

    private getParentModuleList(moduleFullList, className: any, parentModuleList) {
        // 找到所在的module
        moduleFullList.forEach((moduleObj: any) => {
            if (moduleObj.importList) {
                moduleObj.importList.forEach((importObj: any) => {
                    // 找到本module
                    if (importObj.className === className) {
                        parentModuleList.push(moduleObj);
                    }
                });
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

                    if (importObj.className === 'DateFormatPipeModule'
                        || importObj.className === 'MoreSearchModule') {
                        return;
                    }

                    let type;
                    if (moduleMap[Const.TYPE_MAP][Const.NG_MODULE][importObj.className]) {
                        type = Const.D3_NG_MODULE;
                    } else if (moduleMap[Const.TYPE_MAP][Const.COMPONENT][importObj.className]) {
                        type = Const.D3_COMPONENT;
                    }

                    if (type) {
                        if (!tmpObj.nodeMap[moduleObj.className]) {
                            tmpObj.nodeMap[moduleObj.className] = 1;

                            d3_data.nodes.push({
                                "id": moduleObj.className,
                                "type": Const.D3_NG_MODULE,
                                "name": moduleObj.className,
                                "degree": 23
                            });
                        }

                        if (!tmpObj.nodeMap[importObj.className]) {
                            tmpObj.nodeMap[importObj.className] = 1;

                            let degree = (type === Const.D3_NG_MODULE ? 23 : 57);

                            d3_data.nodes.push({
                                "id": importObj.className,
                                "type": type,
                                "name": importObj.className,
                                "degree": degree
                            });
                        }

                        if (!tmpObj.edgeMap[moduleObj.className + importObj.className]) {
                            tmpObj.edgeMap[moduleObj.className + importObj.className] = 1;
                            d3_data.edges.push({
                                "id": "edge_" + countId++,
                                "source": moduleObj.className,
                                "target": importObj.className
                            });
                        }
                    }
                });
            }
        });
    }

}
