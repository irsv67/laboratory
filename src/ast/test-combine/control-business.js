"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const const_1 = require("../test-scan/const");
class ControlBusiness {
    constructor() {
        this.cheerio = require('cheerio');
    }
    scanSubComp(projectObj) {
        const projectConchPath = projectObj.root_path + '/_con_pro';
        if (!fs_1.existsSync(projectConchPath)) {
            fs_1.mkdirSync(projectConchPath);
        }
        const json_data = fs_1.readFileSync(projectConchPath + '/s_htmlMap.json', { encoding: 'utf-8' });
        const htmlMap = JSON.parse(json_data);
        const component_name = projectObj.component_name;
        const treeData = {
            'title': component_name,
            'key': component_name,
            'expanded': true,
            'icon': 'anticon anticon-folder',
            'children': []
        };
        this.weaveHtmlStructRecu(component_name, treeData, htmlMap);
        return treeData;
    }
    scanRouting(projectObj) {
        const projectConchPath = projectObj.root_path + '/_con_pro';
        if (!fs_1.existsSync(projectConchPath)) {
            fs_1.mkdirSync(projectConchPath);
        }
        const json_data = fs_1.readFileSync(projectConchPath + '/s_moduleMap.json', { encoding: 'utf-8' });
        const moduleMap = JSON.parse(json_data);
        const moduleTypeMap = moduleMap[const_1.Const.TYPE_MAP][const_1.Const.NG_MODULE];
        const curNodeFolder = {
            'title': projectObj.project_name,
            'key': projectObj.project_name,
            'expanded': true,
            'icon': 'anticon anticon-credit-card',
            'children': []
        };
        const moduleList = moduleMap[const_1.Const.CLASS_LIST][const_1.Const.NG_MODULE];
        moduleList.forEach((moduleObj) => {
            if (moduleObj.rootRouting) {
                moduleObj.routingList.forEach((parentItem) => {
                    if (parentItem.loadChildren) {
                        const lazyRootModule = moduleMap[const_1.Const.FULL_MAP][const_1.Const.NG_MODULE][parentItem.loadChildren];
                        console.log(lazyRootModule.className);
                        let routingList = [];
                        if (lazyRootModule.routingList) {
                            routingList = routingList.concat(lazyRootModule.routingList);
                        }
                        lazyRootModule.importList.forEach((importForModule) => {
                            if (moduleTypeMap[importForModule.className]) {
                                const key = importForModule.fullPath + '#' + importForModule.className;
                                const curModule = moduleMap[const_1.Const.FULL_MAP][const_1.Const.NG_MODULE][key];
                                if (curModule.routingList) {
                                    routingList = routingList.concat(curModule.routingList);
                                }
                            }
                        });
                        const curNode = {
                            title: parentItem.path,
                            key: parentItem.path,
                            'expanded': true,
                            isLeaf: true,
                            'icon': 'anticon anticon-file',
                            'children': []
                        };
                        this.weaveRouterListRecu(parentItem.path, routingList, curNode);
                        curNodeFolder.children.push(curNode);
                    }
                });
            }
        });
        return curNodeFolder;
    }
    // =====================================
    weaveHtmlStructRecu(component_name, treeData, htmlMap) {
        if (htmlMap && htmlMap[component_name]) {
            const objList = htmlMap[component_name];
            for (let i = 0; i < objList.length; i++) {
                const key = objList[i];
                const subObj = {
                    'title': key,
                    'key': key,
                    'expanded': true,
                    'isLeaf': true,
                    'icon': 'anticon anticon-file',
                    'children': [],
                };
                if (htmlMap[key] && htmlMap[key].length > 0) {
                    subObj.isLeaf = false;
                    subObj.icon = 'anticon anticon-folder';
                    this.weaveHtmlStructRecu(key, subObj, htmlMap);
                }
                treeData.children.push(subObj);
            }
        }
    }
    weaveRouterListRecu(parentPath, routingList, curNodeFolder) {
        for (let i = 0; i < routingList.length; i++) {
            const routItem = routingList[i];
            if (routItem.component) {
                const curNode = {
                    title: parentPath + '/' + routItem.path,
                    key: routItem.component,
                    'expanded': true,
                    isLeaf: true,
                    'icon': 'anticon anticon-file',
                    'children': [],
                    component: routItem.component
                };
                if (routItem.children && routItem.children.length > 0) {
                    curNode.isLeaf = false;
                    curNode.icon = 'anticon anticon-folder';
                    this.weaveRouterListRecu(parentPath + '/' + routItem.path, routItem.children, curNode);
                }
                curNodeFolder.children.push(curNode);
            }
        }
    }
}
exports.ControlBusiness = ControlBusiness;
//# sourceMappingURL=control-business.js.map