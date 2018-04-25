var readline = require('readline');
var fs = require('fs');
var os = require('os');
var fReadName = './file.txt';
var fWriteName = './1.readline.log';
var fRead = fs.createReadStream(fReadName);
var fWrite = fs.createWriteStream(fWriteName);
var objReadline = readline.createInterface({
    input: fRead,
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
//# sourceMappingURL=readline1.js.map