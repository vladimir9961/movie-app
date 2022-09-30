let themeInput = document.querySelector('#input-theme');
let theme = 'theme';
let body = document.getElementsByTagName("BODY")[0];
let lStorage = localStorage.getItem(theme);
let light = 'light-theme';
let dark = 'dark-theme';

if (themeInput) {
    if (lStorage === "dark-theme") {
        body.classList = dark;
    } else {
        themeInput.checked = true;
        body.classList = light;
    }
    //do some stuff 
    themeInput.addEventListener('click', () => {
        if (themeInput.checked === true) {
            body.classList = light;
            localStorage.setItem(theme, light);
        } else {
            body.classList = dark;
            localStorage.setItem(theme, dark);
        }
    })
}


