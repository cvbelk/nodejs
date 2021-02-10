//const firstNam = require("./utils.js");
//const nam = "Oleh";
//console.log(firstNam(7, -2)); 
//-----------------challenge
const secondNam = require("../notes-app/notes.js");
console.log(secondNam());

console.log("----------npm-----------");
const validator = require('validator');

//console.log(validator.isEmail('andrew@ex.com'));
console.log(validator.isURL('https://mead.io'));
//-------------challenge with chalk.npm---
const chalk = require('chalk');
const clog = console.log;
clog(chalk.blue("blue txt"));
//clog(chalk.green.bgCyan.bold('Hello Oleh'));
//clog(chalk.inverse.bold('Hello Oleh'));
//------console args--------------------

console.log(`Hello, ${process.argv[2]}`);
