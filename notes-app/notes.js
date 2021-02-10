const fs = require ('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notesList = loadNotes();
    const currentNote = {
        title: title, 
        body: body
    };
    debugger; //node inspect app.js ... then chrome://inspect -> devices ->target, select worspace, execute button
    //if there are no devices, enter to shell: debug> restart
    const duplicateNote = notesList.find((note) => note.title === title);

    if (!duplicateNote) {
        notesList.push(currentNote);
        saveNotes(notesList);
        console.log(chalk.bgGreen.bold('Note added'));
    } else {
        console.log(chalk.bgRed.bold('Note with this title exists'));        
    }
}

const removeNote = (title) => {
    const notesList = loadNotes();
    const resultList = notesList.filter(note => note.title !== title);
    if (resultList.length !== notesList.length) {  //notesList.findIndex((element) => element.title === title) !== -1
        saveNotes(resultList); 
        return true;
    } else {
        return false;
    }
}

const readNote = (title) => {
    const notesList = loadNotes();
    const foundNote = notesList.find(element => element.title === title);
    if (foundNote) {
        console.log(chalk.green.bold(`Title: ${foundNote.title}`), chalk.blue(`\nBody: ${foundNote.body}`));
    } else {
        console.log(chalk.bgRed.bold(`Note with title: "${title}" doesnt exists`)); //return chalk not working
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const rcvdData = dataBuffer.toString();
        return JSON.parse(rcvdData); 
    } catch(e) {
        return [];
    }

}
const listNotes = () => {
    const notesList = loadNotes();
    if (notesList.length > 0){
        console.log(chalk.bgWhite.blue.bold('Your notes:'));
        notesList.forEach(note => {
            console.log(chalk.green.bold(`Title: ${note.title}`), chalk.blue(`\nBody: ${note.body}`));
            console.log("--------------------------------------");
        });
    } else {
        console.log(chalk.bgRed('Your notes list is empty'));
    }
}

module.exports = {
    addNote: addNote,
    loadNotes: listNotes,
    removeNote: removeNote,
    readNote: readNote
}