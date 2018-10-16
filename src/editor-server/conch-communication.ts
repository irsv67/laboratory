export class ConchCommunication {

    static instance: any;

    projectMap: any = {};
    pageMap: any = {};
    compMap: any = {};

    curProject: any;

    base_path: any;
    base_app: any;

    constructor() {

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

    getCompUrlByPageId(pageId: any) {
        return this.base_path + this.pageMap[pageId].script_url;
    }

    getHtmlTempByCompId(compId) {
        return this.compMap[compId];
    }

    getCompTempByCompId(compId: any) {
        return this.compMap[compId].script_temp;
    }
}