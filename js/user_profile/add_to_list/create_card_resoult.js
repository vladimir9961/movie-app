import { api_host, key, cookie_user } from "../../api.js";
import { alert_succes, alert_warning } from "../../components/messages.js";
import { get_added_items_from_list } from "./add_to_list.js"
let url = window.location.href;
let get_query = url.substring(url.indexOf('=') + 1);
const items_list = document.querySelector('[data-added-movies]');

const div_display_movies = document.querySelector('[data-display-movies]');
//CREATING SIMPLE CARDS FOR EACH MOVIE THAT IS FETCHED BY SEARCH
export const create_cards_with_search_resoults = (data) => {
    div_display_movies.innerHTML = "";
    div_display_movies.style.display = "grid"
    data.forEach(movie => {
        let div_parent = document.createElement('div');
        //ADDING MOVIES TO LIST AND CALLING FUNTION TO DISPLAY THEM
        div_parent.addEventListener('click', () => {
            items_list.innerHTML = "";
            add_to_list_movie(movie.id);
            setTimeout(() => {
                get_added_items_from_list()
            }, 1000)
        })
        let div_child = document.createElement('div');
        let img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`
        if (movie.poster_path == null) {
            img.src = "../../css/img/no_image.png";
        }
        let title = document.createElement('h5')
        title.innerHTML = movie.title;
        let release = document.createElement('span')
        release.innerHTML = movie.release_date;

        div_child.append(title, release);
        div_parent.append(img, div_child);
        div_display_movies.appendChild(div_parent)
    })

}
//ADDING MOVIES TO LIST
function add_to_list_movie(movie_id) {
    let body = {
        "media_id": movie_id
    }
    fetch(`
    ${api_host}list/${get_query}/add_item?api_key=${key}&session_id=${cookie_user}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success == false) {
                alert_warning(data.status_message)
            } else {
                alert_succes(data.status_message)
            }
        })
}