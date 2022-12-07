class

const headerNav = document.querySelector('.header__nav');
const headerButton = document.querySelector('.header__button');
const headerIcon = document.querySelector('.header__icon');

headerButton.addEventListener('click', toggleMenu);

function toggleMenu(event) {
    console.log("toggleMenu()");
    event.stopPropagation();
    headerNav.classList.toggle('header__nav--visible');
    headerIcon.classList.toggle('fa-xmark');
    headerIcon.classList.toggle('fa-bars');
    window.addEventListener('click', hideMenu);
};

function hideMenu() {
    console.log("hideMenu()");
    headerNav.classList.remove('header__nav--visible');
    headerIcon.classList.remove('fa-xmark');
    headerIcon.classList.add('fa-bars');
    window.removeEventListener('click', hideMenu);
};

