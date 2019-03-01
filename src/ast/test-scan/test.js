"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scan_main_1 = require("./scan-main");
const projectObj = {
    root_path: 'F:/analytics-front-end_5.1',
    project_name: 'analytics-front-end_5.1'
};
// analytics-front-end_5.1
// appbuilder-um-ui
// cosmos-builder
// appbuilder-oneui
const scanMain = new scan_main_1.ScanMain();
const ret = scanMain.scanProject(projectObj);
// console.log(ret);
//# sourceMappingURL=test.js.map