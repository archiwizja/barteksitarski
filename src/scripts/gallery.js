class Gallery {
    constructor(number) {
        console.log(`Gallery(${number})`);
        return this.prepareGallery(number)

    }

    prepareGallery = async (number) => {
        let galleryHTML = await Tools.loadHtml("gallery")
        
        let gallery = `${galleryHTML} nr ${number}`
        return gallery
    }
}
