"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = require("ejs");
const fs_1 = require("fs");
let Foo = 'Datasource';
let foo = 'datasource';
let baseDir = '../../template/';
let fooName = 'foo';
let subPathTail;
let fileNameTail;
let subPathName;
//生成module文件
subPathTail = '';
fileNameTail = '.module.ts';
if (subPathTail) {
    subPathName = foo + subPathTail + "/";
}
else {
    subPathName = "";
}
ejs_1.renderFile(baseDir + 'foo/' + subPathName + 'foo' + fileNameTail + '.ejs', {
    foo: foo,
    Foo: Foo
}, function (err, str) {
    let filePath = baseDir + foo + '/' + subPathName + foo + fileNameTail;
    fs_1.writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath);
});
subPathTail = '';
fileNameTail = '.component.ts';
if (subPathTail) {
    subPathName = foo + subPathTail + "/";
}
else {
    subPathName = "";
}
ejs_1.renderFile(baseDir + 'foo/' + subPathName + 'foo' + fileNameTail + '.ejs', {
    foo: foo,
    Foo: Foo
}, function (err, str) {
    let filePath = baseDir + foo + '/' + subPathName + foo + fileNameTail;
    fs_1.writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath);
});
//生成html文件
ejs_1.renderFile(baseDir + 'foo/foo.component.html.ejs', {
    foo: foo,
    Foo: Foo
}, function (err, str) {
    let filePath = baseDir + foo + '/' + foo + '.component.html';
    fs_1.writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath);
});
//生成routing文件
ejs_1.renderFile(baseDir + 'foo/foo-routing.module.ts.ejs', {
    foo: foo,
    Foo: Foo
}, function (err, str) {
    let filePath = baseDir + foo + '/' + foo + '-routing.module.ts';
    fs_1.writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath);
});
//生成home/component文件
subPathTail = '-home';
fileNameTail = '-home.component.ts';
if (subPathTail) {
    subPathName = foo + subPathTail + "/";
}
else {
    subPathName = "";
}
let test = ejs_1.renderFile(baseDir + 'foo/' + subPathName + 'foo' + fileNameTail + '.ejs', {
    foo: foo,
    Foo: Foo
}, function (err, str) {
    let filePath = baseDir + foo + '/' + subPathName + foo + fileNameTail;
    fs_1.writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath);
});
//# sourceMappingURL=generateFile.js.map