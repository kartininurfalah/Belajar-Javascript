const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
// const os = require('os');
const notes = require('./notes.js');

const titleOptions = {
  title : {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  }
};
const bodyOptions = {
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
};

const argv = yargs
  .command('add', 'Add a new note' , {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all note')
  .command('read', 'Read a note', {
    title : titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;
var command = argv._[0];
if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var readNote = notes.getNote(argv.title);
  if (readNote){
    console.log('Note found');
    notes.logNote(readNote);
  } else {
    console.log('Note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognize');
}
// console.log(_.isString(true));
// console.log(_.isString('Falah');
// var filteredArray = _.uniq(['Falah'])
// console.log(filteredArray);
// console.log('Result: ', notes.add(9, -2));

// var res = notes.addNote();
// console.log(res);

// var user = os.userInfo();
// console.log (user);
// // fs.appendFile('greetings.txt', 'Hello ' + user.username + '!');
// fs.appendFile('greetings.txt', `Hello ${user.username} ! You are ${notes.age}.`);
