import {createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync} from 'fs';
import {ControlBusiness} from './control-business';

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

const business = new ControlBusiness();

const ret = business.scanRouting(projectObj);

writeFileSync(projectObj.root_path + '/_con_pro' + '/s_tree.json', JSON.stringify(ret));

console.log('----end----');
