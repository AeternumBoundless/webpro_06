# webpro_06



## このプログラムについて

## ファイル一覧

webpro_06
じゃんけん
(# 見出し)

このプロフラムについて
ファイル一覧
ファイル名	説明
app5.js	プログラム本体
public/janken.html	じゃんけんの開始画面
views / janken	じゃんけんのテンプレート
console.log("Hello");
使用手順
app5.js を起動する
Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
自分の手を入力する
flowchart TD;
開始 --> 終了;
flowchart TD;

graph TD
  start["開始"]
  end1["終了"]
  if{"(hand が 'グー' かつ cpu が 'チョキ') または<br>(hand が 'チョキ' かつ cpu が 'パー') または<br>(hand が 'パー' かつ cpu が 'グー')"}
  win["勝ち"]
  loose["負け"]
  tie["あいこ"]

  start --> if
  if -->|yes| win
  win --> end1
  if -->|no| if_tie{"hand == cpu"}
  if_tie -->|yes| tie
  tie --> end1
  if_tie -->|no| loose
  loose --> end1
