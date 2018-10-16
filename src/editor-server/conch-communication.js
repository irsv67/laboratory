"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConchCommunication {
    constructor() {
        this.projectMap = {};
        this.pageMap = {};
        this.compMap = {};
        //        ConchCommunication.instance = new ConchCommunication();
        console.log('--------ConchCommunication-constructor--------');
    }
    static getInstance() {
        if (!ConchCommunication.instance) {
            ConchCommunication.instance = new ConchCommunication();
        }
        return ConchCommunication.instance;
    }
    getHtmlUrlByPageId(pageId) {
        return this.base_path + this.pageMap[pageId].html_url;
    }
    getCompUrlByPageId(pageId) {
        return this.base_path + this.pageMap[pageId].script_url;
    }
    getHtmlTempByCompId(compId) {
        return this.compMap[compId];
    }
    getCompTempByCompId(compId) {
        return this.compMap[compId].script_temp;
    }
}
exports.ConchCommunication = ConchCommunication;
//# sourceMappingURL=conch-communication.js.map