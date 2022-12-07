async function prepareGallery(number) {
    let galleryHTML = await loadHtml("gallery")
    
    let gallery = `${galleryHTML} nr ${number}`
    return gallery
}


