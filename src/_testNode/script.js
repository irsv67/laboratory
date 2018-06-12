// var fs = require('fs');
// var data = fs.readFileSync('./file.txt', 'utf-8');
// console.log(data);

// var fs = require("fs");
// fs.readFile('./file.txt', function (err, data) {
//     if (err) {
//         console.log("bad")
//     } else {
//         console.log("ok");
//         console.log(data);
//         console.log(data.toString());
//     }
// })

// var fs = require("fs");
// fs.readFile('./file.txt', function (err, data) {
//     if (err) {
//         console.log("bad" + err)
//     } else {
//         console.log("读取第一个文件成功");
//         console.log(data.toString());
//         fs.readFile('./file2.txt', 'utf-8', function (err, data) {
//             if (err) {
//                 console.log("读取第二个文件失败");
//             }
//             if (data) {
//                 console.log("读取第2个文件成功");
//                 console.log(data);
//             }
//         })
//     }
// })

// var fs = require("fs");
// var data = "宋茂林是好人";
// fs.writeFile('./wfile.txt', data, {flag: 'w', encoding: 'utf-8', mode: '0666'}, function (err) {
//     if (err) {
//         console.log("文件写入失败")
//     } else {
//         console.log("文件写入成功");
//     }
// })

// var fs = require("fs");
// var data = "宋茂林是好人-追加";
// fs.writeFile('./wfile.txt', data, {flag: 'a', encoding: 'utf-8', mode: '0666'}, function (err) {
//     if (err) {
//         console.log("文件写入失败")
//     } else {
//         console.log("文件追加成功");
//     }
// })

// var fs = require("fs");
// fs.readFile('./1.png', 'base64', function (err, data) {
//     if (err) {
//         console.log("取图片1失败");
//     } else {
//         fs.writeFile('./2.png', data, 'base64', function (err) {
//             console.log("图片2写入成功");
//         })
//     }
// })

// var fs = require("fs");
// var data = "宋茂林是好人-追加appendFile";
// fs.appendFile('./wfile.txt', data, function (err) {
//     if (err) {
//         console.log("文件写入失败")
//     } else {
//         console.log("文件追加成功");
//     }
// })

// var fs = require("fs");
// fs.open('./wfile.txt', 'r', '0666', function (err, fd) {
//     if (err) {
//         console.log("打开失败");
//     } else {
//         console.log(fd);
//     }
// })

var fs = require("fs");
fs.open('./wfile.txt', 'r', '0666', function (err, fd) {
    if (err) {
        console.log("打开失败");
    } else {
        var buf = new Buffer(128);
        console.log(buf)
        fs.read(fd, buf, 1, 30, 0, function (err, bytesRead, buf) {
            if (err) {
                console.log("指定位置读取文件失败");
            } else {
                console.log(bytesRead);
                console.log(buf);
            }
        })
    }
})