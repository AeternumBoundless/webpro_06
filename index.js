"use strict";
const express = require("express");
const app = express();

let bbs = []; 


app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));


app.post("/check", (req, res) => {
  
  res.json({ number: bbs.length });
});


app.post("/read", (req, res) => {
  
  const start = Number(req.body.start);
  console.log("read -> " + start);
  if (start == 0) res.json({ messages: bbs });
  else res.json({ messages: bbs.slice(start) });
});


app.post("/post", (req, res) => {
  const name = req.body.name; 
  const message = req.body.message; 
  console.log([name, message]);
  
  bbs.push({ name: name, message: message }); 
  res.json({ number: bbs.length }); 
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
