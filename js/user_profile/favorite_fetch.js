import { api_host, user_id, key, cookie_user } from "../api.js";
import { alert_succes, alert_warning } from "../components/messages.js";

export const check_if_id_exist_favorite = (param, boolean, show, info_type) => {
    fetch(`
    ${api_host}account/${user_id}/favorite/${show}?api_key=${key}&session_id=${cookie_user}&language=en-US&sort_by=created_at.asc&page=1`, {
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
    })
        .then(response => response.json())
        .then(data =>
            function () {
                var res = data.results.filter(function (val) {
                    return val.id === param
                })[0];
                if (res == null) {
                    document.querySelector("#favorite").style.color = "white";
                } else {
                    document.querySelector("#favorite").style.color = "pink";
                }
                if (boolean == true) {
                    if (res == null) {
                        create_favorite(param, true, info_type)
                        document.querySelector("#favorite").style.color = "pink";
                        alert_succes("You added succesfully!")
                        return;
                    } else {
                        create_favorite(res.id, false, info_type)
                        document.querySelector("#favorite").style.color = "black";
                        if (res.title == null) {
                            alert_warning(`You deleted "${res.name}" succesfully!`)
                        } else {
                            alert_warning(`You deleted "${res.title}" succesfully!`)
                        }

                    }
                }
            }())
}

export const create_favorite = (data, boolean, info_type) => {
    let info = {
        "media_type": `${info_type}`,
        "media_id": `${data}`,
        "favorite": boolean
    }
    fetch(`${api_host}account/${user_id}/favorite?api_key=${key}&session_id=${cookie_user}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        dataType: 'json',
        body: JSON.stringify(info)
    })
        .then(response => response.json())
        .then(data => console.log(data))
}