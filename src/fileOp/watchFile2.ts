import {createReadStream, createWriteStream, stat, watch} from 'fs';

let fileName = 'J:\\test\\demo-pro-3\\src';

watch(fileName, function (a, b) {
    console.log("====" + a + "====");
    console.log("====" + b + "====");
});
console.log("watching file...");