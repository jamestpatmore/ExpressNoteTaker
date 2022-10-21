// Dependencies
const fs = require("fs");
const uuid = require("uuid");
const db = require("../db/db.json")

// Routing
module.exports = app => {
    // API GET request
    app.get("/api/notes", function (req, res) {
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
        });
        // res.json(db);
        // res.end();
    });
  
  // API POST request
    app.post("/api/notes", (req, res) => {
        let allNotes = [];
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4(),
            // uuid was great and is very helpful for id implentation/usage
        }
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err) throw err;
            allNotes = JSON.parse(data);
            //pushing the data to the db/json
            allNotes.push(newNote);
            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(allNotes), "utf-8", (err) => {
                if (err) throw err;
                console.log("The note has been saved.")
                res.end();
            })
        })
        console.log(newNote)
    });
  
  // API DELETE Request
    app.delete("/api/notes/:id", (req, res) => {
        let noteId = req.params.id;
        fs.readFile(__dirname + "/../db/db.json", (err, data) => {
            if (err) throw err;
            let notesDB = JSON.parse(data);
            const filteredNotes = notesDB.filter(values => values.id != noteId);
            //high order function to filter the note then delete
            fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(filteredNotes), "utf-8", err => {
                if (err) throw err;
                console.log("The note has been deleted.")
                res.end();
            });
        });
    });
};