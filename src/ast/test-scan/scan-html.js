"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
class ScanHtml {
    constructor() {
    }
    writeHtmlMap($, subPath, file, moduleMap) {
        const that = this;
        const root_dom = $.root();
        const compSet = new Set();
        const rootDom = root_dom[0];
        that.getHtmlCompRecu(rootDom, compSet);
        const singleFile = {
            compList: compSet.size > 0 ? Array.from(compSet) : undefined,
        };
        if (singleFile.compList) {
            const fullKey = subPath + '/' + file;
            moduleMap[const_1.Const.FULL_MAP][const_1.Const.TEMPLATE][fullKey] = singleFile;
        }
    }
    getHtmlCompRecu(rootDom, compSet) {
        for (let i = 0; i < rootDom.children.length; i++) {
            const obj = rootDom.children[i];
            if (obj.type === 'tag' && obj.name.startsWith('app-')) {
                // console.log(obj.name);
                const nameLit = obj.name.substring(4);
                const nameBig = this.getBigNameBySmall(nameLit) + 'Component';
                compSet.add(nameBig);
            }
            else if (obj.type === 'tag') {
                this.getHtmlCompRecu(obj, compSet);
            }
        }
    }
    getBigNameBySmall(fileNew) {
        const nameArray = fileNew.split('-');
        let nameAll = '';
        for (let i = 0; i < nameArray.length; i++) {
            const nameItem = nameArray[i];
            const nameNew = nameItem.charAt(0).toUpperCase() + nameItem.substring(1);
            nameAll += nameNew;
        }
        return nameAll;
    }
}
exports.ScanHtml = ScanHtml;
//# sourceMappingURL=scan-html.js.map