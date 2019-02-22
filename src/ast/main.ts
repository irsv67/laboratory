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

let fReadName = 'C:\\Users\\tommy\\Desktop\\app.component.ts';

let data = readFileSync(fReadName, {encoding: 'utf-8'});

let sourceFile = parser.parse(_ts, data, {
    experimentalAsyncFunctions: true,
    experimentalDecorators: true,
    jsx: true
});

console.log(sourceFile);

