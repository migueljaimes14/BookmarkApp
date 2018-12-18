let myForm = document.querySelector('#myForm');
let siteName = document.querySelector('#siteName');
let siteUrl = document.querySelector('#siteUrl');
let bookmarksResult = document.querySelector('#bookmarksResult');

//Guarda la informacion del usuario
function savebookmark(e) {
    //Permite visualizar el submit
    e.preventDefault();


    let bookmark = {
        id: createId(),
        name: siteName.value,
        url: siteUrl.value
    }

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
        //validacion (1) es valido y se creado
    } else {
        if (!bookmark.name) {
            //No es valido (2) Falla campo nombre
            notification(2);
        } else {
            //No es valido(3) Falla campo URL
            notification(3)
        }

    }
    fetchBookmarks();
}

function deleteBookmark(id) {

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //filter
    const eliminado = bookmarks.filter(e => e.id === id)[0];
    const index = bookmarks.indexOf(eliminado);
    bookmarks.splice(index, 1);

    //Re-set el LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    notification(4)
}

function fetchBookmarks() {
    //tomamos los bookmarks del locastorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarksResult.innerHTML = '';
    //map
    let bookmarkElements = bookmarks.map(e => {
        return `<div class="row">
    <div class="col s12 m12">
        <div class="card orange">
            <div class="card-content white-text center-align">
                <span class="card-title">${e.name}</span>
            </div>
            <div class="card-action center-align">
                <a onclick = "deleteBookmark('${e.id}')" class="waves-effect waves-light btn red">Delete</a>
                <a class="waves-effect waves-light btn blue" href="${e.url}">Visit</a>
            </div>
        </div>
    </div>
</div>`;
    });

    bookmarkElements.forEach(element => bookmarksResult.innerHTML += element);

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


function notification(e) {
    switch (e) {
        case 1:
            M.toast({
                html: 'Added bookmark',
                displayLength: 2000,
                classes: "green rounded"
            })
            break;
        case 2:
            M.toast({
                html: 'Empty name field',
                displayLength: 2000,
                classes: "red rounded"
            })
            break;
        case 3:
            M.toast({
                html: 'Empty URL field',
                displayLength: 2000,
                classes: "red rounded"
            })
            break;
        case 4:
            M.toast({
                html: 'Deleted marker',
                displayLength: 2000,
                classes: "red rounded"
            })
            break;
    }
}

myForm.addEventListener('submit', savebookmark);