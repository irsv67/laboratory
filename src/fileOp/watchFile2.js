"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
let fileName = 'J:\\test\\demo-pro-3\\src';
fs_1.watch(fileName, function (a, b) {
    console.log("====" + a + "====");
    console.log("====" + b + "====");
});
console.log("watching file...");
//# sourceMappingURL=watchFile2.js.map