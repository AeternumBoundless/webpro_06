const express = require("express");
const app = express();
app.use(express.json());

let songs = [];
let id = 1;

// 曲リストの取得
app.get("/songs", (req, res) => {
    res.json(songs);
});

// 曲を追加
app.post("/songs", (req, res) => {
    const song = { id: id++, name: req.body.name };
    songs.push(song);
    res.status(201).json(song);
});

// サーバーの起動
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
