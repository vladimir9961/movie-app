// //PAGINATION
// //DETTECT CHANGE IN PAGINATION URL
// let count = 1;

// var url = document.URL
// var newAdditionalURL = "";
// var tempArray = url.split("#");
// var baseURL = tempArray[0];
// var aditionalURL = tempArray[1];
// var temp = "";
// if (aditionalURL) {
//     var tempArray = aditionalURL.split("&");
//     for (var i in tempArray) {
//         if (tempArray[i].indexOf("page") == -1) {
//             newAdditionalURL += temp + tempArray[i];
//             temp = "&";
//         }
//     }
// }
// var rows_txt = temp + `page=${count}`;
// var finalURL = baseURL + "#" + newAdditionalURL + rows_txt;
// window.history.replaceState({}, '', finalURL);

// const paginationHolder = document.querySelector('[data-pagination]')


// function nextPage(currentPage) {
//     console.log(currentPage, count);

//     let nextPage = document.createElement('li');

//     nextPage.classList = 'page-item'
//     let nextPageLink = document.createElement('a');
//     nextPageLink.classList = 'page-link';
//     nextPageLink.innerHTML = currentPage + count
//     nextPageLink.addEventListener('click', () => {

//         console.log(currentPage + count)
//     })
//     nextPage.appendChild(nextPageLink)
//     return nextPage
// }

// function prevPage(currentPage) {

//     let prevPage = document.createElement('li');

//     prevPage.classList = 'page-item'
//     let prevPageLink = document.createElement('a');
//     prevPageLink.classList = 'page-link';
//     prevPageLink.innerHTML = currentPage - count
//     prevPageLink.addEventListener('click', () => {
//         console.log(currentPage - count)
//     })
//     prevPage.appendChild(prevPageLink)
//     return prevPage
// }

// function createLi () {
//     let li = document.createElement('li');
//     li.classList = 'page-item';
//     let a = document.createElement('a');
//     a.classList = 'page-link';
//     a.innerHTML = currentPage - count

// }
// export const paginate = (data) => {
//     let i = 1;
//     let currentPage = data.page;
//     let totalNumberPages = 0;
//     console.log(data, currentPage, totalNumberPages)
//     if (totalNumberPages < 500) {
//         totalNumberPages = 500
//     } else {
//         totalNumberPages = data.total_pages
//     }
//     if (totalNumberPages > 2) {
//         let div = document.createElement('div');
//         let nav = document.createElement('nav');
//         let ul = document.createElement('ul');
//         ul.appendChild(nextPage())
//         ul.classList = 'pagination justify-content-center'
//         nav.appendChild(ul)
//         div.appendChild(nav)


//         if (currentPage === 1) {
//             console.log('afgas');
//         }
//         ul.innerHTML += `
//         <li class="page-item disabled">
//           <a class="page-link" href="#" tabindex="-1" aria-disabled="true"><<</a>
//         </li>
//         <li class="page-item "><a class="page-link" href="#">${currentPage - i}</a></li>
//         <li class="page-item active"><a class="page-link" href="#">${currentPage}</a></li>
//         <li class="page-item"><a class="page-link" href="#">${currentPage + i}</a></li>
//         <li class="page-item disabled"><a class="page-link" href="#" aria-disabled="true">...</a></li>
//         <li class="page-item"><a class="page-link" href="#">${totalNumberPages}</a></li>
//         `
//         if (currentPage > 1) {
//             ul.append(prevPage(data.page))
//         }
//         ul.append(nextPage(data.page))
//         paginationHolder.append(div)

//     } else {

//     }



// }

// var prevScrollpos = window.pageYOffset;
// console.log(prevScrollpos);

// window.onscroll = function () {
//     var currentScrollPos = window.pageYOffset;
//     console.log(currentScrollPos);

//     if (prevScrollpos > currentScrollPos) {
//         document.getElementById("navbar").style.top = "-10px";
//         console.log('da');

//     } else {
//         document.getElementById("navbar").style.top = "-50px";
//         console.log('ne');
//     }
//     prevScrollpos = currentScrollPos;
// }

