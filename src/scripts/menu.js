class Menu {
    constructor() {
        console.log("Menu()");
        this.headerNav = document.querySelector('.header__nav');
        this.headerButton = document.querySelector('.header__button');
        this.headerIcon = document.querySelector('.header__icon');
        this.headerButton.addEventListener('click', this.toggleMenu);
    }

    toggleMenu = (event) => {
        console.log("toggleMenu()");
        event.stopPropagation();
        this.headerNav.classList.toggle('header__nav--visible');
        this.headerIcon.classList.toggle('fa-xmark');
        this.headerIcon.classList.toggle('fa-bars');
        window.addEventListener('click', this.hideMenu);
    };

    hideMenu = () => {
        console.log("hideMenu()");
        this.headerNav.classList.remove('header__nav--visible');
        this.headerIcon.classList.remove('fa-xmark');
        this.headerIcon.classList.add('fa-bars');
        window.removeEventListener('click', this.hideMenu);
    };
}
