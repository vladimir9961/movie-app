import { api_host, user_id, key, cookie_user } from "../js/api.js";
import { create_cards } from "../js/cards/create_card.js";

const queryString = window.location.search;
let get_query = queryString.substring(queryString.indexOf('?') + 1);
let url = window.location.href
// let pagination = url.substring(url.indexOf('#') + 1);
let result = url.includes("movies");
let movie_or_tv = "";
let genres_ul = document.querySelector('[data-genres]')
let btn_search_genres = document.querySelector('[data-search-by-genres]');
let options_sort_by = document.querySelector('[data-sort-resoults]')

//CHECK URL IF IT IS MOVIE OR TV AND RETURN TRUE OR FALSE
if (result === true) {
    movie_or_tv = "movie";
} else {
    movie_or_tv = "tv";
}
if (get_query === "") {
    get_query = "popular"
}
//GET MOVIES OR TV'S
//LOAD 20 MORE MOVIES ON SCROLLED TO BOTTOM
let pagination = 1;
let loadMoreBtn = document.querySelector('[data-load-more]');
let searchWithGenres = false;
let totalNumberOfPages = 0;
let btnScroll = document.querySelector('.btn-scroll');

// ADD INFINITE SCROLL
function handleInfiniteScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 5) {
        if (pagination <= totalNumberOfPages) {
            pagination++;
            loadMoreBtn.style.display = "block";
            btnScroll.style.display = "block";
            if (searchWithGenres === false) {
                getData()
                window.removeEventListener("scroll", handleInfiniteScroll);
            } else {
                filters_search()
            }
        }
    }
}
//FETCH ON LOAD AND SCROLL TO BOTTOM
async function getData() {
    fetch(`${api_host}${movie_or_tv}/${get_query}?api_key=${key}&language=en-US&page=${pagination}`)
        .then(response => response.json())
        .then((data) => {
            loadMoreBtn.style.display = 'none';
            create_cards(data, "#show", true);
            totalNumberOfPages = data.total_pages;
            window.addEventListener("scroll", handleInfiniteScroll);
        });
}
getData()
getData()


//GET GENRES FOR MOVIES OR TV'S
let genre_id = 0;
let array = Array();
fetch(`${api_host}genre/${movie_or_tv}/list?api_key=${key}&language=en-US&${pagination}`)
    .then(response => response.json())
    .then((data) => {
        create_genres_items(data.genres);
    });
//FUNCTIONALITY FOR GENRES
function create_genres_items(genres) {
    genres.forEach(genre => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerHTML = genre.name;
        a.href = 'javascript:void(0)'
        a.id = genre.id;
        //EVENT LISTER FOR GENRE TABS
        a.addEventListener('click', (e) => {
            let parent = e.target.parentElement;
            let id = e.target.id;
            //ADD ACTIVE CLASS TO SELECTED ELEMENT AND CHECK IF GENRE ID IS ALREDY ADDED INTO ARRAY
            if (parent.className === "active-genre") {
                parent.className = "";
                btn_search_genres.style.display = "block";

                const index = array.indexOf(id);
                if (index > -1) {
                    array.splice(index, 1);
                };
            }
            //IF GENRE DOESN'T EXIST IN ARRAY ADD IT
            else {
                array[genre_id] = id;
                genre_id++
                parent.className = "active-genre";
                btn_search_genres.style.display = "block";
            }
        })
        li.appendChild(a)
        genres_ul.appendChild(li)

    })
};
//BUTTON FOR DISPLAY GENRES SELECTED

//CALENDARS
const aYearFromNow = new Date();
let date_start = "2020-01-02";
let date_end = "";
let calendar = document.querySelector('#calendar-start')
date_end = aYearFromNow.toISOString().substring(0, 10);
//SET TODAY DATE TO CALENDAR FROM
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
calendar.value = new Date().toDateInputValue();

//GET DATE IF IT IS SET
calendar.value = ""
calendar.addEventListener("input", get_date_calendar);
function get_date_calendar() {
    date_start = calendar.value;
    if (date_start != "") {
        btn_search_genres.style.display = "block";
    }
}
//SET 1 YEAR ADVANCE ON CALENDAR TO
let calendar_end = document.querySelector('#calendar-end')
let year = aYearFromNow.getFullYear() + 1;
calendar_end.value = `${year}-01-02`;
calendar_end.addEventListener("input", get_date_to);

function get_date_to() {
    date_end = calendar_end.value;
    console.log(date_end)
    if (date_end != "") {
        btn_search_genres.style.display = "block";
    }
}
//USER SCORE SEARCH FILTER
let user_vote_top = "";
let user_vote_low = "";
let user_score_filter_right = document.getElementById('range-user-score-right');
user_score_filter_right.addEventListener('mouseup', (e) => {
    btn_search_genres.style.display = "block";
    user_vote_top = e.target.value;
})
let user_score_filter_left = document.getElementById('range-user-score-left');
user_score_filter_left.addEventListener('mouseup', (e) => {
    btn_search_genres.style.display = "block";
    user_vote_low = e.target.value;
})
//SORT BY 
options_sort_by.addEventListener('click', () => {
    btn_search_genres.style.display = "block";
})
let values = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];    //values to step to

//MINIMUM USERS VOTE
let input = document.getElementById('input'),
    output = document.getElementById('output');
let user_vote_min = 0
input.oninput = function () {
    output.innerHTML = values[this.value];
    this.addEventListener("click", () => {
        user_vote_min = values[this.value]
        console.log(user_vote_min);
    })
    this.addEventListener("click", () => {
        btn_search_genres.style.display = "block";
    })
};
input.oninput();

//RUNTIME FILTER
let runtime_top = 390;
let runtime_low = 0;
document.getElementById('runtime-left').addEventListener('mouseup', (e) => {
    btn_search_genres.style.display = "block";
    runtime_top = e.target.value;
    console.log(e.target.value);
})
document.getElementById('runtime-right').addEventListener('mouseup', (e) => {
    btn_search_genres.style.display = "block";
    runtime_low = e.target.value;
    console.log(e.target.value);
})

//BUTTON FOR SEARCH WITH FILTERS
btn_search_genres.addEventListener('click', (e) => {
    searchWithGenres = true;
    document.getElementById("show").innerHTML = "";
    e.target.style.display = "none";
    filters_search()
})

function filters_search() {
    let sort_by = options_sort_by.value;
    fetch(`${api_host}discover/${movie_or_tv}?api_key=${key}&sort_by=${sort_by}&include_adult=false&include_video=false&page=${pagination}&release_date.gte=${date_start}&release_date.lte=${date_end}&vote_count.lte=${user_vote_min}&vote_average.gte=${user_vote_low}&vote_average.lte=${user_vote_top}&with_genres=${array}&with_runtime.gte=${runtime_low}&with_runtime.lte=${runtime_top}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log(sort_by, pagination, date_start, date_end, user_vote_min, user_vote_low, user_vote_top, array, runtime_low, runtime_top);
            create_cards(data, "#show", true);
            totalNumberOfPages = data.total_pages;
            date_start = "";
            loadMoreBtn.style.display = "none";
        });
}