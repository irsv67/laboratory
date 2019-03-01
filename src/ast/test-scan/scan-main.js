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
            const d3_data = {
                nodes: [],
                edges: []
            };
            this.parseModuleAndComp(moduleMap, d3_data);
            fs_1.writeFileSync(projectConchPath + '/s_moduleMap.json', JSON.stringify(moduleMap));
            fs_1.writeFileSync(projectConchPath + '/s_d3_data.json', JSON.stringify(d3_data));
        }, 1000);
    }
    parseCompAndComp(moduleMap, compAndComp) {
        let countId = 0;
        const tmpObj = {
            nodeMap: {},
            edgeMap: {}
        };
        for (let module in moduleMap[const_1.Const.COMPONENT]) {
            const moduleList = moduleMap[const_1.Const.COMPONENT][module];
            moduleList.forEach((moduleObj) => {
                if (moduleObj.compList) {
                    moduleObj.compList.forEach((compObj) => {
                        let type;
                        if (moduleMap[const_1.Const.COMPONENT][compObj]) {
                            type = const_1.Const.D3_COMPONENT;
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
                    let type;
                    if (moduleMap[const_1.Const.TYPE_MAP][const_1.Const.NG_MODULE][importObj.class]) {
                        type = const_1.Const.D3_NG_MODULE;
                    }
                    else if (moduleMap[const_1.Const.TYPE_MAP][const_1.Const.COMPONENT][importObj.class]) {
                        type = const_1.Const.D3_COMPONENT;
                    }
                    if (type) {
                        if (!tmpObj.nodeMap[moduleObj.className]) {
                            tmpObj.nodeMap[moduleObj.className] = 1;
                            d3_data.nodes.push({
                                "id": moduleObj.className,
                                "type": const_1.Const.D3_NG_MODULE,
                                "name": moduleObj.className,
                                "degree": 57
                            });
                        }
                        if (!tmpObj.nodeMap[importObj.class]) {
                            tmpObj.nodeMap[importObj.class] = 1;
                            let degree = (type === const_1.Const.D3_NG_MODULE ? 57 : 23);
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
    convertData(moduleMap) {
        // 将html依赖拼装进moduleMap
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
}
exports.ScanMain = ScanMain;
//# sourceMappingURL=scan-main.js.map