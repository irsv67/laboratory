import {createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {createInterface} from 'readline';
import * as _ts from 'typescript';
import {Const} from '../test-scan/const';

export class ControlBusiness {

    cheerio: any;

    parser: any;

    constructor() {
        this.cheerio = require('cheerio');
    }

    scanSubComp(projectObj: any) {

        const projectConchPath = projectObj.root_path + '/_con_pro';
        if (!existsSync(projectConchPath)) {
            mkdirSync(projectConchPath);
        }

        const json_data = readFileSync(projectConchPath + '/s_htmlMap.json', {encoding: 'utf-8'});
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

    scanRouting(projectObj: any) {
        const projectConchPath = projectObj.root_path + '/_con_pro';
        if (!existsSync(projectConchPath)) {
            mkdirSync(projectConchPath);
        }

        const json_data = readFileSync(projectConchPath + '/s_moduleMap.json', {encoding: 'utf-8'});
        const moduleMap = JSON.parse(json_data);

        const parentMap = {};

        for (let module in moduleMap[Const.NG_MODULE]) {
            const moduleList = moduleMap[Const.NG_MODULE][module];
            moduleList.forEach((moduleObj: any) => {
                if (moduleObj.rootRouting) {

                    moduleObj.routingList.forEach((parentItem: any) => {
                        if (parentItem.loadChildren) {
                            const key = parentItem.loadChildren.split('#')[1];
                            parentMap[key] = parentItem.path;
                        }
                    });
                }
            });
        }

        const curNodeFolder = {
            'title': projectObj.project_name,
            'key': projectObj.project_name,
            'expanded': true,
            'icon': 'anticon anticon-credit-card',
            'children': []
        };

        const routingList = [];

        for (const module in moduleMap[Const.NG_MODULE]) {

            const moduleList = moduleMap[Const.NG_MODULE][module];
            moduleList.forEach((moduleObj: any) => {
                if (!moduleObj.rootRouting) {

                    const keyChange = key.split('Routing')[0] + key.split('Routing')[1];

                    const parentPath = parentMap[keyChange];

                    const curNode = {
                        title: parentPath,
                        key: parentPath,
                        'expanded': true,
                        isLeaf: true,
                        'icon': 'anticon anticon-file',
                        'children': []
                    };

                    if (routingMap[key] && routingMap[key].length > 0) {
                        curNode.isLeaf = false;
                        curNode.icon = 'anticon anticon-folder';
                        this.weaveRouterListRecu(parentPath, routingMap[key], curNode);
                    }

                    curNodeFolder.children.push(curNode);
                }
            });
        }

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
