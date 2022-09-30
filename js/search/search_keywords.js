import { key, api_host } from '../api.js';
import { create_cards } from "../cards/create_card.js";
let url = window.location.href;
let get_query = url.substring(url.indexOf('?') + 1);
// const display = document.querySelector("#display_search");


fetch(`${api_host}search/multi?api_key=${key}&language=en-US&query=${get_query}&page=1&region=US&sort_by=popularity.desc`
    , {
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
    })
    .then(response => response.json())
    .then(data => create_cards(data, "#display_search", true))

// function create_card(value) {
//     console.log(value)

//     let movies = value.results;
//     movies.forEach(movie => {
//         let card = document.createElement('div');
//         card.className = "col-xs-4 me-2";
//         card.style.width = "auto";
//         card.innerHTML = `
//             <div class="card">
//               <img src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}" class="card-img-top" alt="Movie Image">
//               <div class="card-body">
//                 <a href="../display/?movie/${movie.id}"><h5 class="card-title text-break">${movie.title}</h5></a>
//                 <p class="card-text">${movie.release_date}</p>
//               </div>
//               </div>
//                     `
//         display.appendChild(card)
//     });
// }