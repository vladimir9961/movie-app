import { api_host, key } from "../api.js";

let url = window.location.href;
let get_query = url.substring(url.indexOf('=') + 1);


const person_div = document.querySelector('[data-type-person]');
const person_img = document.querySelector('[data-image]');
const person_known_for = document.querySelector('[data-known-for]');
let include = url.includes("?z=");

//IF THERE IS ID PERSON SHOW PERSON ELSE SHOW POPULAR PERSONS
if (include === true) {
    fetch(`
    ${api_host}person/${get_query}?api_key=${key}&language=en-U`)
        .then(response => response.json())
        .then((data) => {
            person_preview(data);

        });
} else {
    fetch(`
    ${api_host}person/popular?api_key=${key}&language=en-US&page=1`)
        .then(response => response.json())
        .then((data) => {
            data.results.forEach(element => {
                create_person_cards(element)
            });
        });
}
//CREATE CARDS WITH POPULAR PERSONS
function create_person_cards(data) {
    let card = document.createElement('div');
    card.classList = "col-xs-4 me-2 card-id mr-2";
    card.style.width = 'auto';

    let card_body = document.createElement('div');
    card_body.classList = "card-body";
    let a = document.createElement('a');
    a.href = `?z=${data.id}`

    let img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w220_and_h330_face/${data.profile_path}`

    let name = document.createElement('span');
    name.innerHTML = data.name;

    let desc = document.createElement('p');

    data.known_for.forEach(element => {
        if ('original_name' in element) {
            desc.innerHTML = element.name;
        } else {
            desc.innerHTML = element.title;
        }

    });

    a.append(img);
    card_body.appendChild(name, desc);
    card.append(a, card_body)
    person_div.append(card)
}
//PERSON IFORMATION LIKE AGE ETC...
function person_preview(data) {
    document.querySelector("#person-info").style.display = "flex"
    let img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w220_and_h330_face/${data.profile_path}`
    person_known_for.innerHTML = data.known_for_department;
    if (data.gender === 2) {
        document.querySelector('[data-gender]').innerHTML = "Male"
    } else {
        document.querySelector('[data-gender]').innerHTML = "Female"
    }
    document.querySelector('[data-birthday]').innerHTML = data.birthday
    document.querySelector('[data-birth-place]').innerHTML = data.place_of_birth;
    document.querySelector('[data-known-as]').innerHTML = data.also_known_as;

    document.querySelector('[data-person-name]').innerHTML = data.name;
    document.querySelector('[data-biography]').innerHTML = data.biography
    knowFor()
    person_img.appendChild(img)
}
//FETCHIN MOVIES OR TV'S PERSON PLAYED

function knowFor() {
    fetch(`
    ${api_host}person/${get_query}/combined_credits?api_key=${key}`)
        .then(response => response.json())
        .then((data) => {
            acting(data.cast);

            crew(data.crew)
        });
}
//MAKE TABLE WITH ALL ACTING DATA
function acting(data) {
    data.sort(function (a, b) {
        var dateA = new Date(a.release_date || a.first_air_date), dateB = new Date(b.release_date || b.first_air_date)
        return dateB - dateA
    });

    const div = document.querySelector('[data-acting]');
    const thisYear = document.querySelector('[data-this-year]');

    data.forEach(element => {

        const parent = document.createElement('tr');
        if ('release_date' in element) {
            const a = element.release_date.slice(0, 4)
            let child = document.createElement('td')
            if (element.release_date === "") {
                child.innerHTML = '-';
                child.classList = 'first-child';
                thisYear.append(child)
                console.log(child.parentElement.nodeName)

            } else {
                child.innerHTML = a
                parent.append(child)
            }
        } else {
            const a = element.first_air_date.slice(0, 4)
            let child = document.createElement('td')
            if (element.first_air_date === "") {
                child.innerHTML = '-';
                // let b = child.parentElement.closest
                child.classList = 'first-child';
                // console.log(b)
                thisYear.append(child)


            } else {
                child.innerHTML = a
                parent.append(child)

            }

            parent.append(child)

        }
        if ('original_title' in element) {

            let child = document.createElement('td')
            child.innerHTML = element.original_title
            parent.append(child)

        } else {

            let child = document.createElement('td')
            child.innerHTML = element.original_name
            parent.append(child)

        }

        let child = document.createElement('td')
        child.innerHTML = "as " + element.character +
            parent.append(child)
        div.append(parent)


    });
}
const div = document.querySelector('[data-cast]');
function crew(data) {
    //SORTING DATA BY YEARS OF RELEASE OR FIRST TIME ON TV
    data.sort(function (a, b) {
        var dateA = new Date(a.release_date || a.first_air_date), dateB = new Date(b.release_date || b.first_air_date)
        return dateB - dateA
    });
    // SORTING BY YEAR 
    data.sort((a, b) => (a.department > b.department) ? 1 : (a.department === b.department) - 1)
    //GETTING DEPARTMANTS SO THAT CAN BE FILTERED IN FILTER DEPARTMANTS FUNCTION
    const groupBy = (key) => data.sort((a, b) => a[key].localeCompare(b[key])).reduce((total, currentValue) => {
        const newTotal = total;
        if (
            total.length &&
            total[total.length - 1][key] === currentValue[key]
        )
            newTotal[total.length - 1] = {
                ...total[total.length - 1],
                ...currentValue,
                Value: parseInt(total[total.length - 1].Value) + parseInt(currentValue.Value),
            };
        else newTotal[total.length] = currentValue;
        return newTotal;
    }, []);

    //GET ALL DEPARTMANTS SO TABLES CAN BE CREATED
    function groupBydepartmants() {
        let getDepartmants = groupBy('department')
        getDepartmants.forEach(department => {
            const h1 = document.createElement('h1');
            h1.innerHTML = department.department;

            const table = document.createElement('table');
            table.className = 'table';
            table.id = department.department;
            div.append(h1, table)

            filterByDepartmants(department.department)
        })

    }

    groupBydepartmants()
    //FILTER DEPARTMANTS FOR EACH ONE
    function filterByDepartmants(department) {

        const results = data.filter(entry => entry.department === `${department}`);
        createTablesWithDepartmants(results)

        function createTablesWithDepartmants(filtered) {

            filtered.forEach(element => {
                let childTable = div.querySelector('#' + element.department)
                let tableId = childTable.id

                if (tableId === element.department) {
                    childTable.append(createTable(element))

                }
            })
        }

    }

    function createTable(data) {
        let tbody = document.createElement('tbody');
        let tr = document.createElement('tr');
        let year = document.createElement('td');
        let title = document.createElement('td');
        let job = document.createElement('td')


        if (data.release_date === undefined) {
            const a = data.first_air_date.slice(0, 4)
            year.innerHTML = a;
        } else {
            const a = data.release_date.slice(0, 4)

            year.innerHTML = a

        }
        title.innerHTML = data.original_title;
        if (data.original_title === undefined) {
            title.innerHTML = data.name;
        }
        job.innerHTML = data.job;

        tr.append(year, title, job)
        tbody.appendChild(tr)
        return tbody
    }

}
