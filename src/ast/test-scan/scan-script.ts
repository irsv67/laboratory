import {createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {createInterface} from 'readline';
import {Const} from './const';

export class ScanScript {

    constructor() {

    }

    public writeModuleMap(ast, subPath, file, moduleMap) {

        const that = this;

        let curName = '';
        let curType = '';
        let rootRouting = false;
        let templateKey = '';

        const singleFile: any = {};
        const importList = [];
        const routingList = [];

        ast.statements.forEach((entry: any) => {
            // console.log(entry.kind);

            that.parseRoutingList(entry, routingList);

            that.parseImportList(entry, subPath, importList);

            const retObj = that.parseClassName(entry);
            curName = retObj.curName;
            curType = retObj.curType;
            rootRouting = retObj.rootRouting;
            templateKey = retObj.templateKey;
        });

        // 遍历结束
        singleFile['className'] = curName;
        singleFile['classType'] = curType;
        singleFile['subPath'] = subPath;
        singleFile['fileName'] = file.substring(0, file.length - 3);
        singleFile['importList'] = importList;

        if (curType === Const.COMPONENT) {
            singleFile['templateKey'] = templateKey;
        }

        if (routingList.length > 0) {
            singleFile['rootRouting'] = rootRouting;
            singleFile['routingList'] = routingList;
        }

        if (curType === Const.NG_MODULE || curType === Const.COMPONENT || curType === Const.INJECTABLE) {

            moduleMap[Const.CLASS_LIST][curType].push(singleFile);
            const fullKey = singleFile.subPath + '/' + singleFile.fileName + '#' + singleFile.className;
            moduleMap[Const.FULL_MAP][curType][fullKey] = singleFile;

            moduleMap[Const.TYPE_MAP][curType][curName] = 1;
        }
    }

    private parseClassName(entry: any) {

        let curName = '';
        let curType = '';
        let rootRouting = false;
        let templateKey = '';

        // ClassDeclaration
        if (entry.kind === 234) {
            // console.log('ClassDeclaration(234):' + entry.name.escapedText);
            curName = entry.name.escapedText;
            if (entry.decorators && entry.decorators.length > 0) {
                // console.log('[');
                entry.decorators.forEach((decorator: any) => {
                    // console.log('\t{');
                    // console.log('decorator:' + decorator.kind);
                    // CallExpression
                    if (decorator.expression.kind === 186) {
                        const decoItem = decorator.expression;
                        // console.log('CallExpression(186):' + decoItem.expression.escapedText);
                        curType = decoItem.expression.escapedText;

                        if (decoItem.arguments && decoItem.arguments.length > 0
                            && decoItem.arguments[0].properties && decoItem.arguments[0].properties.length > 0) {
                            decoItem.arguments[0].properties.forEach((argumnet: any) => {
                                if (argumnet.name.escapedText === 'templateUrl') {
                                    templateKey = argumnet.initializer.text;
                                }
                                // console.log(argumnet.name.escapedText + ':' + (argumnet.initializer.text || argumnet.initializer.elements));
                                // 识别 RouterModule.forRoot();
                                if (argumnet.name.escapedText === 'imports') {
                                    argumnet.initializer.elements.forEach((item: any) => {
                                        // CallExpression
                                        if (item.kind === 186) {
                                            const expression = item.expression;
                                            if (expression.name.escapedText === 'forRoot'
                                                && expression.expression.escapedText === 'RouterModule') {
                                                rootRouting = true;
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                    // console.log('\t}');
                });
                // console.log(']');
            }
        }
        return {curName, curType, rootRouting, templateKey};
    }

    private parseImportList(entry: any, subPath, importList) {
        const that = this;

        // ImportDeclaration
        if (entry.kind === 243 && entry.moduleSpecifier.text.startsWith('.')) {
            // console.log('ImportDeclaration(243):' + entry.moduleSpecifier.text);
            if (entry.importClause && entry.importClause.namedBindings && entry.importClause.namedBindings.elements) {
                const elements: any = entry.importClause.namedBindings.elements;
                elements.forEach((element: any) => {
                    if (element.name) {
                        // console.log('name:' + element.name.escapedText);

                        const path = entry.moduleSpecifier.text;
                        const tmpFullPath = that.convertPath(path, subPath);

                        const importItem = {
                            class: element.name.escapedText,
                            path: entry.moduleSpecifier.text,
                            fullPath: tmpFullPath
                        };
                        importList.push(importItem);
                    }
                });
            }
        }
    }

    private convertPath(path, subPath) {
        const tailArray = path.split('/');
        let index = 0;
        let count = 0;
        tailArray.forEach((item: any, i: any) => {
            if (item === '.') {
                index++;
            } else if (item === '..') {
                index++;
                count++;
            }
        });

        const pathTail = tailArray.slice(index, tailArray.length).join('/');
        const headArray = subPath.split('/');
        const pathHead = headArray.slice(0, headArray.length - count).join('/');
        const tmpFullPath = pathHead + '/' + pathTail;
        return tmpFullPath;
    }

    private parseRoutingList(entry: any, routingList) {
        const that = this;

        // VariableStatement
        if (entry.kind === 213) {
            // console.log('VariableStatement(213):' + entry.kind);
            if (entry.declarationList && entry.declarationList.declarations) {
                entry.declarationList.declarations.forEach((declaration: any) => {
                    if (declaration.type && declaration.type.typeName
                        && declaration.type.typeName.escapedText === 'Routes') {
                        // console.log('TypeReference(161):' + 'Routes');
                        // console.log('name(231):' + declaration.name.escapedText);

                        const elements = declaration.initializer.elements;
                        that.parseRoutingChildRecu(elements, routingList);
                    }
                });
            }

        }
    }

    private parseRoutingChildRecu(elements, tmpRoutingList) {
        const that = this;
        elements.forEach((element: any) => {

            // ObjectLiteralExpression
            if (element.kind === 183) {

                const elementObj: any = {};

                element.properties.forEach((prop: any) => {
                    if (prop.name.escapedText === 'children') {
                        elementObj.children = [];
                        that.parseRoutingChildRecu(prop.initializer.elements, elementObj.children);
                    } else {
                        elementObj[prop.name.escapedText] = prop.initializer.text;
                        // console.log(prop.name.escapedText + ':' + prop.initializer.text);
                    }
                });

                tmpRoutingList.push(elementObj);

            }
        });
    }
}
