"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000";
    const songList = document.getElementById("song-list");
    const songNameInput = document.getElementById("song-name");
    const artistNameInput = document.getElementById("artist-name");

    async function fetchSongs() {
        const response = await fetch(`${apiUrl}/songs`);
        const songs = await response.json();
        renderSongs(songs);
    }

    function renderSongs(songs) {
        songList.innerHTML = "";
        songs.forEach(song => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${song.name} by ${song.artist} - ${song.completed ? "聞いた" : "未完了"}</span>
                <button data-id="${song.id}" class="complete-song">${song.completed ? "未完了に戻す" : "完了"}</button>
                <button data-id="${song.id}" class="delete-song">削除</button>
            `;
            songList.appendChild(li);
        });
    }

    async function addSong(name, artist) {
        await fetch(`${apiUrl}/songs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, artist })
        });
        fetchSongs();
    }

    async function toggleCompletion(id) {
        await fetch(`${apiUrl}/songs/${id}/toggle`, { method: "PUT" });
        fetchSongs();
    }

    async function deleteSong(id) {
        await fetch(`${apiUrl}/songs/${id}`, { method: "DELETE" });
        fetchSongs();
    }

    document.getElementById("add-song").addEventListener("click", () => {
        const songName = songNameInput.value.trim();
        const artistName = artistNameInput.value.trim();
        if (songName && artistName) {
            addSong(songName, artistName);
            songNameInput.value = "";
            artistNameInput.value = "";
        }
    });

    songList.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        if (e.target.classList.contains("complete-song")) {
            toggleCompletion(id);
        } else if (e.target.classList.contains("delete-song")) {
            deleteSong(id);
        }
    });

    fetchSongs();
});
