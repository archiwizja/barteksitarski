const navLinks = document.querySelectorAll('.nav__link')
const mainSection = document.querySelector(".main")

let home = ''
let offer = ''
let contact = ''
let notFound = `<h1>404</h1>`

async function loadPage(page) {
    console.log(`Loading: templates/${page}.html start`);

    const response = await fetch(`templates/${page}.html`)
    const resHtml = await response.text()

    console.log(`Loading: templates/${page}.html finished`);
    return resHtml
}

async function loadAllPages() {
    home = await loadPage('home');
    offer = await loadPage('offer');
    contact = await loadPage('contact');
    console.log("Pages loaded:");
};

async function main() {
    await loadAllPages()
    console.log(home);
    console.log(offer);
    console.log(contact);

    console.log("Main");
    mainSection.innerHTML = home

    const routes = {
        "/": home,
        "/offer": offer,
        "/contact": contact,
    };

    window.addEventListener("popstate", e =>
    render(new URL(window.location.href).pathname)
    )

    navLinks.forEach(link => {
        console.log(link)
        link.addEventListener("click", evt => {
            evt.preventDefault()

            const {pathname: path} = new URL(evt.target.href);
            console.log(path);

            window.history.pushState({}, path, path)
            mainSection.innerHTML = routes[path]
        })
    })
}

main()





