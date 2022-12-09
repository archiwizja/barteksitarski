class Router {
    constructor() {
        this.routes = {}
        this.notFound = '<h3>Niestety wybrana strona nie istnieje</h3>'
        this.mainSection = document.querySelector(".main")
        this.addListeners(".header__link")
        this.addListeners(".nav__link")
        this.render(Tools.getUrl())

        window.addEventListener("popstate", event => {
            console.log("popstate()")
            this.render(Tools.getUrl())
        })
    }

    render = async (path) => {
        console.log(`render(${path})`);
        this.setActiveLink(path)
    
        if (!this.routes["/"] && path == "/") {
            this.routes["/"] = await Tools.loadHtml('home')

        } else if (!this.routes["/offer"] && path == "/offer") {
            this.routes["/offer"] = await Tools.loadHtml("offer")
    
        } else if (!this.routes["/contact"] && path == "/contact") {
            this.routes["/contact"] = await Tools.loadHtml("contact")
    
        } else if (path == "/gallery1") {
            this.routes["/gallery1"] = await new Gallery(1)
    
        } else if (path == "/gallery2") {
            this.routes["/gallery2"] = await new Gallery(2)
    
        } else if (path == "/gallery3") {
            this.routes["/gallery3"] = await new Gallery(3)
    
        } else if (path == "/gallery4") {
            this.routes["/gallery4"] = await new Gallery(4)
        }
    
        console.log(this.routes);
        this.mainSection.innerHTML = this.routes[path] || this.notFound
        window.history.pushState({}, path, path)
    
        if (path == "/") {
            this.addListeners(".home__link")
        }
    }
  
    addListeners = (selector) => {
        const links = document.querySelectorAll(selector)
    
        console.log(`addListeners(${selector})`);
        console.log(links);
    
        links.forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault()
                const {pathname: path} = new URL(event.target.closest('a').href);
                console.log(`clik => ${path}`);
                this.render(path)
            })
        })
    }
    
    setActiveLink = (activePath) => {
        console.log(`setActiveLink(${activePath})`);
        const links = document.querySelectorAll(".nav__link")
        console.log(links);
        
        links.forEach(link => {
            const {pathname: path} = new URL(link.href);
            console.log(path);
            if (path == activePath) {
                link.classList.add("nav__link--active")
            } else {
                link.classList.remove("nav__link--active")
            }
        })
    }
}
