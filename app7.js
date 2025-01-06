"use strict";
const express = require("express");
const app = express();

let songs = [];  // 曲のデータを保持

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // JSONのリクエストも処理する

// 曲リストを表示するエンドポイント
app.get("/songs", (req, res) => {
  res.render('songs', { songs: songs });
});

// 曲を追加するエンドポイント（POST）
app.post("/songs", (req, res) => {
  const name = req.body.name;  // 曲名
  const artist = req.body.artist;  // アーティスト名
  console.log([name, artist]);

  // 曲データを配列に追加
  songs.push({ name: name, artist: artist });
  res.json({ message: "曲が追加されました", number: songs.length });
});

// 曲リストを取得するエンドポイント（GET）
app.get("/get_songs", (req, res) => {
  res.json(songs);
});

// 曲数を確認するエンドポイント
app.get("/check", (req, res) => {
  res.json({ number: songs.length });
});

// サーバーの起動
app.listen(8080, () => console.log("Server running on port 8080!"));
