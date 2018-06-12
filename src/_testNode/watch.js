const fs = require('fs');
var fileName = 'file.txt';
stat = fs.stat;
var copy = function (_src, _dst) {
    // 读取目录中的所有文件/目录
    var readable, writable;
    stat(_src, function (err, st) {
        if (err) {
            throw err;
        }
        // 判断是否为文件
        if (st.isFile()) {
            // 创建读取流
            readable = fs.createReadStream(_src);
            // 创建写入流
            writable = fs.createWriteStream(_dst);
            // 通过管道来传输流
            readable.pipe(writable);
        }

    });
};

fs.watch(fileName, (function () {
    var count = 0;
    return function () {
        count++;
        console.log("文件" + fileName + " 改变--第" + count + "次");
        copy('./file.txt', './file1.txt');
    };
})());
console.log("watching file...");  