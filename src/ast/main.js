"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ts = require("typescript");
const fs_1 = require("fs");
const parser_1 = require("./parser");
let parser = new parser_1.Parser();
let fReadName = 'C:\\Users\\tommy\\Desktop\\conch_code\\app.routing.ts';
let data = fs_1.readFileSync(fReadName, { encoding: 'utf-8' });
let sourceFile = parser.parse(_ts, data, {
    experimentalAsyncFunctions: true,
    experimentalDecorators: true,
    jsx: true
});
// console.log(sourceFile.statements);
let curName = '';
sourceFile.statements.forEach((entry) => {
    // console.log(entry.kind);
    // VariableStatement
    if (entry.kind === 213) {
        console.log('VariableStatement(213):' + entry.kind);
        if (entry.declarationList && entry.declarationList.declarations) {
            entry.declarationList.declarations.forEach((declaration) => {
                if (declaration.type && declaration.type.typeName
                    && declaration.type.typeName.escapedText === 'Routes') {
                    console.log('TypeReference(161):' + 'Routes');
                    console.log('name(231):' + declaration.name.escapedText);
                    const elements = declaration.initializer.elements;
                    elements.forEach((element) => {
                        // let path;
                        // let loadChildren;
                        // let component;
                        // ObjectLiteralExpression
                        if (element.kind === 183) {
                            const elementObj = {};
                            element.properties.forEach((prop) => {
                                if (prop.name.escapedText === 'children') {
                                    debugger;
                                }
                                else {
                                    elementObj[prop.name.escapedText] = prop.initializer.text;
                                    console.log(prop.name.escapedText + ':' + prop.initializer.text);
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    // ImportDeclaration
    if (entry.kind === 243 && entry.moduleSpecifier.text.startsWith('.')) {
        console.log('ImportDeclaration(243):' + entry.moduleSpecifier.text);
        if (entry.importClause && entry.importClause.namedBindings && entry.importClause.namedBindings.elements) {
            const elements = entry.importClause.namedBindings.elements;
            elements.forEach((element) => {
                if (element.name) {
                    console.log('name:' + element.name.escapedText);
                }
            });
        }
    }
    // ClassDeclaration
    if (entry.kind === 234) {
        console.log('ClassDeclaration(234):' + entry.name.escapedText);
        curName = entry.name.escapedText;
        if (entry.decorators && entry.decorators.length > 0) {
            console.log('[');
            entry.decorators.forEach((decorator) => {
                console.log('\t{');
                console.log('decorator:' + decorator.kind);
                // CallExpression
                if (decorator.expression.kind === 186) {
                    const decoItem = decorator.expression;
                    console.log('CallExpression(186):' + decoItem.expression.escapedText);
                    if (decoItem.arguments && decoItem.arguments.length > 0
                        && decoItem.arguments[0].properties && decoItem.arguments[0].properties.length > 0) {
                        decoItem.arguments[0].properties.forEach((argumnet) => {
                            console.log(argumnet.name.escapedText + ':' + (argumnet.initializer.text || argumnet.initializer.elements));
                            if (argumnet.name.escapedText === 'imports') {
                                argumnet.initializer.elements.forEach((item) => {
                                    // CallExpression
                                    if (item.kind === 186) {
                                        const expression = item.expression;
                                        if (expression.name.escapedText === 'forRoot' && expression.expression.escapedText === 'RouterModule') {
                                            curName = 'root-routing';
                                        }
                                    }
                                });
                            }
                        });
                    }
                }
                console.log('\t}');
            });
            console.log(']');
        }
    }
});
console.log(curName);
//# sourceMappingURL=main.js.map