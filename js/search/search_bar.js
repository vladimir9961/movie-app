window.addEventListener('load', function () {
    const search_bar = document.querySelector('[data-search-bar]');
    search_bar.addEventListener("keypress", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            let value = search_bar.value;
            console.log(search_bar.value)
            window.location.href = `../search/?${value}`;
        }
    });
})

