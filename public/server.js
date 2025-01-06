"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let todos = []; // To-Doデータを管理

app.use(express.static("public"));
app.use(bodyParser.json());

// To-Doリスト取得
app.get("/todos", (req, res) => {
    res.json(todos);
});

// To-Do追加
app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (title) {
        const newTodo = { id: Date.now(), title, completed: false };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).send("Title is required");
    }
});

// To-Do削除
app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).end();
});

app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
