import * as _ts from 'typescript';
import {
    createReadStream,
    createWriteStream,
    existsSync,
    mkdirSync,
    readdirSync,
    readFileSync,
    renameSync,
    statSync,
    unlinkSync,
    writeFileSync
} from "fs";

import {Parser} from './parser';

let parser = new Parser();

let fReadName = 'C:\\Users\\tommy\\Desktop\\stage.component.ts';

let data = readFileSync(fReadName, {encoding: 'utf-8'});

let sourceFile = parser.parse(_ts, data, {
    experimentalAsyncFunctions: true,
    experimentalDecorators: true,
    jsx: true
});

// console.log(sourceFile.statements);

let curName = '';

sourceFile.statements.forEach((entry: any) => {
    // console.log(entry.kind);

    // VariableStatement
    if (entry.kind === 213) {
        console.log('VariableStatement(213):' + entry.kind);
        if (entry.declarationList && entry.declarationList.declarations) {
            entry.declarationList.declarations.forEach((declaration: any) => {
                if (declaration.type && declaration.type.typeName
                    && declaration.type.typeName.escapedText === 'Routes') {
                    console.log('TypeReference(161):' + 'Routes');
                    console.log('name(231):' + declaration.name.escapedText);

                    const elements = declaration.initializer.elements;
                    elements.forEach((element: any) => {

                        // let path;
                        // let loadChildren;
                        // let component;

                        // ObjectLiteralExpression
                        if (element.kind === 183) {

                            const elementObj: any = {};

                            element.properties.forEach((prop: any) => {
                                if (prop.name.escapedText === 'children') {
                                    debugger
                                } else {
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
            const elements: any = entry.importClause.namedBindings.elements;
            elements.forEach((element: any) => {
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
            entry.decorators.forEach((decorator: any) => {
                console.log('\t{');
                console.log('decorator:' + decorator.kind);
                // CallExpression
                if (decorator.expression.kind === 186) {
                    const decoItem = decorator.expression;
                    console.log('CallExpression(186):' + decoItem.expression.escapedText);
                    if (decoItem.arguments && decoItem.arguments.length > 0
                        && decoItem.arguments[0].properties && decoItem.arguments[0].properties.length > 0) {
                        decoItem.arguments[0].properties.forEach((argument: any) => {
                            console.log(argument.name.escapedText + ':' + (argument.initializer.text || argument.initializer.elements));
                            if (argument.name.escapedText === 'imports') {
                                argument.initializer.elements.forEach((item: any) => {
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
