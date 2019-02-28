import {ControlBusiness} from './control-business';

const projectObj = {
    root_path: 'F:/appbuilder-um-ui',
    project_name: 'appbuilder-um-ui'
};

const business = new ControlBusiness();

const ret = business.scanRouting(projectObj);

console.log(ret);
