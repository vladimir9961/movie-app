import { fetchTvs, fetchTrendingWeek, fetchLatestMovie } from "./fetch_data.js";
import { create_cards } from "./cards/create_card.js";
// POPULAR SECTION
const popular_tv = document.getElementById("popular_tv");
const popular_movie = document.getElementById("popular_movies");
const switchBtnPopular = document.querySelector("[data-switch-popular]");
// TRENDING SECTION
const trendingDay = document.getElementById("trending-day");
const trendingWeek = document.getElementById("trending-week");
const switchBtnTrending = document.querySelector("[data-switch-trending]")
// LATEST SECTION
const latestTv = document.getElementById("latest-tv");
const latestMovie = document.getElementById("latest-movie");
const switchBtnLatest = document.querySelector("[data-switch-latest]")
let popularFetched = false
switchBtnPopular.addEventListener('click', () => {
    if (switchBtnPopular.checked === true) {
        popular_tv.style.display = 'flex';
        popular_movie.style.display = 'none';
        if (popularFetched === false) {
            fetchTvs().then((data) => {
                create_cards(data, "#popular_tv", true);
            });
            popularFetched = true
        }
    } else {
        popular_movie.style.display = 'flex'
        popular_tv.style.display = 'none';

    }
})
let trendingFetched = false
switchBtnTrending.addEventListener('click', () => {
    if (switchBtnTrending.checked === true) {
        trendingWeek.style.display = 'flex'
        trendingDay.style.display = 'none';
        if (trendingFetched === false) {
            fetchTrendingWeek().then((data) => {
                create_cards(data, "#trending-week", true);
            });
            trendingFetched = true
        }
    } else {
        trendingWeek.style.display = 'none'
        trendingDay.style.display = 'flex';
    }
})
let latestFetched = false
switchBtnLatest.addEventListener('click', () => {
    latestMovie.classList.toggle("hide");
    latestTv.classList.toggle("hide");
    if (latestFetched === false) {
        fetchLatestMovie()
        latestFetched = true
    }
});
//DRAG FUNTION FOR SIMILAR AND ACTORS
let isDown = false;
let startX;
let scrollLeft;
document.querySelectorAll('.draggable').forEach(slider => {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        let cardA = document.querySelectorAll('.card-id a')
        cardA.forEach(item => {
            item.classList.remove("prevenet-on-drag")
        })
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        let cardA = document.querySelectorAll('.card-id a')
        cardA.forEach(item => {
            item.classList.remove("prevenet-on-drag")
        })
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        let cardA = document.querySelectorAll('.card-id a')
        cardA.forEach(item => {
            item.classList.add('prevenet-on-drag')
        })
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX);
        slider.scrollLeft = scrollLeft - walk;
    });
})