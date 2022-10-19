// * so i initially created a routes folder and was trying to do it the new age way for express instead of keeping everything
// on one file like this but it was a little harder for me to grasp and I figured i'd just go about it this way 
// anyways thank you for coming to my TED talk. 


// dependencies 
const { application } = require('express');
const fs = require('fs');
const express = require('express');
const path = require('path'); 
const util = require('util');

//inits the app 
const app = express();

// using cli domain OR the local port that i created
const PORT = process.env.PORT || 3001; 

// taking our data with express.json 
// serving our front end 
// aka middleware configuration for the project 
app.use(express.static(path.join(__dirname, 'public')));
// went this route isntead creating get functions for the paths because you can 
// use express static which is less code and way easier 
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const readFileASync = util.promisify(fs.readFile);
const writeFileASync = util.promisify(fs.writeFile);
// route for the notes hmtl 
/*app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
*/
// reading and returning saved notes to json 
app.get("/api/notes", (req, res) => {
  readFileASync("./db/db.json", "utf-8").then(function(data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});
  
/*
// route to main 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
*/


// saving the new note on the req and then adding as well to the db file => then returning it to the client side 
app.post("/api/notes", (req, res) => {
  const note = req.body;
  readFileASync("./db/db.json", "utf-8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes
  }).then(function(notes) {
   fs.writeFileASync("./db/db,json", "utf-8", JSON.stringify(notes))
   res.json(note)
  })

})

// Bonus 
app.delete("/api/notes/:id", (req, res) => {
  const idDelete = parseInt*(req.params.id);
  readFileASync("./db.db.json", "utf-8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const newData = [];
    for(let i = 0; i < notes.length; i++) {
      if(idDelete !== notes[i].id) {
        newData.push(notes[i])
      }
    }
    return newData;
  }).then(function(notes) {
    writeFileASync("./db/db.json", JSON.stringify(notes))
    res.send("success")
  })

});

// listening for the port 
app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT} 🚀`)
); 
