import { key, api_host, cookie_user } from '../api.js';
import { check_if_id_exist } from "../user_profile/watchlist_fetch.js";
import { check_if_id_exist_favorite } from "../user_profile/favorite_fetch.js";
import { dropdown_stars } from "../cards/create_card.js";
import { rate, delete_rate } from "../user_profile/rate.js";
import { video } from "../components/watch_trailer.js";
// import { add_to_list } from "../user_profile/add_to_list.js";
// add_to_list();
let regex = /\d+/g;
let display_div = document.querySelector("#background-img");
let url = window.location.href;
let get_query = url.substring(url.indexOf('?') + 1);
let matches = parseInt(get_query.match(regex));
let get_movie_or_tv = get_query.substring(0, get_query.indexOf("/"));
const similarDiv = document.querySelector("#similar");
const actorsDiv = document.querySelector("#actors");
const title_span = document.querySelector("#title");
const year_span = document.querySelector("#year");
const genres = document.querySelector("#genres");
const full_time = document.querySelector("#full_time");
const tagline = document.querySelector("#tagline");
const overview = document.querySelector("#overview");
const average_vote = document.querySelector("#average_vote");
const watchlist = document.querySelector("#watchlist");
const favorite = document.querySelector("#favorite");
const rate_item = document.querySelector("#stars");
const trailer_btn = document.querySelector("#trailer_btn");
const add_to_list_button = document.querySelector("#add_to_list");
const dropdownList = document.querySelector("[data-toggle-display]");
const btn_list = document.querySelector("#btn_list");
const list_holder = document.querySelector("#list-holder");
const loaderBody = document.querySelector(".loader-holder")

//TOOGLE BUTTON
add_to_list_button.addEventListener('click', () => {
    dropdownList.classList.toggle('hide');
})
btn_list.addEventListener('click', () => {
    list_holder.classList.toggle("hide")
})
fetch(`${api_host}${get_query}?api_key=${key}&language=en-US`
    , {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
    })
    .then(response => response.json())
    .then(data => function () {
        if (get_movie_or_tv == "movie") {
            createDiv(data, "movie")
            info_elements(data, "movie")
        } else {
            createDiv(data, "tv")
            info_elements(data, "tv")
        }
    }()
    )
// GET SIMILAR MOVIES
fetch(`${api_host}${get_query}/similar?api_key=${key}&language=en-US&page=1`)
    .then(response => response.json())
    .then(data => similarCards(data.results))

function similarCards(resoults) {
    resoults.forEach(similar => {
        let div = document.createElement("div");
        div.classList = 'card'

        if (similar.title === undefined) {
            let a = document.createElement("a");
            a.href = `../../display/?tv/${similar.id}`;
            a.innerHTML = ` <img src="https://image.tmdb.org/t/p/w300${similar.backdrop_path}" width="50" height="auto">`;

            let overlay = document.createElement("div");
            overlay.classList = 'card-img-overlay'
            overlay.innerHTML = `
            <h5>${similar.name}</h5>
        `
            div.append(a, overlay)
        } else {
            let a = document.createElement("a");
            a.href = `../../display/?movie/${similar.id}`;
            a.innerHTML = ` <img src="https://image.tmdb.org/t/p/w300${similar.backdrop_path}" width="50" height="auto">`;
            let overlay = document.createElement("div");
            overlay.classList = 'card-img-overlay'
            overlay.innerHTML = `
            <h5>${similar.title}</h5>
        `
            div.append(a, overlay)
        }
        similarDiv.append(div)
    })
}
// GET ACTORS 
fetch(`${api_host}${get_query}/credits?api_key=${key}&language=en-US`
    , {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
    })
    .then(response => response.json())
    .then((data) => {
        let e = data.cast.slice(0, 10)
        actors(e)
    })
function actors(data) {
    data.forEach(element => {
        let div = document.createElement('div');
        div.innerHTML = `
            <div class="card" style="width: 5rem;">
            <a href="../../person/?z=${element.id}">
                <div>
                <img src="https://image.tmdb.org/t/p/w300${element.profile_path}">
                </div>
                </a>

                <div class="card-body">
                <p class="card-title">${element.name}</p>
                </div>
                </div>
            `
        actorsDiv.append(div)
    });
}
function createDiv(data, movie_tv) {
    let posterImg = document.createElement('img');
    // posterImg.src = `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
    posterImg.classList = 'card-img-top'
    display_div.style.background = `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')`;
}
//CONVER MINUTES TO HOUR/MINUTES
const convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    let hour = `${h}h ${m}m`
    return hour;
}
if (cookie_user) {
    if (get_movie_or_tv == "movie") {
        check_if_id_exist_favorite(matches, false, "movies", "movie");
        check_if_id_exist(matches, false, "movies", "movie")
    } else {
        check_if_id_exist_favorite(matches, false, "tv", "tv");
        check_if_id_exist(matches, false, "tv", "tv")
    }
}

