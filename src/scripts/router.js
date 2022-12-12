class Router {
    constructor() {
        console.log("Router()");
        this.routes = {}
        this.notFound = '<h3>Niestety wybrana strona nie istnieje</h3>'
        this.links = document.querySelectorAll(".nav__link")
        this.mainSection = document.querySelector(".main")
        this.addListeners(".header__link")
        this.addListeners(".nav__link")
        this.render(this.getUrl())

        window.addEventListener("popstate", event => {
            console.log("popstate()")
            this.render(this.getUrl())
        })
    }

    render = async (path) => {
        console.log(`>>> render(${path})`);
        this.setActiveLink(path)

        await this.updateRoutes(path)
        console.log(this.routes);

        if (path == "/") {
            this.setMainSection(path)
            this.addListeners(".home__link")
            
        } else if (path.slice(0,-1) == "/gallery") {
            this.setMainSection(path.slice(0,-1))
            new Gallery(path.slice(-1))

        } else {
            this.setMainSection(path)
        }

        window.history.pushState({}, path, path)
    }
  
    setMainSection = (activePath) => {
        console.log(`setMainSection(${activePath})`);
        this.mainSection.innerHTML = this.routes[activePath] || this.notFound
    }

    setActiveLink = (activePath) => {
        console.log(`setActiveLink(${activePath})`);
       
        this.links.forEach(link => {
            const {pathname: path} = new URL(link.href);

            if (path == activePath) {
                link.classList.add("nav__link--active")
            } else {
                link.classList.remove("nav__link--active")
            }
        })
    }

    addListeners = (selector) => {
        const links = document.querySelectorAll(selector)
        console.log(`addListeners(${selector})`);
    
        links.forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault()
                const {pathname: path} = new URL(event.target.closest('a').href);
                console.log(`clik => ${path}`);
                this.render(path)
            })
        })
    }

    updateRoutes = async (path) => {
        console.log(`updateRoutes(${path})`);

        if (!this.routes["/"] && path == "/") {
            this.routes["/"] = await this.loadHtml('home')

        } else if (!this.routes["/offer"] && path == "/offer") {
            this.routes["/offer"] = await this.loadHtml("offer")
    
        } else if (!this.routes["/contact"] && path == "/contact") {
            this.routes["/contact"] = await this.loadHtml("contact")
    
        } else if (!this.routes["/gallery"] && path.slice(0,-1) == "/gallery") {
            this.routes["/gallery"] = await this.loadHtml("gallery")
        } 
    }

    loadHtml = async(html) => {
        console.log(`loadHtml(${html})`);
        const response = await fetch(`templates/${html}.html`)
        const responseHtml = await response.text()
        return responseHtml
    }

    getUrl = () => {
        const url = new URL(window.location.href).pathname
        console.log(`getUrl(${url})`);
        return url
    }
}
