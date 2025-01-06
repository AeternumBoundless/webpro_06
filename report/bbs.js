"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');

// 送信ボタンのイベントリスナー
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
    .then(response => {
        if (!response.ok) throw new Error('Error');
        return response.json();
    })
    .then(response => {
        console.log(response);
        document.querySelector('#message').value = "";
    });
});

// 投稿チェックボタン
document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: '',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    const url = "/check";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) throw new Error('Error');
        return response.json();
    })
    .then((response) => {
        let value = response.number;
        if (number !== value) {
            const params = {
                method: "POST",
                body: 'start=' + number,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };
            const url = "/read";
            fetch(url, params)
            .then((response) => {
                if (!response.ok) throw new Error('Error');
                return response.json();
            })
            .then((response) => {
                number += response.messages.length;
                for (let mes of response.messages) {
                    let cover = document.createElement('div');
                    cover.className = 'cover';

                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;

                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

                    let like_button = document.createElement('button');
                    like_button.className = 'button';
                    like_button.innerText = "いいね";
                    like_button.addEventListener('click', () => likePost(mes.index));

                    let delete_button = document.createElement('button');
                    delete_button.className = 'button';
                    delete_button.innerText = "削除";
                    delete_button.addEventListener('click', () => deletePost(mes.index));

                    let edit_button = document.createElement('button');
                    edit_button.className = 'button';
                    edit_button.innerText = "編集";
                    edit_button.addEventListener('click', () => editPost(mes.index));

                    let likes = document.createElement('span');
                    likes.className = 'likes';
                    likes.innerText = `いいね: ${mes.likes}`;

                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);
                    cover.appendChild(like_button);
                    cover.appendChild(delete_button);
                    cover.appendChild(edit_button);
                    cover.appendChild(likes);

                    bbs.appendChild(cover);
                }
            });
        }
    });
});

// いいね機能
function likePost(index) {
    const params = {
        method: "POST",
        body: 'index=' + index,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    const url = "/like";
    fetch(url, params)
    .then(response => {
        if (!response.ok) throw new Error('Error');
        return response.json();
    })
    .then(response => {
        console.log("いいね数:", response.number);
        location.reload();  // ページを再読み込みして最新のいいね数を表示
    });
}

// 削除機能
function deletePost(index) {
    const params = {
        method: "POST",
        body: 'index=' + index,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };
    const url = "/delete";
    fetch(url, params)
    .then(response => {
        if (!response.ok) throw new Error('Error');
        return response.json();
    })
    .then(response => {
        console.log("投稿削除後:", response);
        location.reload();  // ページを再読み込み
    });
}

// 編集機能
function editPost(index) {
    const newMessage = prompt("新しいメッセージを入力してください:");
    if (newMessage) {
        const params = {
            method: "POST",
            body: 'index=' + index + '&message=' + newMessage,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
        const url = "/edit";
        fetch(url, params)
        .then(response => {
            if (!response.ok) throw new Error('Error');
            return response.json();
        })
        .then(response => {
            console.log("投稿編集後:", response);
            location.reload();  // ページを再読み込み
        });
    }
}