//CREATE INFO ELEMENTS
function info_elements(data, movie_tv) {
    //CHECK IF IT IS MOVIE OR TV AND POPULATE INFO BASED ON THAT
    if (movie_tv == "movie") {
        //ADD EVENT LISTER FOR FAVORITE
        if (cookie_user) {
            favorite.addEventListener('click', () => {
                check_if_id_exist_favorite(data.id, true, "movies", "movie");
            });
            //ADD EVENT LISTER FOR WATCHLIST
            watchlist.addEventListener('click', () => {
                check_if_id_exist(data.id, true, "movies", "movie");
            });
        }
        //TITLE AND YEAR OF RELEASE
        title_span.innerHTML = data.original_title;
        let year = data.release_date.slice(0, 4);
        year_span.innerHTML = `${year}`;
        //TAGLINE
        tagline.innerHTML = data.tagline;
        //FULL YEAR GENRES AND FULL TIME OF MOVIE
        full_time.innerHTML = convertMinsToHrsMins(data.runtime);
    } else {
        //ADD EVENT LISTER FOR FAVORITE
        favorite.addEventListener('click', () => {
            check_if_id_exist_favorite(data.id, true, "tv", "tv");
        });
        //ADD EVENT LISTER FOR WATCHLIST
        watchlist.addEventListener('click', () => {
            check_if_id_exist(data.id, true, "tv", "tv");
        });
        //TITLE AND YEAR OF RELEASE
        title_span.innerHTML = data.name;
        let year = data.first_air_date.slice(0, 4);
        year_span.innerHTML = `${year}`;
        //TAGLINE
        tagline.innerHTML = data.original_name;
    }
    //APPENDING IMAGE POSTER TO INFO DIV
    trailer_btn.addEventListener('click', () => {
        video()
        let iframe = document.querySelector(".shadow");
        iframe.style.display = "grid";
    })
    //LOOP TROUGH GENRES AND APPEND THEM TO DIV
    data.genres.forEach(genre => {
        let a = document.createElement("a")
        a.href = genre.id
        a.innerHTML = `${genre.name} \xa0 `
        genres.appendChild(a)

    });
    //OVERVIEW
    overview.innerHTML = data.overview;
    //INTERACTIONS
    average_vote.innerHTML = parseFloat(data.vote_average).toFixed(1) + " | " + data.vote_count;

    if (cookie_user) {
        rate_item.append(dropdown_stars())

        function star_value(id, value) {
            rate(id, value, movie_tv);
        }
        rate_item.onclick = function (e) {
            if (e.target.nodeName === 'INPUT') return;
            else if (e.target.nodeName === 'SPAN') {
                delete_rate(data.id, movie_tv)
            }
            else {
                star_value(data.id, e.target.title);
            }
        };
    }
}
//REWIEVS
const comments = document.querySelector('#reviews')
function fetchReview() {
    fetch(`${api_host}${get_query}/reviews?api_key=${key}&language=en-US&page=1`)
        .then(response => response.json())
        .then((data) => {
            function isEmpty(data) {
                return Object.keys(data.results).length === 0;
            }
            if (isEmpty(data) === false) {
                data.results.forEach(result => {
                    rewievFunc(result)
                })
            } else {
                document.querySelector("#no_review").style.display = "block"
            }
        })
}
//USER REVIEW
function rewievFunc(data) {
    let div = document.createElement('div');
    div.classList = 'card mb-3 col-md-6';
    div.setAttribute('id', 'user-review')

    let imgHolder = document.createElement('div');
    imgHolder.classList = 'profile-image-holder';
    let img = document.createElement('img');
    img.classList = 'card-img-top';
    if (data.author_details.avatar_path === null) {
        img.src = "../../css/img/avatar.png"
    } else {
        if (data.author_details.avatar_path.includes('https://www.gravatar.com')) {
            let badUrl = data.author_details.avatar_path
            badUrl = badUrl.substring(1);
            img.src = badUrl;
        } else {
            let noUrl = `https://www.gravatar.com/avatar/${data.author_details.avatar_path}`
            img.src = noUrl;
        }
    }
    img.setAttribute('id', 'user-logo')

    imgHolder.append(img)

    let body = document.createElement('div');
    body.classList = 'card-body';

    const user_rev_name = document.createElement('h5');
    user_rev_name.classList = 'card-title';
    user_rev_name.innerHTML = `A review by ${data.author} <span id="rating-user">${data.author_details.rating}</span>`;

    let createdAt = data.created_at.slice(0, 10);
    const postedAt = document.createElement('p');
    postedAt.classList = 'card-text';
    postedAt.innerHTML = `
    <small class="text-muted">Written by ${data.author} on ${createdAt}</small>
    `;
    const comment = document.createElement('p');
    comment.classList = 'card-text';
    let text = data.content.replaceAll("\r\n\r\n", "<hr>")
    comment.innerHTML = text;
    body.append(user_rev_name, postedAt, comment)
    div.append(imgHolder, body);
    comments.append(div)
}
document.querySelector('#review_btn').addEventListener('click', () => {
    fetchReview()
    document.querySelector("#coments").style.display = "grid"
})
document.querySelector('#close_comments').addEventListener('click', () => {
    document.querySelector("#coments").style.display = "none"
})

document.addEventListener("DOMContentLoaded", () => {
    loaderBody.style.display = "none"
});
//DRAG FUNTION FOR SIMILAR AND ACTORS
const slider = document.querySelector('#similar');
let isDown = false;
let startX;
let scrollLeft;


slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    let cardA = document.querySelectorAll('.card a')
    cardA.forEach(item => {
        item.classList.remove("prevenet-on-drag")
    })
    slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
    isDown = false;
    let cardA = document.querySelectorAll('.card a')
    cardA.forEach(item => {
        item.classList.remove("prevenet-on-drag")
    })
    slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    let cardA = document.querySelectorAll('.card a')
    cardA.forEach(item => {
        item.classList = 'prevenet-on-drag'
    })
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX);
    slider.scrollLeft = scrollLeft - walk;
});