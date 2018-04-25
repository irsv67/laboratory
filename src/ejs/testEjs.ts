import {render} from 'ejs';
import {renderFile} from 'ejs';

let people = ['geddy', 'neil', 'alex'];
let people2 = ['geddy2', 'neil2', 'alex2'];

let html = render('<%= people.join(", "); %><%= People.join(", "); %>', {people: people, People: people2});
console.log(html)

renderFile('temp1.ejs', {people: people, People: people2}, function (err: Error, str: string) {
    console.log(str)
});


