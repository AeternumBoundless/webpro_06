"use strict";

const express = require("express");
const app = express();
app.use(express.json());

let songs = [];
let id = 1;

// 曲リスト取得
app.get("/songs", (req, res) => res.json(songs));

// 曲追加
app.post("/songs", (req, res) => {
    const song = { id: id++, ...req.body };
    songs.push(song);
    res.status(201).json(song);
});

// 完了状態の切り替え
app.put("/songs/:id/toggle", (req, res) => {
    const song = songs.find(s => s.id === +req.params.id);
    song ? res.json({ ...song, completed: !song.completed }) : res.status(404).send();
});

// 曲削除
app.delete("/songs/:id", (req, res) => {
    songs = songs.filter(s => s.id !== +req.params.id);
    res.status(204).send();
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
