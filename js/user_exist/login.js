//API PARAMETERS
import { key, api_host, cookie_user } from '../api.js';
import { alert_succes, alert_warning } from '../components/messages.js';
// FORM SELECTORS
const button = document.querySelector("#login");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const btnRemember = document.querySelector('#remember-me');
//GET NEW TOKEN
const new_token = `${api_host}authentication/token/new?api_key=${key}`;
//VALIDATE TOKEN
const validate_token = `${api_host}authentication/token/validate_with_login?api_key=${key}`;
//CREATE SESSION WITH VALIDATED TOKEN
const create_session_with_token = `${api_host}authentication/token/validate_with_login?api_key=${key}`;
//GET SESSION ID AND LOGIN USER
const get_session_id = `${api_host}authentication/session/new?api_key=${key}`;


//CHECK IF USER IS ALREDY HAVE SEESION_ID
function checkACookieExists() {
    if (cookie_user) {
        location.replace("../index.html");
    }
}
checkACookieExists();

button.addEventListener('click', () => {
    event.preventDefault()
    async function login() {
        //GET USERNAME AND USER PASSWORD
        function getUsername() {
            return username.value
        }

        function getPassword() {
            return password.value
        }
        //------------------------------
        // CREATE REQUEST FOR TOKEN
        let token = "";

        await fetch(new_token, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            },
            dataType: 'json',
        })
            .then(response => response.json())
            .then(data => token = data)
        //------------------------------
        //VALIDATE REQUESTED TOKEN WITH USERNAME AND PASSWORD
        let user_info = {
            "username": getUsername(),
            "password": getPassword(),
            "request_token": `${token.request_token}`
        }
        await fetch(validate_token
            , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                dataType: 'json',
                body: JSON.stringify(user_info),

            })
            .then(response => response.json())
            .then((data) => {
                if (data.success === false) {
                    alert_warning(data.status_message)
                }
            })

        //------------------------------------
        //CREATE SESSION WITH VALIDATED TOKEN
        let request_token = {
            "request_token": `${token.request_token}`
        }
        await fetch(create_session_with_token
            , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                dataType: 'json',
                body: JSON.stringify(user_info),
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data.success === false) {
                    alert_warning(data.status_message)
                }
            });
        //------------------------------------------
        //GET SESSION ID AND LOGIN USER
        await fetch(get_session_id
            , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                dataType: 'json',
                body: JSON.stringify(request_token),
            })
            .then(response => response.json())
            .then((data) => {
                if (data.success === true) {
                    alert_succes(`Welcome ${username.value}`)
                    setTimeout(() => {
                        saveUser(data)
                    }, 1000);
                }
            })

        function saveUser(session_id) {
            if (session_id.success === true) {
                //SET COOKIE WITH SESSION ID 
                var date = new Date();
                let cookie_expire = date.setDate(date.getDate() + 1);
                document.cookie = `session_id=${session_id.session_id}; expires=${cookie_expire}; path=/`;
                location.replace("../index.html");
            } else {
                console.log("something whent wrong")
            }
        }
        //----------------------

    }
    login()
})
let lStorageName = localStorage.getItem('username');
let lStoragePass = localStorage.getItem('password');
if (lStorageName || lStoragePass) {
    username.value = lStorageName;
    password.value = lStoragePass;
    btnRemember.checked = true
}

btnRemember.addEventListener('click', () => {
    if (btnRemember.checked === true) {
        if (username.value != "" || password.value != "") {
            localStorage.setItem('username', username.value);
            localStorage.setItem('password', password.value);
        }
    } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }
})