//Escucha la accion del submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
let siteName = document.querySelector('#siteName');
let siteUrl = document.querySelector('#siteUrl');

//Guarda la informacion del usuario
function saveBookmark(e) {

    //inicializo el array
    let bookMark = {
        name: siteName.value,
        url: siteUrl.value
    }

    //Prueba si el bookmark es vacio o nulo
    if (!localStorage.getItem('bookMarks')) {
        //inicializo el array
        let bookMarks = [];
        //Agregas al array
        bookMarks.push(bookMark);
        //En el LocalStorage
        localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    } else {
        localStorage.getItem('bookMarks')
    }

    //Permite visualizar el submit
    e.preventDefault();
}