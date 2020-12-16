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

   let removedID = req.params.id;
   console.log(removedID);

    const newNotes = notesData.filter(function(data) {
      return data.id != removedID;
    });

    console.log(newNotes);

   let notes = JSON.stringify(newNotes);

      fs.writeFile("db/db.json", notes, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });


      res.json(true);
  });



};