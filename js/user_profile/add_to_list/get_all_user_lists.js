import { api_host, key, cookie_user, user_id } from "../../api.js";
import { alert_succes, alert_warning } from "../../components/messages.js";
const list_holder = document.querySelector("#list-holder");
let url = window.location.href
let result = url.includes("display");
let regex = /\d+/g;
let get_query = url.substring(url.indexOf('?') + 1);
let matches = parseInt(get_query.match(regex));

if (cookie_user) {
    fetch(`
${api_host}account/${user_id}/lists?api_key=${key}&language=en-US&session_id=${cookie_user}&page=1`)
        .then(response => response.json())
        .then(data => search_resoult_card(data.results))
        .catch(error => console.log(error))
    //Create card with resoults
    function search_resoult_card(results) {
        if (result === false) {
            results.forEach(result => {
                listsPage(result)
            })
        } else {
            results.forEach(result => {
                displayListsPage(result)
            })
        }
    }
}
//DISPLAY ON LIST PAGE
function listsPage(result) {
    const card = document.createElement('div')
    card.className = "card";
    let description = ""
    if (result.description === "") {
        description = "No description"
    } else {
        description = result.description;
    }
    card.innerHTML = `
    <div class="card-body">
    <a href="../../../list_overview/?z=${result.id}">
              <h4 class="text-center">${result.name}</h4>
              <p class="text-center">${result.item_count} items</p>
              <p class="text-center text-muted">${description}</p>
              </a>
            </div>
            `
    document.querySelector('#listsDisplay').appendChild(card);
}
//DISPLAY ON DISPLAY PAGE
function displayListsPage(result) {
    let li = document.createElement('li')
    li.classList = 'list'
    li.setAttribute('id', result.id)
    li.innerHTML = `
        ${result.name} (${result.item_count} item) 
    `
    li.addEventListener('click', (e) => {
        console.log(e.target.id);
        pushToList(e.target.id)
    })
    list_holder.append(li)
}
function pushToList(list_id) {
    let body = {
        "media_id": matches
    }
    fetch(`${api_host}list/${list_id}/add_item?api_key=${key}&session_id=${cookie_user}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        dataType: 'json',
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success === true) {
                alert_succes(data.status_message)
            } else {
                alert_warning(data.status_message)
            }
        })
}