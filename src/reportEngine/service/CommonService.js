"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonService {
    constructor() {
    }
    convertResponse(results) {
        const list = results.map(item => {
            const tmpObj = {};
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const value = item[key];
                    const keyNew = key.replace(/\_(\w)/g, function (all, letter) {
                        return letter.toUpperCase();
                    });
                    tmpObj[keyNew] = value;
                }
            }
            return tmpObj;
        });
        return list;
    }
}
exports.CommonService = CommonService;
//# sourceMappingURL=CommonService.js.map