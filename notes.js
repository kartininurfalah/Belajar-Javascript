const fs = require('fs');
// console.log(module);

// module.exports.age = 21;
// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'New note';
// }
var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
    return notes = JSON.parse(noteString);

  } catch (e) {
    return [];
  };
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));

};

var addNote = (title, body) => {
  // console.log('Adding note', title, body);
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNote = notes.filter((note) => note.title === title);
  return filteredNote[0];
};

var removeNote = (title) => {
  // fetch notes
  var notes = fetchNotes();
  //filter notes, removing the one with title of argument
  var filteredNote = notes.filter((note) => note.title !== title);
  // save new notes to array
  saveNotes(filteredNote);

  return notes.length !== filteredNote.length;
};

var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};