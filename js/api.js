const key = "3b5caee89d6f1ccfb03cb837adb8e9e1";
const api_host = "https://api.themoviedb.org/3/";
const web_host = 'https://www.themoviedb.org';
let cookie_user = ('; ' + document.cookie).split(`; session_id=`).pop().split(';')[0];
let cookie_guest = ('; ' + document.cookie).split(`; guest_session_id=`).pop().split(';')[0];
let user_id = ('; ' + document.cookie).split(`; user_id=`).pop().split(';')[0];

export { key, api_host, web_host, cookie_user, cookie_guest, user_id }