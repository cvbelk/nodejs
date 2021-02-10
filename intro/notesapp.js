const fs = require ('fs');
fs.writeFileSync("notes.txt", "My name is Oleh");

//1.Use appendFileSync

fs.appendFileSync("notes.txt", "\n----Appended data----");
