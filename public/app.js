"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000";
    const songList = document.getElementById("song-list");

    // 曲リストを取得して表示
    async function fetchSongs() {
        const songs = await (await fetch(`${apiUrl}/songs`)).json();
        songList.innerHTML = songs.map(song => `
            <li class="song">
                <span>${song.name} by ${song.artist} - ${song.completed ? "聞いた" : "未完了"}</span>
                <button data-id="${song.id}" class="complete-song">${song.completed ? "未完了に戻す" : "完了"}</button>
                <button data-id="${song.id}" class="delete-song">削除</button>
            </li>
        `).join('');
    }

    // 曲追加
    async function addSong(name, artist) {
        await fetch(`${apiUrl}/songs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, artist, completed: false })
        });
        fetchSongs();
    }

    // 完了状態の切り替え
    async function toggleCompletion(id) {
        await fetch(`${apiUrl}/songs/${id}/toggle`, { method: "PUT" });
        fetchSongs();
    }

    // 曲削除
    async function deleteSong(id) {
        await fetch(`${apiUrl}/songs/${id}`, { method: "DELETE" });
        fetchSongs();
    }

    document.getElementById("add-song").addEventListener("click", () => {
        const songName = document.getElementById("song-name").value.trim();
        const artistName = document.getElementById("artist-name").value.trim();
        if (songName && artistName) {
            addSong(songName, artistName);
            document.getElementById("song-name").value = "";
            document.getElementById("artist-name").value = "";
        }
    });

    songList.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        if (e.target.classList.contains("complete-song")) toggleCompletion(id);
        if (e.target.classList.contains("delete-song")) deleteSong(id);
    });

    fetchSongs();
});
