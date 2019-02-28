import {ScanMain} from './scan-main';

const projectObj = {
    root_path: 'F:/appbuilder-um-ui',
    project_name: 'appbuilder-um-ui'
};

// analytics-front-end_5.1
// appbuilder-um-ui
// cosmos-builder
// appbuilder-oneui

const scanMain = new ScanMain();

const ret = scanMain.scanProject(projectObj);

// console.log(ret);
