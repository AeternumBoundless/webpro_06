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
  bbs.push({ name: name, message: message, likes: 0 });  // いいね数を追加
  res.json({ number: bbs.length });
});

// 投稿の削除
app.post("/delete", (req, res) => {
  const index = Number(req.body.index);
  if (index >= 0 && index < bbs.length) {
    bbs.splice(index, 1);
    res.json({ number: bbs.length });
  } else {
    res.status(400).json({ error: "無効な投稿インデックス" });
  }
});

// 投稿の編集
app.post("/edit", (req, res) => {
  const index = Number(req.body.index);
  const newMessage = req.body.message;
  if (index >= 0 && index < bbs.length) {
    bbs[index].message = newMessage;
    res.json({ number: bbs.length });
  } else {
    res.status(400).json({ error: "無効な投稿インデックス" });
  }
});

// いいね機能
app.post("/like", (req, res) => {
  const index = Number(req.body.index);
  if (index >= 0 && index < bbs.length) {
    bbs[index].likes += 1;
    res.json({ number: bbs[index].likes });
  } else {
    res.status(400).json({ error: "無効な投稿インデックス" });
  }
});

// その他のルート
app.listen(8080, () => console.log("Example app listening on port 8080!"));
