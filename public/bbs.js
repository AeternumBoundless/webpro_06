"use strict";

let number = 0; 

const bbs = document.querySelector('#bbs');


function styleNumbers(message) {
    
    return message.replace(/\d+/g, (match) => {
        return `<span class="number">${match}</span>`;  
    });
}


document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    
    if (!name || !message) {
        alert("必ず名前とメッセージの入力が必要です。");
        return;  
    }

    const params = {  
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


document.querySelector('#check').addEventListener('click', () => {
    const params = {  
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
                    console.log(mes);  
                    let cover = document.createElement('div');
                    cover.className = 'cover';

                    
                    const now = new Date();
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    const seconds = String(now.getSeconds()).padStart(2, '0');
                    const time = `${hours}:${minutes}:${seconds}`;

                    
                    let time_area = document.createElement('span');
                    time_area.className = 'time';
                    time_area.innerText = time;

                    let name_area = document.createElement('span');
                    name_area.className = 'name'; 
                    name_area.innerText = mes.name;

                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerHTML = styleNumbers(mes.message);  

                    cover.appendChild(time_area);
                    cover.appendChild(name_area);
                    cover.appendChild(mes_area);

                    bbs.appendChild(cover);
                }
            })
        }
    });
});
