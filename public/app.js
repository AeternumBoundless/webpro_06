"use strict";
const express = require("express");
const app = express();

let songs = []; // 曲リストを保存する配列
let id = 1; // 一意のIDを管理

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

// 曲リストを取得
app.get("/songs", (req, res) => {
    res.json(songs);
});

// 曲を追加
app.post("/songs", (req, res) => {
    const { name } = req.body;
    if (name) {
        const song = { id: id++, name };
        songs.push(song);
        res.status(201).json(song);
    } else {
        res.status(400).json({ error: "Invalid input" });
    }
});

// サーバーをポート8080で起動
app.listen(8080, () => console.log("Server is running on http://localhost:8080"));
