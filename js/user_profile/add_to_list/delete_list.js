import { key, api_host, cookie_user } from '../../api.js';
let url = window.location.href;
let get_query = url.substring(url.indexOf('=') + 1);
//DELETE LIST
document.querySelector('[data-type-delete-list]').addEventListener('click', () => {

    fetch(`${api_host}list/${get_query}?api_key=${key}&session_id=${cookie_user}`, {
        method: 'DELETE',
    })
        .then(res => res.text())
        .then((data) => {
            console.log(data)
            location.href = "http://127.0.0.1:5500/list/"
        })
})