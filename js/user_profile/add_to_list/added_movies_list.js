import { key, api_host } from "../../api.js";
let url = window.location.href;
let get_query = url.substring(url.indexOf('z=') + 2);
let description = document.querySelector('.description');
let user_name = document.querySelector('[data-user-name]');
let list_name = document.querySelector('[data-list-name]');
let main = document.querySelector('[data-added-movies]');
let items = document.querySelector('#items_on_list');
let money = document.querySelector('#money');
let hoursspan = document.querySelector('#hours');
let minutesspan = document.querySelector('#minutes');
let revenue = document.querySelector('#total-revanue');
let average_rate = document.querySelector('#average-rate');
let share = document.querySelector('[data-share]');
let btnEdit = document.querySelector('[data-edit-list]');
let mainDiv = document.querySelector('.list_holder');
let btnAddMovie = document.querySelector('[data-add-movie]');
let counters = document.querySelectorAll('.counter');


btnEdit.addEventListener('click', () => {
    location.href = `../list/`;
})
btnAddMovie.addEventListener('click', () => {
    location.href = `../list/?z=${get_query}`;
})
share.value = url;
//IF ID OF LIST EXIST
if (url.indexOf("z=") > -1) {
    fetch(`${api_host}list/${get_query}?api_key=${key}&language=en-US`)
        .then(response => response.json())
        .then((data) => {
            set_data(data)
            if (data.items != null) {
                create_card(data.items)
            }
        })
        .catch(error => console.log(error))
}
//IF LIST ID DOESEN'T EXIST 
else {
    mainDiv.innerHTML = "There is no list"
}
//USER INFO LIST NAME DESCRIPTION ETC
const set_data = (data) => {
    list_name.innerHTML = data.name;
    user_name.innerHTML = data.created_by;
    if (data.description == "") {
        description.innerHTML = `No description entered.`;
    } else {
        description.innerHTML = `${data.description}`;
    }
    items.dataset.count = data.item_count;
}
//CARDS WITH ADDED MOVIES
const create_card = (data) => {
    data.forEach(item => {
        fetch_h_runtime_average(item.id)
        let title_a = document.createElement('a');
        title_a.innerHTML = `
        <h5 class="card-title text-break">${item.title}</h5>
        <p class="card-text">${item.release_date}</p>
        `
        let card = document.createElement('div');
        card.className = "col-xs-4 card-id poster-card";
        card.id = item.id;
        card.style.width = "auto";

        let card_body = document.createElement('div');
        card_body.className = "card-body";
        card.appendChild(card_body)
        let a = document.createElement('a');
        if (item.media_type === "movie") {
            title_a.href = `../display/?movie/${item.id}`;
            a.href = `../display/?movie/${item.id}`;
        } else {
            title_a.href = `../display/?tv/${item.id}`;
            a.href = `../display/?tv/${item.id}`;
        }
        let img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w220_and_h330_face/${item.backdrop_path}`;
        if (item.backdrop_path === null) {
            img.src = '../../css/img/no_image.jpg';
            img.classList.add('no-img')
        }
        img.classList.add("card-img-top")
        a.appendChild(img)
        card.prepend(a)
        card_body.appendChild(title_a)
        main.appendChild(card)
    })
}
let sumTime = 0;
let sumRevenue = 0;
//FORMAT TIME TO DISPLAY HOURS AND MINUTES
function formatTime(num) {
    let hours = (num / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    hoursspan.dataset.count = rhours;
    minutesspan.dataset.count = rminutes;
    // time.innerHTML = `${rhours}H ${rminutes}M`;
}
//FORMAT REVENUE TO DISPLAY AMOUT
const formatRevenue = n => {
    if (n < 1e3) revenue.dataset.count = n;
    if (n >= 1e3 && n < 1e6) {
        revenue.dataset.count = +(n / 1e3).toFixed(1)
        money.innerHTML = "K";
    }
    if (n >= 1e6 && n < 1e9) {
        revenue.dataset.count = +(n / 1e6).toFixed(1);
        money.innerHTML = "M";
    }
    if (n >= 1e9 && n < 1e12) {
        revenue.dataset.count = +(n / 1e9).toFixed(1);
        money.innerHTML = "B";
    }
    if (n >= 1e12) {
        revenue.dataset.count = +(n / 1e12).toFixed(1);
        money.innerHTML = "T";
    }
};
let average_vote = [];
//GET DETEAILS LIKE HOW MANY HOURS TO WATCH LIST TOTAL REVENUE AVERAGE RATING..
const fetch_h_runtime_average = (data) => {
    let time = [];
    let revenue = [];
    fetch(`${api_host}movie/${data}?api_key=${key}&language=en-US`)
        .then(response => response.json())
        .then((data) => {
            // console.log(data)
            time.push(data.runtime);
            revenue.push(data.revenue);
            for (const key in time) {
                formatTime(sumTime += time[key]);
            }
            for (const key in revenue) {
                formatRevenue(sumRevenue += revenue[key]);
            }
            let average_user_vote = data.vote_average.toString();
            average_vote.push(average_user_vote)
        });
}
setTimeout(() => {
    let result = average_vote.map(function (x) {
        return parseInt(x);
    });
    // console.log(eval(result.join('+')) / result.length)

    const average = result => result.reduce((a, b) => a + b, 0) / result.length;
    average_rate.dataset.count = average(result).toFixed(1);
}, 2000)

// iterate through all the counter elements
setTimeout(() => {
    counters.forEach(counter => {
        function updateCount() {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerHTML;

            const inc = Math.floor((target - count) / 5);

            if (count < target && inc > 0) {
                counter.innerHTML = (count + inc);
                setTimeout(updateCount, 100);
            }
            else {
                counter.innerHTML = target;
            }
        }
        updateCount();
    });
}, 5000);


