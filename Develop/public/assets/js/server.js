const db = require("../../../db/db.json")
const express = require("express");
const path = require("path");
const fs = require('fs')

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, '../../../public/')))
//middleware for json req body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

//get notes page
app.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "../../notes.html"));
})

//get list of notes in api
app.get("/api/notes", function(req, res){
  return res.sendFile(path.join(__dirname,"../../../db/db.json"))
})

app.get("/api/notes/:noteid", function(req, res){
  var chosen = req.params.noteid;
  console.log(chosen);
  for (let i = 0; i < db.length; i++) {
    if (chosen === db[i].id) {
      return res.json(db[i]);
    }else 
      return res.json(false);
  }
})

app.post("/api/notes", function(req, res){
  var newNote = req.body
  newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase();
  fs.readFile(path.join(__dirname,"../../../db/db.json"), function (err, data) {
    if(err) throw(err)
      var notes = JSON.parse(data)
      console.log(notes)
      notes.push(newNote)
      fs.writeFile(path.join(__dirname,"../../../db/db.json"), JSON.stringify(notes), (err) => { if(err) throw(err)})
  })
})

app.delete("/api/notes/:id", function(req, res){
  var id = req.params.id
  for(let i = 0; i < db.length; i++) {
    if(id === db[i].id){
      delete db[i]
      console.log(id + " deleted")
    }
  }
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
