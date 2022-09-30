import { key, api_host } from './api.js';
import { create_cards, create_treiler_cards } from './cards/create_card.js'
const movie_popular = `${api_host}movie/popular?api_key=${key}&language=en-US&page=1`
const tv_popular = `${api_host}tv/popular?api_key=${key}&language=en-US&page=1`;
const day_trending = `${api_host}trending/all/day?api_key=${key}`;
const trendingWeek = `${api_host}trending/all/week?api_key=${key}`;
const latestTv = `${api_host}tv/latest?api_key=${key}&language=en-US`;
const loader = document.querySelector('[data-loader-popular]')
const loaderTrending = document.querySelector('[data-loader-week]');
//FETCH POPULAR MOVIES AND TV'S AND DISPLAY TO USER
Promise.all([
  await fetch(movie_popular)
    .then(value => value.json()),
  await fetch(tv_popular)
    .then(value => value.json()),
  await fetch(day_trending)
    .then(value => value.json()),
  await fetch(latestTv)
    .then(value => value.json())
])
  .then((value) => {
    //CAROUSEREL FETCH TRENDING
    //CARDS POPULAR MOVIES
    create_cards(value[0], "#popular_movies", true);
    //CARDS FETCH TRENDING
    let intervalCalled = false
    if (intervalCalled === false) {
      window.setTimeout(function () {
        create_cards(value[2], "#trending-day", true);
        intervalCalled === true
      }, 2000);
    }
    const loaderBody = document.querySelector(".loader-holder")
    loaderBody.style.display = "none"

  })
//FETCH POPULAR TV'S ON SWITCH BUTTON
export async function fetchTvs() {
  const response = await fetch(tv_popular);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  loader.style.display = 'none';
  const data = await response.json();
  return data
}
// FETCH TRENDING DAY
export async function fetchTrendingWeek() {
  const response = await fetch(trendingWeek);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  loaderTrending.style.display = 'none';
  return data
}
//FETCH TRENDING WEEK
const curentDate = new Date().toLocaleDateString('sv');
const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('sv')
fetch(`${api_host}tv/on_the_air?api_key=${key}&language=en-US&page=1`)
  .then((response) => response.json())
  .then((data) => {
    window.setTimeout(function () {
      const res = data.results.slice(0, 11);
      res.forEach(result => {
        treiler(result.name, "tv", result.backdrop_path, result.id, result.first_air_date, "#latest-tv")
      })
    }, 2000);
  });

export function fetchLatestMovie() {
  fetch(`${api_host}discover/movie?api_key=${key}&region=US&release_date.gte=${sevenDaysAgo}&release_date.lte=${curentDate}
      `)
    .then((response) => response.json())
    .then((data) => {
      const res = data.results;
      res.forEach(result => {
        treiler(result.title, "movie", result.backdrop_path, result.id, result.release_date, "#latest-movie")
      })
    });
}
function treiler(title, media_type, picture, id, year, div) {
  fetch(`${api_host}${media_type}/${id}/videos?api_key=${key}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
      if (data.results[0] != undefined) {
        create_treiler_cards(title, media_type, picture, id, year, data.results[0].key, div)
      }
    }
    );
}



