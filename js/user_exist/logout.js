import { key, api_host, cookie_user, user_id } from '../api.js';
// console.log(document.cookie = `session_id =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);

window.onload = function logoutUser() {

    const logout = document.querySelector("#logout");

    logout.addEventListener('click', () => {

        let body = {
            "session_id": `${cookie_user}`
        }
        fetch(`${api_host}authentication/session?api_key=${key}`
            , {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then((data) => {
                if (data.success === true) {
                    document.cookie = `user_id =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    document.cookie = `session_id =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    location.replace("../../login/index.html")
                }
            })
    });
}
