let home = ''
let offer = ''
let contact = ''
let notFound = `<h1>404</h1>`
let routes = {};

const navLinks = document.querySelectorAll('.nav__link')
const mainSection = document.querySelector(".main")


function render(path) {
    console.log(`Render: ${path}`);
    mainSection.innerHTML = routes[path] || notFound
}

async function loadPage(page) {
    const response = await fetch(`templates/${page}.html`)
    const responseHtml = await response.text()
    return responseHtml
}

async function loadAllPages() {
    home = await loadPage('home');
    offer = await loadPage('offer');
    contact = await loadPage('contact');
};

async function main() {
    await loadAllPages()
    routes = {
        "/": home,
        "/offer": offer,
        "/contact": contact,
    };

    render("/")

    window.addEventListener("popstate", e =>
        render(new URL(window.location.href).pathname)
    )

    navLinks.forEach(link => {

        link.addEventListener("click", evt => {
            evt.preventDefault()
            const {pathname: path} = new URL(evt.target.closest('a').href);
            window.history.pushState({}, path, path)
            render(path)
        })
    })
}

main()





