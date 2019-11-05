var elements = document.getElementsByClassName("card-figcaption-button");
for (var i = 0 ; i < elements.length; i++) {
    elements[i].addEventListener('click' , function (evt) {
        evt.preventDefault();
        console.log("abc");
        alert("abc");
    }, false ) ;
}