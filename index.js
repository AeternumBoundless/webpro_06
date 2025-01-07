"use strict";
const express = require("express");
const app = express();

let bbs = []; // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

// EJSテンプレートエンジンを設定
app.set("view engine", "ejs");
// 静的ファイル（publicフォルダ内）のアクセス設定
app.use("/public", express.static(__dirname + "/public"));
// POSTリクエストのボディをURLエンコード形式で処理できるように設定
app.use(express.urlencoded({ extended: true }));

// BBS関連のエンドポイント

// 現在の掲示板の投稿数を返す
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json({ number: bbs.length });
});

// 投稿を読み込む（ページ番号の指定があれば、指定された範囲を返す）
app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number(req.body.start);
  console.log("read -> " + start);
  if (start == 0) res.json({ messages: bbs });
  else res.json({ messages: bbs.slice(start) });
});

// 新しい投稿を掲示板に追加
app.post("/post", (req, res) => {
  const name = req.body.name; // 名前
  const message = req.body.message; // メッセージ
  console.log([name, message]);
  // 本来はここでDBMSに保存する
  bbs.push({ name: name, message: message }); // bbs配列に追加
  res.json({ number: bbs.length }); // 現在の投稿数を返す
});


// アプリケーションをポート8080で起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
