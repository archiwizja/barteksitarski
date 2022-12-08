function main() {
    console.log("main()");
    addListeners(".header__link")
    addListeners(".nav__link")
    render(getUrl())

    window.addEventListener("popstate", event => {
        console.log("popstate()")
        render(getUrl())
    })
    new Menu()
}

main()