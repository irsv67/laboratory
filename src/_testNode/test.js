"use strict";
class Test {
    constructor() {
    }
    // 格式化时间
    pad2(n) {
        return n < 10 ? '0' + n : n;
    }
    // 格式化时间
    time() {
        const pattern = new Date();
        let value = pattern.getFullYear().toString() + '-' + this.pad2(pattern.getMonth() + 1) + '-' + this.pad2(pattern.getDate());
        return value;
    }
    getDateStr(date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }
    getDatePad() {
        let date1 = new Date();
        const dateStringStart = date1.getFullYear().toString() + this.pad2(date1.getMonth() + 1) + this.pad2(date1.getDate()) + this.pad2(date1.getHours()) + this.pad2(date1.getMinutes()) + this.pad2(date1.getSeconds());
        return dateStringStart;
    }
}
exports.Test = Test;
let test = new Test();
let date = new Date();
let value = test.getDatePad();
console.log(value);
//# sourceMappingURL=test.js.map