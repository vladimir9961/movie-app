
import { check_if_id_exist_favorite } from "../user_profile/favorite_fetch.js";
import { rate, alredy_rated, delete_rate } from "../user_profile/rate.js";
import { key, api_host } from '../api.js';
let elements = document.getElementsByClassName('trailer-card');
let divHover = document.querySelector('.hover-img')
//CREATE CARDS TO DISPLAY POPULAR MOVIES/TV'S
//CREATE WATCHLIST

//DROP DOWN WITH STARS RATING
export function dropdown_stars(id) {
    let stars_container = document.createElement('fieldset');
    stars_container.className = "rate rate-container";
    stars_container.id = id;
    stars_container.innerHTML = `
    <input class="rate" type="radio" id="rating10" name="rating" value="10"  /><label for="rating10" title="10"></label>
    <input class="rate" type="radio" id="rating9" name="rating" value="9" /><label class="half" for="rating9"title="9"></label>
    <input class="rate" type="radio" id="rating8" name="rating" value="8" /><label for="rating8" title="8"></label>
    <input class="rate" type="radio" id="rating7" name="rating" value="7" /><label class="half" for="rating7"title="7"></label>
    <input class="rate" type="radio" id="rating6" name="rating" value="6" /><label for="rating6" title="6"></label>
    <input class="rate" type="radio" id="rating5" name="rating" value="5" /><label class="half" for="rating5"title="5"></label>
    <input class="rate" type="radio" id="rating4" name="rating" value="4" /><label for="rating4" title="4"></label>
    <input class="rate" type="radio" id="rating3" name="rating" value="3" /><label class="half" for="rating3"title="3"></label>
    <input class="rate" type="radio" id="rating2" name="rating" value="2" /><label for="rating2" title="2"></label>
    <input class="rate" type="radio" id="rating1" name="rating" value="1" /><label class="half" for="rating1"title="1"></label>
    `
    let unrate = document.createElement('span');
    unrate.className = "unrate";
    unrate.title = "0";
    unrate.setAttribute("id", "unrate");



    stars_container.onclick = function (e) {
        if (e.target.nodeName === 'INPUT') return;
        else if (e.target.nodeName === 'SPAN') {
            // delete_rate(id)
        }
        else {
            // star_value(id, e.target.title);
        }
    };


    stars_container.appendChild(unrate)

    alredy_rated()
    return stars_container
}
//Create favorite
function favorite(value) {
    // check_if_id_exist_favorite(value.id, false)

    let favorite = document.createElement("a");
    favorite.className = "dropdown-item";
    favorite.id = "favorite";
    favorite.innerHTML = "Favorite";
    favorite.onclick = function (e) {
        let a = e.target.parentNode
        let b = a.parentNode
        let c = b.parentNode
        let d = c.parentNode
        if (d.id == "popular_movies") {
            check_if_id_exist_favorite(value.id, true, "movies", "movie");
        } else {
            check_if_id_exist_favorite(value.id, true, "tv", "tv");
        }
    };
    return favorite
}
//DROPDOWN FOR CARDS
// export function create_dropdown_for_card(value) {
//     let dropdown = document.createElement("li");
//     dropdown.className = "nav-item dropdown options";
//     let ul = document.createElement("ul");
//     ul.className = "dropdown-menu";
//     ul.id = "dropdown_holder"
//     let hr = document.createElement("hr");
//     hr.className = "dropdown-divider";

//     //Add to list
//     let add_to_list = document.createElement("a");
//     add_to_list.className = "dropdown-item";
//     add_to_list.id = "add-to-list";
//     add_to_list.innerHTML = "Add to list";
//     add_to_list.onclick = function (e) {
//         create_list(value.id);
//         e.target.classList.add('active');
//     };
//     //Create watchlist
//     let watchlist = document.createElement("a");
//     watchlist.className = "dropdown-item";
//     watchlist.id = "watchlist";
//     watchlist.innerHTML = "Watchlist";
//     watchlist.onclick = function (e) {
//         add_to_watchlist(value.id);
//         e.target.classList.toggle('active');
//     };

//     //Rating
//     let rating = document.createElement("a");
//     rating.className = "dropdown-item";
//     rating.id = "rating";
//     rating.innerHTML = "";
//     rating.append(dropdown_stars(value.id))
//     function star_value(id, value) {
//         rate(id, value);
//     }
//     rating.onclick = function (e) {
//         if (e.target.nodeName === 'INPUT') return;
//         else if (e.target.nodeName === 'SPAN') {
//             delete_rate(value.id)
//         }
//         else {
//             star_value(value.id, e.target.title);
//         }
//     };
//     ul.append(add_to_list, hr.cloneNode(true), favorite(value), hr.cloneNode(true), watchlist, hr.cloneNode(true), rating)

//     dropdown.innerHTML = `
//     <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"><i class="bi bi-three-dots"></i></a>
// `

//     dropdown.appendChild(ul);
//     return dropdown
// }

