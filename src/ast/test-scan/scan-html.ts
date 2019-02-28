import {createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {createInterface} from 'readline';

export class ScanHtml {

    constructor() {
    }

    public writeHtmlMap($, subPath, file: string, htmlMap) {

        const that = this;

        const root_dom = $.root();

        const compSet: Set<String> = new Set();

        const rootDom = root_dom[0];
        that.getHtmlCompRecu(rootDom, compSet);

        const fileNew = file.split('.')[0];
        let nameAll = that.getBigNameBySmall(fileNew);

        nameAll += 'Component';

        const singleFile = {
            className: nameAll,
            fullPath: subPath + file.substring(0, file.length - 5),
            compList: compSet.size > 0 ? Array.from(compSet) : undefined,
        };

        if (htmlMap[nameAll] === undefined) {
            htmlMap[nameAll] = [];
        }
        htmlMap[nameAll].push(singleFile);

    }

    private getHtmlCompRecu(rootDom, compSet) {
        for (let i = 0; i < rootDom.children.length; i++) {
            const obj = rootDom.children[i];
            if (obj.type === 'tag' && obj.name.startsWith('app-')) {
                // console.log(obj.name);

                const nameLit = obj.name.substring(4);
                const nameBig = this.getBigNameBySmall(nameLit) + 'Component';
                compSet.add(nameBig);

            } else if (obj.type === 'tag') {
                this.getHtmlCompRecu(obj, compSet);
            }
        }
    }

    private getBigNameBySmall(fileNew) {
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
