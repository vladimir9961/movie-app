import { key, api_host, cookie_user, cookie_guest } from './api.js';

window.addEventListener('load', function () {
    const user_buttons = document.querySelector("#user_bar");
    const guest_buttons = document.querySelector("#guest_bar");
    if (cookie_user) {
        //ALREDY HAVE SESSION ID USER REGISTRED
        fetch(`${api_host}account?api_key=${key}&session_id=${cookie_user}`)
            .then(response => response.json())
            .then(data => user_data(data))
        user_buttons.style.display = "grid";

    }
    // ALREDY HAVE SESSION ID GUEST
    else {
        if (cookie_guest) {
            if (window.location.href.indexOf("login") != -1) {
            }
        }
        // DOESENT HAVE SESSION ID NEW USER
        else {
            fetch(`${api_host}authentication/guest_session/new?api_key=${key}`)
                .then(response => response.json())
                .then(data => guest(data))
        }
        guest_buttons.style.display = "flex";

    }
})

//Set username and user avatar
function user_data(data) {
    const list_user_image = document.querySelector('[data-user-image]')
    document.getElementById("user_avatar").src = (`https://secure.gravatar.com/avatar/${data.avatar.gravatar.hash}.jpg?s=32`);
    if (list_user_image) {
        list_user_image.src = (`https://secure.gravatar.com/avatar/${data.avatar.gravatar.hash}.jpg`)
    }
    document.getElementById("user_name").innerHTML = data.username;
    document.cookie = `user_id=${data.id}; path=/`;
}
//USER DOESEN'T EXIST
function guest(data) {
    var a = data;
    console.log(a)
    document.cookie = `guest_session_id=${data.guest_session_id}; expires=${a}; path=/`;
}



