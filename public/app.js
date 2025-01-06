"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:3000"; // サーバのURL
    const taskList = document.getElementById("task-list");
    const newTaskInput = document.getElementById("new-task");

    async function fetchTasks() {
        const response = await fetch(`${apiUrl}/tasks`);
        const tasks = await response.json();
        renderTasks(tasks);
    }

    function renderTasks(tasks) {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "task";
            li.innerHTML = `
                <span>${task.name}</span>
                <button data-id="${task.id}" class="delete-task">削除</button>
            `;
            taskList.appendChild(li);
        });
    }

    async function addTask(name) {
        await fetch(`${apiUrl}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        fetchTasks();
    }

    async function deleteTask(id) {
        await fetch(`${apiUrl}/tasks/${id}`, { method: "DELETE" });
        fetchTasks();
    }

    document.getElementById("add-task").addEventListener("click", () => {
        const taskName = newTaskInput.value.trim();
        if (taskName) {
            addTask(taskName);
            newTaskInput.value = "";
        }
    });

    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-task")) {
            const taskId = e.target.getAttribute("data-id");
            deleteTask(taskId);
        }
    });

    fetchTasks();
});
