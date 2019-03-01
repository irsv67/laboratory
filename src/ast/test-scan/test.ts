import {ScanMain} from './scan-main';

const projectObj = {
    root_path: 'F:/analytics-front-end_5.1',
    project_name: 'analytics-front-end_5.1'
};

// analytics-front-end_5.1
// appbuilder-um-ui
// cosmos-builder
// appbuilder-oneui

const scanMain = new ScanMain();

const ret = scanMain.scanProject(projectObj);

// console.log(ret);
