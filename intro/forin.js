
"use strict";
let txt = "";
const person = {fname:"John", lname:"Doe", age:25}; 
let x;
let index = 1;
for (x in person) {
  
  txt += x +": " + person[x] + " ";
  console.log(`${index}: ${x} - ${person[x]}`);
  index++;
}
//document.getElementById("demo").innerHTML = txt;
console.log(txt);
