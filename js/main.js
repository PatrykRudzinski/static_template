document.addEventListener('DOMContentLoaded', function (){

    const hamburger = document.querySelector('#js__hamburger');
    const nav = document.querySelector('#js__nav');
    const menuLink = document.querySelectorAll('#js__nav a');

     // collapse and show menu func
    const menuSwitch = ()=> {
        hamburger.classList.toggle('nav__hamburger--open');
        nav.classList.toggle('nav__list--collapsed');
    };



    // collapse and show menu on hamburger click
    hamburger.addEventListener('click', menuSwitch);

    // close menu on link click
    [...menuLink].forEach(function (el){
        el.addEventListener('click', menuSwitch)
    });
});