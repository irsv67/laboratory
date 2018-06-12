generate/rest/model/sav

let jsdom = require("jsdom");
let JSDOM = jsdom.JSDOM;
function unescapeTrue(str) {
    let document = new JSDOM().window.document;
    let elem = document.createElement('div')
    elem.innerHTML = str
    return elem.innerHTML;
}
