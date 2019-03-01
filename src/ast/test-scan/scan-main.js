"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const _ts = require("typescript");
const parser_1 = require("../parser");
const scan_script_1 = require("./scan-script");
const scan_html_1 = require("./scan-html");
const const_1 = require("./const");
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
            [const_1.Const.CLASS_LIST]: {
                [const_1.Const.NG_MODULE]: [],
                [const_1.Const.COMPONENT]: [],
                [const_1.Const.INJECTABLE]: []
            },
            [const_1.Const.FULL_MAP]: {
                [const_1.Const.NG_MODULE]: {},
                [const_1.Const.COMPONENT]: {},
                [const_1.Const.INJECTABLE]: {},
                [const_1.Const.TEMPLATE]: {}
            },
            [const_1.Const.TYPE_MAP]: {
                [const_1.Const.NG_MODULE]: {},
                [const_1.Const.COMPONENT]: {},
                [const_1.Const.INJECTABLE]: {}
            }
        };
        this.scanProjectAllRecu(root_path, '.', moduleMap);
        setTimeout(() => {
            this.convertData(moduleMap);
            this.convertCompList(moduleMap);
            this.convertRoutingList(moduleMap);
            fs_1.writeFileSync(projectConchPath + '/s_moduleMap.json', JSON.stringify(moduleMap));
            const d3_data = {
                nodes: [],
                edges: []
            };
            this.parseModuleAndComp(moduleMap, d3_data);
            fs_1.writeFileSync(projectConchPath + '/s_d3_data.json', JSON.stringify(d3_data));
        }, 1000);
    }
    // 将html依赖拼装进moduleMap
    convertData(moduleMap) {
        const compFullList = moduleMap[const_1.Const.CLASS_LIST][const_1.Const.COMPONENT];
        compFullList.forEach((moduleObj) => {
            const key = moduleObj.subPath + moduleObj.templateKey.substring(1);
            const templateMap = moduleMap[const_1.Const.FULL_MAP][const_1.Const.TEMPLATE];
            if (templateMap[key]) {
                // 找到对应的html对象
                const htmlObj = templateMap[key];
                moduleObj.compList = htmlObj.compList;
            }
        });
    }
    // 将组件依赖转换为完整路径key
    convertCompList(moduleMap) {
        const compFullList = moduleMap[const_1.Const.CLASS_LIST][const_1.Const.COMPONENT];
        compFullList.forEach((compObj) => {
            if (compObj.compList) {
                const curCompMap = {};
                compObj.compList.forEach((subCompObj) => {
                    curCompMap[subCompObj] = 1;
                });
                const curClassName = compObj.className;
                const curCompList = this.getFullKeyList(curClassName, curCompMap, moduleMap);
                compObj.compListFull = curCompList;
            }
        });
    }
    convertRoutingList(moduleMap) {
        const compFullList = moduleMap[const_1.Const.CLASS_LIST][const_1.Const.NG_MODULE];
        compFullList.forEach((compObj) => {
            if (compObj.routingList) {
                const curCompMap = {};
                compObj.routingList.forEach((subCompObj) => {
                    if (subCompObj.component) {
                        curCompMap[subCompObj.component] = 1;
                    }
                    // todo 遍历一级子列表，需要改为递归
                    if (subCompObj.children) {
                        subCompObj.children.forEach((child) => {
                            if (child.component) {
                                curCompMap[child.component] = 1;
                            }
                        });
                    }
                });
                if (curCompMap['AppPushManageComponent']) {
                    debugger;
                }
                if (curCompMap['AppPushComponent']) {
                    debugger;
                }
                const curClassName = compObj.className;
                const curCompList = this.getFullKeyList(curClassName, curCompMap, moduleMap);
                // todo 两个问题，有重复的，有缺失的
                compObj.routingListFull = curCompList;
            }
        });
    }
    getFullKeyList(curClassName, curCompMap, moduleMap) {
        const moduleFullList = moduleMap[const_1.Const.CLASS_LIST][const_1.Const.NG_MODULE];
        const moduleTypeMap = moduleMap[const_1.Const.TYPE_MAP][const_1.Const.NG_MODULE];
        const compTypeMap = moduleMap[const_1.Const.TYPE_MAP][const_1.Const.COMPONENT];
        const curCompList = [];
        const parentModuleList = [];
        this.getParentModuleList(moduleFullList, curClassName, parentModuleList);
        parentModuleList.forEach((parentModuleObj) => {
            parentModuleObj.importList.forEach((importForModule) => {
                // 在直属module中寻找引用
                if (compTypeMap[importForModule.className]) {
                    if (curCompMap[importForModule.className]) {
                        const key2 = importForModule.fullPath + '#' + importForModule.className;
                        const curComp = moduleMap[const_1.Const.FULL_MAP][const_1.Const.COMPONENT][key2];
                        curCompList.push(key2);
                    }
                }
                // 在直属module引用打的module中寻找引用
                if (moduleTypeMap[importForModule.className]) {
                    const key = importForModule.fullPath + '#' + importForModule.className;
                    const curModule = moduleMap[const_1.Const.FULL_MAP][const_1.Const.NG_MODULE][key];
                    if (curModule) {
                        curModule.importList.forEach((importObj) => {
                            if (curCompMap[importObj.className]) {
                                const key2 = importObj.fullPath + '#' + importObj.className;
                                const curComp = moduleMap[const_1.Const.FULL_MAP][const_1.Const.COMPONENT][key2];
                                curCompList.push(key2);
                            }
                        });
                    }
                }
            });
        });
        return curCompList;
    }
    getParentModuleList(moduleFullList, className, parentModuleList) {
        // 找到所在的module
        moduleFullList.forEach((moduleObj) => {
            if (moduleObj.importList) {
                moduleObj.importList.forEach((importObj) => {
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
        if (fs_1.existsSync(filePath)) {
            files = fs_1.readdirSync(filePath);
            files.forEach(function (file, index) {
                const curPath = filePath + '/' + file;
                if (fs_1.statSync(curPath).isDirectory()) {
                    that.scanProjectAllRecu(curPath, subPath + '/' + file, moduleMap);
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
                    that.scanHtml.writeHtmlMap($, subPath, file, moduleMap);
                }
            });
        }
    }
    parseModuleAndComp(moduleMap, d3_data) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };
        const moduleList = moduleMap[const_1.Const.CLASS_LIST][const_1.Const.NG_MODULE];
        moduleList.forEach((moduleObj) => {
            if (moduleObj.importList) {
                moduleObj.importList.forEach((importObj) => {
                    if (importObj.className === 'DateFormatPipeModule'
                        || importObj.className === 'MoreSearchModule') {
                        return;
                    }
                    let type;
                    if (moduleMap[const_1.Const.TYPE_MAP][const_1.Const.NG_MODULE][importObj.className]) {
                        type = const_1.Const.D3_NG_MODULE;
                    }
                    else if (moduleMap[const_1.Const.TYPE_MAP][const_1.Const.COMPONENT][importObj.className]) {
                        type = const_1.Const.D3_COMPONENT;
                    }
                    if (type) {
                        if (!tmpObj.nodeMap[moduleObj.className]) {
                            tmpObj.nodeMap[moduleObj.className] = 1;
                            d3_data.nodes.push({
                                "id": moduleObj.className,
                                "type": const_1.Const.D3_NG_MODULE,
                                "name": moduleObj.className,
                                "degree": 23
                            });
                        }
                        if (!tmpObj.nodeMap[importObj.className]) {
                            tmpObj.nodeMap[importObj.className] = 1;
                            let degree = (type === const_1.Const.D3_NG_MODULE ? 23 : 57);
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
exports.ScanMain = ScanMain;
//# sourceMappingURL=scan-main.js.map