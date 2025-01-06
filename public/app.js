"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTodoButton = document.getElementById("add-todo");
    const todoList = document.getElementById("todo-list");

    const fetchTodos = async () => {
        const response = await fetch("/todos");
        const todos = await response.json();
        renderTodos(todos);
    };

    const renderTodos = (todos) => {
        todoList.innerHTML = "";
        todos.forEach(todo => {
            const li = document.createElement("li");
            li.className = "todo-item";
            li.innerHTML = `
                <span>${todo.title}</span>
                <button data-id="${todo.id}" class="delete-button">削除</button>
            `;
            todoList.appendChild(li);
        });
    };

    const addTodo = async (title) => {
        await fetch("/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await fetch(`/todos/${id}`, { method: "DELETE" });
        fetchTodos();
    };

    addTodoButton.addEventListener("click", () => {
        const title = todoInput.value.trim();
        if (title) {
            addTodo(title);
            todoInput.value = "";
        }
    });

    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
            const id = e.target.dataset.id;
            deleteTodo(id);
        }
    });

    fetchTodos();
});
