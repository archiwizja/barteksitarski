let $gallery
let $galleryTemplate

let $photo
let $photoName
let $photoImage
let $photoPrevious
let $photoNext

let $photos = [];
let $interval;
let $index = 0;
let $viewHeight = 0;
let $zoom = 0;

async function showGallery(number) {
    console.log("showGallery()");
    getGalleryDate()
    // $gallery.innerHTML =""

    try {
        const path = `assets/gallery${number}/`
        const response = await fetch(`${path}00.txt`)
        const data = await response.text()

        $gallery.classList.remove("none")
        $gallery.classList.add("show")

        if (data.startsWith("01")) {
            buildGallery(data, path)

        } else {
            $gallery.innerHTML ="Niestety wybrana galeria jest niedostępna..."
        }

    } catch (error) {
        console.log(error);
    }
}

function getGalleryDate() {
    console.log("getGalleryDate()");

    $gallery = document.querySelector('.gallery');
    $galleryTemplate = document.querySelector('.gallery_template');
    
    $photo = document.querySelector('.photo');
    $photoName = document.querySelector('.photo_name');
    $photoImage = document.querySelector('.photo_image');
    $photoPrevious = document.querySelector('.photo_arrow-previous');
    $photoNext = document.querySelector('.photo_arrow-next');

    window.addEventListener('keyup', checkKeys);
    $photo.addEventListener("click", hidePhoto)
    $photoPrevious.addEventListener("click", showPreviousPhoto)
    $photoNext.addEventListener("click", showNextPhoto)
}

function buildGallery(data, path) {
        console.log("buildGallery()");

        let table = data.split("\n")
        $photos = [];
        $index = 0;
    
        // console.log(table);            
        table.forEach(name => {
            name = name.trimEnd()
            if (name !== "" && name !== "\n")
            $photos.push(name)
        })
    
        // console.log($photos);
        $photos.forEach(photo => {
            const imgPath = `${path}${photo}.jpg`
            // console.log(imgPath);
            
            const image = $galleryTemplate.content.cloneNode(true);
            const img = image.querySelector('.gallery_image');
    
            img.setAttribute("id", `${$index}`)
            img.setAttribute("src", `${imgPath}`)
            // img.setAttribute("alt", `${photo}`)
            // img.setAttribute("title", `${photo}`)
            img.addEventListener("click", showSelectedPhoto)
    
            $gallery.appendChild(image)
            $index++;
        })             
    }

function showPresentation(e) {
    console.log("showPresentation()");

    $photo.classList.remove("none");
    $photo.classList.add("show");

    showPhoto(0)
    $index = 0;

    $interval = setInterval(() => {
        if ($index < $photos.length - 1) {
            showNextPhoto(e)
        } else {
            clearInterval($interval)
            hidePhoto(e)
        }
    }, 3000);
}

function showPhoto(imgID) {
    console.log(`showPhoto(${imgID})`);

    if (imgID == 0) {
        $photoPrevious.classList.add("none")
    } else {
        $photoPrevious.classList.remove("none")
    }

    if (imgID == $photos.length - 1) {
        $photoNext.classList.add("none")
    } else {
        $photoNext.classList.remove("none")
    }

    const image = document.getElementById(imgID)

    $photoImage.classList.add("show")

    setTimeout(() => {
        $photoImage.classList.remove("show")
    }, 900);

    $photoImage.setAttribute("src", image.src)
    $photoImage.setAttribute("title", image.title)
    // $photoName.textContent = image.title;
}

function showSelectedPhoto(e) {      
    $photo.classList.remove("none");
    $photo.classList.add("show");

    let imgID = e.target.closest("img").id

    showPhoto(imgID)
    $index = imgID;

    console.log(`showSelectedPhoto(${$index})`);
}

function showPreviousPhoto(e){
    console.log("showPreviousPhoto()");

    e.stopPropagation()
    if ($index > 0) {
        $index = parseInt($index) - 1
        showPhoto($index)
    } 
}

function showNextPhoto(e) {
    console.log("showNextPhoto()");
    
    e.stopPropagation()
    if ($index < $photos.length - 1) {
        $index = parseInt($index) + 1
        showPhoto($index)
    } 
}

function hidePhoto(e) {
    console.log("hidePhoto()");
    clearInterval($interval);

    e.stopPropagation()
    $photo.classList.add("hide")
    setTimeout(() => {
        $photo.classList.add("none")
        $photo.classList.remove("show");
        $photo.classList.remove("hide")
    }, 450);
}

function checkKeys(e) {
    console.log("checkKeys() " + e.key);
    
    if (e.key === "ArrowLeft") {
        showPreviousPhoto(e)
    }
    if (e.key === "ArrowRight") {
        showNextPhoto(e)
    }
    if (e.key === "Escape") {
        hidePhoto(e)
    }
    if (e.key === "F9") {
        showPresentation(e)
    }
}
