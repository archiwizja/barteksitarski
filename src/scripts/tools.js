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

function addListeners() {
    const links = document.querySelectorAll('.link')

    console.log("addListeners()");
    console.log(links);

    links.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault()
            event.stopImmediatePropagation()
            const {pathname: path} = new URL(event.target.closest('a').href);
            console.log(`clik => ${path}`);
            render(path)
        })
    })

    window.addEventListener("popstate", event => {
        console.log("popstate()");
        render(getUrl())
    })
}







