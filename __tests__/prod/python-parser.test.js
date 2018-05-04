let enumt = require('../../lib/index');
let filbert = require('filbert');
let path = require('path');

let fs = require('fs');

// let result = enumt.readFile('../samples/pyfile.py');
let fullPath = path.resolve('../samples/pyfile.py');
console.log('fullPath = ', fullPath);

let fullData = fs.readFileSync(fullPath);
console.log('data', fullData);

let result = filbert.parse(fullData);

console.log('yes!');
console.log(result);
console.log('-----');
console.log(result['body'][1]['body']);
