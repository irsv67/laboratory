"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ts = require("typescript");
const fs_1 = require("fs");
const parser_1 = require("./parser");
let parser = new parser_1.Parser();
let fReadName = 'C:\\Users\\tommy\\Desktop\\app.component.ts';
let data = fs_1.readFileSync(fReadName, { encoding: 'utf-8' });
let sourceFile = parser.parse(_ts, data, {
    experimentalAsyncFunctions: true,
    experimentalDecorators: true,
    jsx: true
});
console.log(sourceFile);
//# sourceMappingURL=main.js.map