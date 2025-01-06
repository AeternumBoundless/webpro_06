"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');
const loadMoreBtn = document.querySelector('#load-more-btn');

// 送信ボタンが押されたとき
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {
        method: "POST",
        body: 'name=' + name + '&message=' + message,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    
    const url = "/post";
    fetch(url, params)
        .then(response => response.json())
        .then(() => {
            document.querySelector('#message').value = "";
            loadMessages();  // 新しい投稿があったらメッセージを再読み込み
        });
});

// 投稿を読み込む関数
function loadMessages() {
    const params = {
        method: "POST",
        body: 'start=' + number,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    
    const url = "/read";
    fetch(url, params)
        .then(response => response.json())
        .then(response => {
            number += response.messages.length;
            displayMessages(response.messages);
        });
}

// メッセージを表示する関数
function displayMessages(messages) {
    messages.forEach(mes => {
        let cover = document.createElement('div');
        cover.className = 'cover';
        
        let name_area = document.createElement('span');
        name_area.className = 'name';
        name_area.innerText = mes.name;
        
        let mes_area = document.createElement('span');
        mes_area.className = 'mes';
        mes_area.innerText = mes.message;

        let editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerText = '編集';
        editBtn.onclick = () => editMessage(mes.id, mes.message);

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerText = '削除';
        deleteBtn.onclick = () => deleteMessage(mes.id);

        cover.appendChild(name_area);
        cover.appendChild(mes_area);
        cover.appendChild(editBtn);
        cover.appendChild(deleteBtn);
        
        bbs.appendChild(cover);
    });
}

// メッセージを編集する関数
function editMessage(id, currentMessage) {
    const newMessage = prompt('新しいメッセージを入力してください:', currentMessage);
    if (newMessage) {
        const params = {
            method: 'POST',
            body: 'id=' + id + '&message=' + newMessage,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        fetch('/edit', params)
            .then(() => loadMessages());  // 編集後にメッセージを再読み込み
    }
}

// メッセージを削除する関数
function deleteMessage(id) {
    const params = {
        method: 'POST',
        body: 'id=' + id,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    fetch('/delete', params)
        .then(() => loadMessages());  // 削除後にメッセージを再読み込み
}
