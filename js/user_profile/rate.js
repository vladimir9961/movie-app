import { api_host, key, cookie_user, user_id } from "../api.js";
import { alert_succes, alert_warning } from "../components/messages.js";
let regex = /\d+/g;
let url = window.location.href;
let get_query = url.substring(url.indexOf('?') + 1)
var matches = parseInt(get_query.match(regex));
let get_movie_or_tv = get_query.substring(0, get_query.indexOf("/"));


//RATE MOVIE AND TV
export const rate = (movie_id, value, movie_tv) => {
    console.log(movie_tv);
    let info = {
        "value": `${value}`,
    }
    fetch(`${api_host}${movie_tv}/${movie_id}/rating?api_key=${key}&session_id=${cookie_user}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
        body: JSON.stringify(info),
    })
        .then(response => response.json())
        .then(data => alert_succes(data.status_message))
}

//DELETE RATE FROM MOVIE
//DELETE TV RATE
export const delete_rate = (data, movie_tv) => {
    fetch(`${api_host}${movie_tv}/${data}/rating?api_key=${key}&session_id=${cookie_user}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
    })
        .then(response => response.json())
        .then(data => alert_warning(data.status_message)
        )
}
//FETCH RATED MOVIES
//LATER TV'S
export const alredy_rated = () => {
    let movie_or_tv;
    if (get_movie_or_tv == "movie") {
        movie_or_tv = "movies"
    } else {
        movie_or_tv = "tv"
    }
    fetch(`${api_host}account/${user_id}/rated/${movie_or_tv}?api_key=${key}&language=en-US&session_id=${cookie_user}&sort_by=created_at.asc`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
    })
        .then(response => response.json())
        .then(data => check_if_alredy_has_rated(data.results))
    //Loop trough user rated movies

    function check_if_alredy_has_rated(data) {
        data.forEach(function (data) {
            if (matches === data.id) {
                document.getElementById("stars_holder").style.color = "gold";
                const fieldset = document.querySelector(".rate").getElementsByTagName("input");
                for (let i = 0; i < fieldset.length; i++) {
                    if (fieldset[i].value == data.rating) {
                        fieldset[i].checked = true
                    }
                }
            }
        });
    }
}
