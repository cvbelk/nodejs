//challenge 
//1.Read data from file, parse, change, rewrite
const fs = require ('fs');

const readBuffer = fs.readFileSync("jsondata.txt");
const rcvdData = readBuffer.toString();
const obj = JSON.parse(rcvdData);
console.log(obj);
obj.name = "Oleh";
obj.lastname = "Bilokrylyi";
obj.age = 34;
console.log(obj);
const mdfData = JSON.stringify(obj);
fs.writeFileSync("jsondata.txt", mdfData);
