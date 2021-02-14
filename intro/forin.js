
"use strict";
let txt = "";
const person = {fname:"John", lname:"Doe", age:25}; 
let x;
for (x in person) {
  txt += x +": " + person[x] + " ";
}
//document.getElementById("demo").innerHTML = txt;
console.log(txt);
