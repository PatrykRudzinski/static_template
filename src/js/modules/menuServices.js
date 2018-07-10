document.addEventListener('DOMContentLoaded', function (){

    // DOM elements variables
    const hamburger = document.querySelector('#js__hamburger');
    const nav = document.querySelector('#js__nav');
    const menuLink = nav.querySelectorAll('#js__nav a');
    const anchors = document.querySelectorAll('a[href^="#"]');

     // collapse and show menu func
    const menuSwitch = () => {
        hamburger.classList.toggle('js-nav__hamburger--open');
        nav.classList.toggle('js-nav__list--collapsed');
    };

    // viewport watcher and add hash
    const intersectionObserver = new IntersectionObserver((entries) => {
        let [entry] = entries;
        if (entry.isIntersecting) {
            intersectionObserver.unobserve(entry.target);
            setTimeout( () => window.location.hash = entry.target.id, 350 );
        }
    });

//=================   LISTENERS   ========================
    // collapse and show menu on hamburger click
    hamburger.addEventListener('click', menuSwitch);

    // close menu on link click
    [...menuLink].forEach( el => {
        el.addEventListener('click', menuSwitch);
    });

    // smooth scroll
    [...anchors].forEach( anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            let hash = this.getAttribute('href');
            let element = document.querySelector(hash);
            intersectionObserver.observe(element);

            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});