"use strict";

const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];
let id = 1;

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const task = { id: id++, name: req.body.name };
    tasks.push(task);
    res.status(201).json(task);
});

app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id, 10));
    res.status(204).send();
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
