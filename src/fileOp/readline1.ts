var readline = require('readline');
var fs = require('fs');
var os = require('os');

var fReadName = './file.txt';
var fWriteName = './1.readline.log';
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);

var objReadline = readline.createInterface({
    input: fRead,
// 这是另一种复制方式，这样on('line')里就不必再调用fWrite.write(line)，当只是纯粹复制文件时推荐使用
// 但文件末尾会多算一次index计数   sodino.com
//  output: fWrite,
//  terminal: true
});

var index = 1;
objReadline.on('line', (line) => {
    var tmp = 'line' + index.toString() + ':' + line;
    fWrite.write(tmp + os.EOL); // 下一行
    console.log(index, line);
    index++;
});

objReadline.on('close', () => {
    console.log('readline close...');
});