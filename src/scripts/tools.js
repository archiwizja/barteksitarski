async function loadHtml(html) {
    console.log(`loadHtml(${html})`);
    const response = await fetch(`templates/${html}.html`)
    const responseHtml = await response.text()
    return responseHtml
}

function getUrl() {
    const url = new URL(window.location.href).pathname
    console.log(`getUrl(${url})`);
    return url
}

function addListeners(selector) {
    const links = document.querySelectorAll(selector)

    console.log(`addListeners(${selector})`);
    console.log(links);

    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault()
            const {pathname: path} = new URL(event.target.closest('a').href);
            console.log(`clik => ${path}`);
            render(path)
        })
    })
}

function setActiveLink(activePath) {
    console.log(`setActiveLink(${activePath})`);
    const links = document.querySelectorAll(".nav__link")
    console.log(links);
    
    links.forEach(link => {
        const {pathname: path} = new URL(link.href);
        // const url = new URL(link.href);
        // console.log(url);
        // const {pathname: path} = url
        console.log(path);
        if (path == activePath) {
            link.classList.add("nav__link--active")
        } else {
            link.classList.remove("nav__link--active")
        }
    })
}





