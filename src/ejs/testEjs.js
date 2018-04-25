"use strict";
const ejs_1 = require('ejs');
const ejs_2 = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let people2 = ['geddy2', 'neil2', 'alex2'];
let html = ejs_1.render('<%= people.join(", "); %><%= People.join(", "); %>', { people: people, People: people2 });
console.log(html);
ejs_2.renderFile('temp1.ejs', { people: people, People: people2 }, function (err, str) {
    console.log(str);
});
//# sourceMappingURL=testEjs.js.map