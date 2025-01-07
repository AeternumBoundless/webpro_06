"use strict";

let number = 0; // 投稿数を追跡する変数

const bbs = document.querySelector('#bbs');

// 数字を赤色にするためのスタイル
function styleNumbers(message) {
    // 数字を検出して<span>タグでラップする
    return message.replace(/\d+/g, (match) => {
        return `<span class="number">${match}</span>`;  // 数字部分にクラス「number」を追加
    });
}

// 投稿ボタンを押した時の処理
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    // 名前かメッセージが空の場合はエラーを表示
    if (!name || !message) {
        alert("名前とメッセージは必須です！");
        return;  // フォーム送信を中止
    }

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log(params);
    const url = "/post";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);
        document.querySelector('#message').value = "";
    });
});

// 投稿チェックボタンを押した時の処理
document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        let value = response.number;
        console.log(value);

        console.log(number);
        if (number != value) {
            const params = {
                method: "POST",
                body: 'start=' + number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const url = "/read";
            fetch(url, params)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then((response) => {
                number += response.messages.length;
                for (let mes of response.messages) {
                    console.log(mes);  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';

                    // 現在の時間を取得し、フォーマットする
                    const now = new Date();
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');
                    const time = `${hours}:${minutes}:${seconds}`;

                    // 名前の前に時間を追加
                    let time_area = document.createElement('span');
                    time_area.className = 'time';
                    time_area.innerText = time;

                    let name_area = document.createElement('span');
                    name_area.className = 'name'; 
                    name_area.innerText = mes.name;

                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerHTML = styleNumbers(mes.message);  // メッセージ内の数字に色を付ける

                    cover.appendChild(time_area);
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);

                    bbs.appendChild(cover);
                }
            })
        }
    });
});
