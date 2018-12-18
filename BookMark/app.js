//Escucha la accion del submit
let myForm = document.querySelector('#myForm');
let siteName = document.querySelector('#siteName');
let siteUrl = document.querySelector('#siteUrl');
let bookmarksResult = document.querySelector('#bookmarksResult');

//Guarda la informacion del usuario
function savebookmark(e) {
    //REVISAR
    // if (!validateForm(siteName,siteUrl)) {
    //     return false;
    // }
    // console.log('salio');
    
    //inicializo el array
    let bookmark = {
        name: siteName.value,
        url: siteUrl.value
    }

    //Prueba si el bookmark es vacio o nulo
    if (!localStorage.getItem('bookmarks')) {
        //inicializo el array
        let bookmarks = [];
        //Agregas al array
        bookmarks.push(bookmark);
        //En el LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //agregando bookmarks al localStorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Agregando al array
        bookmarks.push(bookmark);
        //Re-set el LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    myForm.reset();

    fetchBookmarks();
    //Permite visualizar el submit
    e.preventDefault();
}

function deleteBookmark(url) {
    console.log("Entro");

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (let index = 0; index < bookmarks.length; index++) {
        if (bookmarks[index].url == url) {
            bookmarks.splice(index, 1);
        }
    }
    //Re-set el LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks() {
    //tomamos los bookmarks del locastorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    console.log(bookmarks);

    bookmarksResult.innerHTML = '';

    for (let index = 0; index < bookmarks.length; index++) {
        let name = bookmarks[index].name;
        let url = bookmarks[index].url;

        bookmarksResult.innerHTML += '<div class="divider"></div>' +
            '<div class="row">' +
            '<div class="col s12 m12 l12">' +
            '<div class="card blue-grey darken-1">' +
            '<div class="card-content white-text">' +
            '<span class="card-title center-align">' +
            name +
            '</span>' +
            '</div>' +
            '<div class="card-action center-align">' +
            '<a onclick = "deleteBookmark(\'' + url + '\')" class="waves-effect waves-light btn  #e53935 red darken-1">Delete</a>' +
            '<a href="' + url + '" class="waves-effect waves-light btn #1e88e5 blue darken-1">Visit</a>' +
            ' </div>' +
            '</div>' +
            '</div>';
    }

}

// REVISAR!!!
// function validateForm(siteName,siteUrl) {
//     console.log('entro');
    
//     if (!siteName || !siteUrl) {
//         alert('llenar el formulario');
//         return false;
//     }

//     let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
//     let regex = new RegExp(expression);

//     if (!siteUrl.match(regex)) {
//     alert('llenar url');
//         return false;  
//     }
//     console.log('paso');
    
//     return true;
// }




myForm.addEventListener('submit', savebookmark);