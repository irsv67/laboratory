"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const control_business_1 = require("./control-business");
const projectObj = {
    root_path: 'F:/analytics-front-end_5.1',
    project_name: 'analytics-front-end_5.1'
    // root_path: 'F:/appbuilder-um-ui',
    // project_name: 'appbuilder-um-ui'
};
// analytics-front-end_5.1
// appbuilder-um-ui
// cosmos-builder
// appbuilder-oneui
const business = new control_business_1.ControlBusiness();
const ret = business.scanRouting(projectObj);
fs_1.writeFileSync(projectObj.root_path + '/_con_pro' + '/s_tree.json', JSON.stringify(ret));
console.log('----end----');
//# sourceMappingURL=test.js.map