// EXPORT CREATED CARD WITH DROPDOWN
export function create_cards(value, div, path) {
    let popularMovies = value.results.slice(0, 11);
    const popular_movies_div = document.querySelector(div);
    let movies = popularMovies;
    movies.forEach(movie => {
        let card = document.createElement('div');
        card.className = "col-xs-4 card-id";
        card.id = movie.id;
        card.style.width = "auto";

        let card_body = document.createElement('div');
        card_body.className = "card-body";
        card.appendChild(card_body)

        if ("title" in movie) {
            let a = document.createElement('a');
            a.href = `../display/?movie/${movie.id}`;

            let img = document.createElement('img');
            if (movie.poster_path != null) {
                if (path === true) {
                    img.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
                } else {
                    img.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
                }
            } else {
                img.src = '../../css/img/no_image.jpg';
                img.classList.add('no-img')
            }

            img.classList.add("card-img-top")
            a.appendChild(img)
            let vote = parseFloat(parseFloat(movie.vote_average).toFixed(2))
            a.appendChild(create_canvas(vote))
            card.prepend(a)

            let title_a = document.createElement('div');
            let year = movie.release_date.slice(0, 4)
            title_a.innerHTML = `
            <div class="title-holder">
            <h5 class="card-title text-break">${movie.title}</h5></div>
            <div class="text-holder">
            <p class="card-text">${year}</p>
            <div>
            `
            card_body.appendChild(title_a)

        } else {
            let a = document.createElement('a');
            a.href = `../display/?tv/${movie.id}`;
            let img = document.createElement('img');
            if (path === true) {
                img.src = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
            } else {
                img.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
            }
            img.className = "card-img-top"
            a.appendChild(img)
            card.prepend(a)
            let vote = parseFloat(parseFloat(movie.vote_average).toFixed(1))
            a.appendChild(create_canvas(vote))
            let title_a = document.createElement('div');
            let year = movie.first_air_date.slice(0, 4)

            title_a.innerHTML = `
            <div class="title-holder">
            <h5 class="card-title text-break">${movie.name}</h5>
            </div>
            <div class="text-holder">
            <p class="card-text">${year}</p>
            </div>
            `
            card_body.appendChild(title_a)
        }
        if (window.location.href.indexOf("watchlist") != -1) {
            let overview = document.createElement("p");
            overview.classList.add("overview")
            overview.innerHTML = movie.overview
            card.appendChild(overview)
        }
        // card.prepend(create_dropdown_for_card(movie))
        popular_movies_div.appendChild(card)

    });
}
//CREATEING CARDS FOR TRAILERS
export function create_treiler_cards(title, media_type, picture, id, year, treiler, div) {
    const popular_movies_div = document.querySelector(div);
    let card = document.createElement('div');
    card.className = "col-xs-4 card-id trailer-card";
    card.id = id;
    card.style.width = "auto";

    let card_body = document.createElement('div');
    card_body.className = "card-body";
    card.appendChild(card_body)

    let a = document.createElement('a');
    // a.href = `../display/?tv/${id}`;
    let img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w780${picture}`;
    if (divHover.style.backgroundImage.length === 0) {
        divHover.style.background = `url(https://image.tmdb.org/t/p/w1280${picture})`;
    }

    let playBtn = document.createElement('div');
    playBtn.setAttribute('data-id', `${treiler}`);
    playBtn.classList = 'play'
    playBtn.addEventListener('click', (e) => {
        let youtubeKey = e.target.getAttribute('data-id');
        let shadow = document.querySelector('.shadow');
        shadow.style.display = "grid"
        const youtube = document.querySelector('#youtube')
        youtube.setAttribute("src", `https://www.youtube.com/embed/${youtubeKey}?enablejsapi=1&html5=1`);

    })
    img.className = "card-img-top";
    playBtn.appendChild(img)
    a.appendChild(playBtn)
    card.prepend(a)

    let date = year.slice(0, 4)
    card_body.innerHTML = `
    <a href="../display/?${media_type}/${id}">
    <div class="title-holder">
            <h5 class="card-title text-break">${title}</h5>
            </div>
            <div class="text-holder">
            <p class="card-text">${date}</p>
            </div>
            </a>
            `
    //HOVER FOR TREILER CARDS
    popular_movies_div.appendChild(card);

    for (let i = 0; i < elements.length; i++) {
        elements[i].onmouseover = function () {
            let imgSrc = elements[i].firstElementChild.firstElementChild.firstElementChild.src;
            let replaceUrl = imgSrc.replace("w500", "w1280")
            divHover.style.background = `url(${replaceUrl})`;
        };
    }
}
// CANVAS WITH USER RATE
export function create_canvas(vote) {
    let canvas_div = document.createElement('div');
    canvas_div.id = "canvas-div"
    let canvas = document.createElement('canvas');
    let span = document.createElement('span');
    let canvas_rate = vote.toString();
    let canvas_param = canvas_rate.replace('.', '');

    let final_vote = canvas_param
    canvas.id = "progress-circle"
    canvas.style.background = `radial-gradient(rgb(13, 13, 15) 57%, transparent 61%),
    conic-gradient(transparent ${final_vote}%, gainsboro ${final_vote}%),
    conic-gradient(rgb(235, 28, 36), rgb(235, 28, 36))
`
    let small = document.createElement('small');
    small.innerHTML = "%";

    span.innerHTML = final_vote
    span.append(small)

    canvas_div.append(canvas, span)

    return canvas_div
}

