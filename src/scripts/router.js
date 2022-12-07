const routes = {}
const notFound = '<h3>Niestety wybrana strona nie istnieje</h3>'
const mainSection = document.querySelector(".main")

async function render(path) {
    console.log(`render(${path})`);
    setActiveLink(path)

    if (!routes["/"] && path == "/") {
        routes["/"] = await loadHtml('home')

    } else if (!routes["/offer"] && path == "/offer") {
        routes["/offer"] = await loadHtml("offer")

    } else if (!routes["/contact"] && path == "/contact") {
        routes["/contact"] = await loadHtml("contact")

    } else if (path == "/gallery1") {
        routes["/gallery1"] = await prepareGallery(1)

    } else if (path == "/gallery2") {
        routes["/gallery2"] = await prepareGallery(2)

    } else if (path == "/gallery3") {
        routes["/gallery3"] = await prepareGallery(3)

    } else if (path == "/gallery4") {
        routes["/gallery4"] = await prepareGallery(4)
    }

    console.log(routes);
    mainSection.innerHTML = routes[path] || notFound
    window.history.pushState({}, path, path)

    if (path == "/") {
        addListeners(".home__link")
    }

}









