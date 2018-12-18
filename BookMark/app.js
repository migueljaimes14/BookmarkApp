let myForm = document.querySelector('#myForm');
let siteName = document.querySelector('#siteName');
let siteUrl = document.querySelector('#siteUrl');
let bookmarksResult = document.querySelector('#bookmarksResult');

//Guarda la informacion del usuario
function savebookmark(e) {

    let bookmark = {
        id: createId(),
        name: siteName.value,
        url: siteUrl.value
    }

    console.log(bookmark);

    if (validateInput(bookmark.name, bookmark.url)) {
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
        notification(1)
    } else {
        notification(2)

    }


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
    notification(3)
}

function fetchBookmarks() {
    //tomamos los bookmarks del locastorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    console.log(bookmarks);

    bookmarksResult.innerHTML = '';

    for (let index = 0; index < bookmarks.length; index++) {
        let name = bookmarks[index].name;
        let url = bookmarks[index].url;

        bookmarksResult.innerHTML += '<div class="divider white-text"></div>' +
            '<div class="row">' +
            '<div class="col s12 m12 l12">' +
            '<div class="card #e65100 orange darken-4" style:border-radius: 2% 2% 2% 2%;>' +
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

function validateInput(name, url) {
    const urlRegex = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)";
    let isValidName = (name.trim() !== "");
    let isValidUrl = (url.match(urlRegex));

    return isValidName && isValidUrl;
}

function createId() {
    return ('_' + Math.random().toString(36).substr(2, 9));

}

function save() {
    M.toast({
        html: 'Marcador agregado',
        displayLength: 10000,
        classes: "green rounded"
    })
}

function notification(e) {
    switch (e) {
        case 1:
            M.toast({
                html: 'Marcador agregado',
                displayLength: 2000,
                classes: "green rounded"
            })
            break;
        case 2:
            M.toast({
                html: 'Campo invalido',
                displayLength: 2000,
                classes: "red rounded"
            })
            break;
        case 3:
            M.toast({
                html: 'Marcador Borrado',
                displayLength: 2000,
                classes: "gray rounded"
            })
            break;
    }
}

myForm.addEventListener('submit', savebookmark);