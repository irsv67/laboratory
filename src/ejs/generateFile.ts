import {render} from 'ejs';
import {renderFile} from 'ejs';

import {stat} from 'fs';
import {writeFile} from 'fs';
import {createWriteStream} from 'fs';
import {watch} from 'fs';

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
} else {
    subPathName = "";
}
renderFile(baseDir + 'foo/' + subPathName + 'foo' + fileNameTail + '.ejs', {
    foo: foo,
    Foo: Foo
}, function (err: Error, str: string) {
    let filePath = baseDir + foo + '/' + subPathName + foo + fileNameTail;
    writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath)
});

subPathTail = '';
fileNameTail = '.component.ts';
if (subPathTail) {
    subPathName = foo + subPathTail + "/";
} else {
    subPathName = "";
}
renderFile(baseDir + 'foo/' + subPathName + 'foo' + fileNameTail + '.ejs', {
    foo: foo,
    Foo: Foo
}, function (err: Error, str: string) {
    let filePath = baseDir + foo + '/' + subPathName + foo + fileNameTail;
    writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath)
});

//生成html文件
renderFile(baseDir + 'foo/foo.component.html.ejs', {
    foo: foo,
    Foo: Foo
}, function (err: Error, str: string) {
    let filePath = baseDir + foo + '/' + foo + '.component.html';
    writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath)
});

//生成routing文件
renderFile(baseDir + 'foo/foo-routing.module.ts.ejs', {
    foo: foo,
    Foo: Foo
}, function (err: Error, str: string) {
    let filePath = baseDir + foo + '/' + foo + '-routing.module.ts';
    writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath)
});

//生成home/component文件
subPathTail = '-home';
fileNameTail = '-home.component.ts';
if (subPathTail) {
    subPathName = foo + subPathTail + "/";
} else {
    subPathName = "";
}
let test =
renderFile(baseDir + 'foo/' + subPathName + 'foo' + fileNameTail + '.ejs', {
    foo: foo,
    Foo: Foo
}, function (err: Error, str: string) {
    let filePath = baseDir + foo + '/' + subPathName + foo + fileNameTail;
    writeFile(filePath, str, function (err) {
    });
    console.log('file generated: ' + filePath)
});