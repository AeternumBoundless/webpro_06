document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000";
    const songList = document.getElementById("song-list");
    const songNameInput = document.getElementById("song-name");

    async function fetchSongs() {
        const response = await fetch(`${apiUrl}/songs`);
        const songs = await response.json();
        renderSongs(songs);
    }

    function renderSongs(songs) {
        songList.innerHTML = "";
        songs.forEach(song => {
            const li = document.createElement("li");
            li.className = "song";
            li.innerHTML = `
                <span>${song.name}</span>
                <button data-id="${song.id}" class="complete-song">${song.completed ? "完了" : "聴いた"}</button>
            `;
            songList.appendChild(li);
        });
    }

    async function addSong(name) {
        await fetch(`${apiUrl}/songs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, completed: false })
        });
        fetchSongs();
    }

    async function toggleCompletion(id) {
        await fetch(`${apiUrl}/songs/${id}/toggle`, { method: "PUT" });
        fetchSongs();
    }

    document.getElementById("add-song").addEventListener("click", () => {
        const songName = songNameInput.value.trim();
        if (songName) {
            addSong(songName);
            songNameInput.value = "";
        }
    });

    songList.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        if (e.target.classList.contains("complete-song")) {
            toggleCompletion(id);
        }
    });

    fetchSongs();
});