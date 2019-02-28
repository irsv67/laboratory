"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const control_business_1 = require("./control-business");
const projectObj = {
    root_path: 'F:/appbuilder-um-ui',
    project_name: 'appbuilder-um-ui'
};
const business = new control_business_1.ControlBusiness();
const ret = business.scanRouting(projectObj);
console.log(ret);
//# sourceMappingURL=test.js.map