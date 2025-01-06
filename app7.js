"use strict";

const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// 投稿の処理
app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  bbs.push({ name: name, message: message });
  res.json({ number: bbs.length });
});

// 投稿チェック
app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

// 投稿読み込み
app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  if (start === 0) {
    res.json({ messages: bbs });
  } else {
    res.json({ messages: bbs.slice(start) });
  }
});

// サーバーを起動
app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});
っv