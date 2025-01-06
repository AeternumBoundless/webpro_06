const express = require("express");
const app = express();
app.use(express.json());

let songs = [];
let id = 1;

app.get("/songs", (req, res) => {
    res.json(songs);
});

app.post("/songs", (req, res) => {
    const song = { id: id++, name: req.body.name, completed: false };
    songs.push(song);
    res.status(201).json(song);
});

app.put("/songs/:id/toggle", (req, res) => {
    const song = songs.find(song => song.id === parseInt(req.params.id, 10));
    if (song) {
        song.completed = !song.completed;
        if (song.completed) {
            songs = songs.filter(s => s.id !== song.id); // 完了した曲をリストから削除
        }
        res.status(200).json(song);
    } else {
        res.status(404).send();
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
