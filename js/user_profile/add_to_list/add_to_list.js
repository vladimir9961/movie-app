import { api_host, key, cookie_user } from "../../api.js";
import { alert_succes, alert_warning } from "../../components/messages.js";
import { create_cards_with_search_resoults } from "./create_card_resoult.js"
let url = window.location.href;
//SELECT ELEMENTS
const save_btn = document.querySelector('[data-type-save-list-btn]');
const list_name = document.querySelector('[data-type-get-name]');
const list_description = document.querySelector('[data-type-get-description]');
const list_title = document.querySelector('[data-list-title]');
const form_add_movies = document.querySelector('[data-add-movies]');
const form_create_list = document.querySelector('[data-create-list]');
const items_list = document.querySelector('[data-added-movies]');
const search_movies_input = document.querySelector('[data-type-search-movie]');
const title_items_exist = document.querySelector('[data-alert-no-items-in-list]');

//ASIDE CONTROLS
const btn1 = document.querySelector('#btn_1');
const btn2 = document.querySelector("#btn_2");
const btn3 = document.querySelector("#btn_3");
const list1 = document.querySelector("#list_1");
const list2 = document.querySelector("#list_2");
const list3 = document.querySelector("#list_3");

btn1.addEventListener("click", (event) => {
    event.target.style.color = "red";
    btn2.style.color = "white";
    btn3.style.color = "white";
    list1.style.display = "block";
    list2.style.display = "none";
    list3.style.display = "none";
});
btn2.addEventListener("click", () => {
    event.target.style.color = "red";
    btn1.style.color = "white";
    btn3.style.color = "white";
    list1.style.display = "none";
    list2.style.display = "block";
    list3.style.display = "none";
});
btn3.addEventListener("click", () => {
    event.target.style.color = "red";
    btn1.style.color = "white";
    btn2.style.color = "white";
    list1.style.display = "none";
    list2.style.display = "none";
    list3.style.display = "block";
});
//IF ID OF LIST EXISTS IN URL
let get_query = url.substring(url.indexOf('z=') + 2);
export const get_added_items_from_list = () => {
    fetch(`${api_host}list/${get_query}?api_key=${key}&language=en-US`)
        .then(response => response.json())
        .then(data => set_list_name(data))
        .catch(error => console.log(error))
}
if (url.indexOf("z=") > -1) {
    btn1.style.display = "none";
    btn2.style.color = "red";
    btn3.style.display = "block";
    form_add_movies.style.display = "block";
    get_added_items_from_list()
}
//IF LIST ID DOESEN'T EXIST 
else {
    btn1.style.display = "block";
    btn1.style.color = "red";
    btn2.style.display = "none";
    btn3.style.display = "none";
    form_create_list.style.display = "block";
}
//CREATE NEW LIST
save_btn.addEventListener('click', (event) => {
    event.preventDefault();
    form_add_movies.style.display = "none";
    let get_value_name = list_name.value;
    let get_value_description = list_description.value;
    let body = {
        "name": `${get_value_name}`,
        "description": `${get_value_description}`,
    }
    fetch(`${api_host}list?sort_by=release_date.asc&public=false&api_key=${key}&session_id=${cookie_user}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => alert_user(data))
})
//ALERT USER IF LIST IS CREATED OR NOT
function alert_user(data) {
    if (data.errors == null) {
        console.log(data)
        alert_succes(data.status_message)
        var url1 = new URL(window.location.href);
        url1.searchParams.set('z', data.list_id);
        window.location.replace(url1.toString());
    } else {
        alert_warning(data.errors);
    }
}
//SEARCHING FOR MOVIES TO ADD TO LIST
search_movies_input.addEventListener('keyup', () => {
    let query = search_movies_input.value;
    fetch(`${api_host}search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${query}`)
        .then(response => response.json())
        .then(data => create_cards_with_search_resoults(data.results))
})
//FETCHING ADDED MOVIES TO DISPLAY THEM FROM LIST
function set_list_name(data) {
    console.log(data)
    if (data.items.length > 0) {
        title_items_exist.style.display = "none";
    }
    list_title.innerHTML = `List Name: ${data.name}`;
    data.items.forEach(item => {
        let hr = document.createElement('hr')
        let li = document.createElement('li');
        let title = document.createElement('h4');
        title.innerHTML = item.title;
        let delete_movie_elem = document.createElement('span');
        delete_movie_elem.className = "delete-movie"
        //ADD FUNCTION FOR DELETE MOVIE FROM LIST
        delete_movie_elem.addEventListener('click', (e) => {
            let del_hr = e.target.parentNode.nextElementSibling;
            let del_li = e.target.parentNode;
            delete_movie(item.id, del_hr, del_li);
        })
        li.append(title, delete_movie_elem);
        items_list.append(li, hr)
    })
}
//FUNCTION FOR DELETING MOVIE FROM LIST STILL NOT FINISHED
function delete_movie(id, del_hr, del_li) {
    parseInt(id)
    let body = {
        "media_id": id
    }
    fetch(`${api_host}list/${get_query}/remove_item?api_key=${key}&session_id=${cookie_user}`, {
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
                del_hr.remove();
                del_li.remove();
                alert_succes(data.status_message)
            }
        })
}