const chalk = require('chalk');
const notesEngine = require("./notes.js");
// const command = process.argv[2];

//using yargs library
const yargs = require('yargs');
//customize ver
yargs.version('1.1.1');
//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder : {
        title: {
            describe: 'Note title',
            demandOption: true, //making arg param necessary
            type: 'string' //type of param
        },
        body: {
            describe: 'Note body',
            demandOption: true, 
            type: 'string'            
        }
    },
    handler(argv) {
        console.log('Adding new note:\nTitle: "', argv.title, '"\nBody: "', argv.body, '"');
        notesEngine.addNote(argv.title, argv.body);
    }    
});
//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove an existing note',
    builder : {
        title: {
            describe: 'Note title',
            demandOption: true, //making arg param necessary
            type: 'string' //type of param
        }
    },    
    handler(argv) {
        console.log(`Removing note with title: "${argv.title}"`);
        if (notesEngine.removeNote(argv.title)) {
            console.log(chalk.bgGreen.bold(`Note with title: "${argv.title}" removed`));

        }else {
            console.log(chalk.bgRed.bold(`Note with title: "${argv.title}" doesnt exists`));
        }

    }
});
//challenge: creating 'list' and 'read' commands
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        //console.log('Listing out all notes:');
        //const dat = notesEngine.loadNotes();
        notesEngine.loadNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read note',
    builder : {
        title: {
            describe: 'Note title',
            demandOption: true, //making arg param necessary
            type: 'string' //type of param
        }
    },
    handler(argv) {
        console.log(`Reading a note with title: "${argv.title}"`);
        notesEngine.readNote(argv.title);
    }
});
yargs.parse(); //necessary to have output msg
//console.log(yargs.argv);