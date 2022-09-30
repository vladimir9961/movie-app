import { api_host, user_id, key, cookie_user } from "../api.js";
import { alert_succes, alert_warning } from "../components/messages.js";

//CHECK IF ALREDY IN WATCHLIST AND DELETE OR POST

export const check_if_id_exist = (param, boolean, show, info_type) => {
    fetch(`${api_host}account/${user_id}/watchlist/${show}?api_key=${key}&language=en-US&session_id=${cookie_user}&sort_by=created_at.asc&page=1`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
    })
        .then(response => response.json())
        .then(data =>
            function () {
                let res = data.results.filter(function (val) {
                    return val.id === param
                })[0];
                if (res == null) {
                    document.querySelector("#watchlist").style.color = "white";
                } else {
                    document.querySelector("#watchlist").style.color = "red";
                }
                if (boolean == true) {
                    if (res == null) {
                        console.log(param);
                        document.querySelector("#watchlist").style.color = "red";
                        create_watchlist(param, true, info_type)
                        alert_succes("You added succesfully!")
                        return;
                    } else {
                        create_watchlist(res.id, false, info_type)
                        document.querySelector("#watchlist").style.color = "white";
                        if (res.title == null) {
                            alert_warning(`You deleted "${res.name}" succesfully!`)
                        } else {
                            alert_warning(`You deleted "${res.title}" succesfully!`)
                        }
                    }
                }
            }())
}
export const create_watchlist = (data, boolean, info_type, element) => {
    let info = {
        "media_type": `${info_type}`,
        "media_id": `${data}`,
        "watchlist": boolean
    }
    fetch(`${api_host}account/${user_id}/watchlist?api_key=${key}&session_id=${cookie_user}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
        body: JSON.stringify(info),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success === true) {
                element.remove()
                alert_warning(`You deleted "${data.status_message}" succesfully!`)
            }
        })
}
