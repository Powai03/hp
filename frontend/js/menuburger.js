//menu burger
var menu = document.querySelector('.burger');
var visible = document.querySelector('.menu');
menu.addEventListener('click', function () {
    visible.classList.toggle("visible");
    console.log('oui');
});