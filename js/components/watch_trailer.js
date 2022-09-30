import { api_host, key } from "../api.js";
const button_close = document.getElementById("close");
let regex = /\d+/g;
let url = window.location.href;
let get_query = url.substring(url.indexOf('?') + 1)
var matches = parseInt(get_query.match(regex));
let get_movie_or_tv = get_query.substring(0, get_query.indexOf("/"));
let movie_or_tv;
if (get_movie_or_tv == "movie") {
    movie_or_tv = "movie"
} else {
    movie_or_tv = "tv"
}
export const video = () => {
    fetch(`
${api_host}${movie_or_tv}/${matches}/videos?api_key=${key}&language=en-US`
        , {
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            },
            dataType: 'json',
        })
        .then(response => response.json())
        .then(data => function () {
            add_src(data.results)
        }()
        )
}
function add_src(data) {
    let iframe = document.getElementById("youtube");
    data.map(item => {
        iframe.setAttribute("src", `https://www.youtube.com/embed/${item.key}?enablejsapi=1&html5=1`);
    })
}
//STOP YOUTUBE VIDEO ON CLOSE
button_close.addEventListener('click', () => {
    document.querySelector(".shadow").style.display = "none";

    var stopVideo = function (element) {
        var iframe = document.querySelector('iframe');
        var video = document.querySelector('video');
        if (iframe) {
            iframe.setAttribute("src", '')
            var iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        }
        if (video) {
            video.pause();
        }
    };
    stopVideo()
});