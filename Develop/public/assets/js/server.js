
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

app.post("/api/notes", function(req, res){
  
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
