class Tools {
    static loadHtml = async(html) => {
        console.log(`loadHtml(${html})`);
        const response = await fetch(`templates/${html}.html`)
        const responseHtml = await response.text()
        return responseHtml
    }

    static getUrl = () => {
        const url = new URL(window.location.href).pathname
        console.log(`getUrl(${url})`);
        return url
    }
}
