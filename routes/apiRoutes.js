var notesData = require("../db/db.json");
var fs = require("fs");
const { Console } = require("console");

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  app.post("/api/notes", function(req, res) {

    let id = notesData.length +1;
    let newNote = req.body;
    newNote.id = id;

    console.log(req.body);
    notesData.push(newNote);

    let notes = JSON.stringify(notesData);

      fs.writeFile("db/db.json", notes, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });

      res.json(true);
  });

  app.delete("/api/notes/:id", function(req, res) {

    console.log(req.params.id);


    const newNotes = notesData.filter(note => note.id === req.params.id);
    console.log(newNotes);

  //  for (let index = 0; index < notesData.length; index++) {
  //    if (notesData[index].id!==req.params.id) {
  //      console.log(notesData[index].id);
  //      console.log(req.params.id);
  //      newNotes.push(notesData[index]);
  //    }
     
  //  }

  //  console.log(newNotes);

  //  let notes = JSON.stringify(newNotes);

  //     fs.writeFile("db/db.json", notes, (err) => {
  //       if (err) {
  //           throw err;
  //       }
  //       console.log("JSON data is saved.");
  //   });


      res.json(true);
  });


};