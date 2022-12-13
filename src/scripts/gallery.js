class Gallery {
    constructor(number) {
        console.log(`Gallery(${number})`);

        this.$index = 0;
        this.$photos = [];
        this.$interval;

        this.$gallery = document.querySelector('.gallery');
        this.$galleryGrid = document.querySelector('.gallery_grid');
        this.$galleryTitle = document.querySelector('.gallery_title');
        this.$galleryDescription = document.querySelector('.gallery_description');
        this.$galleryTemplate = document.querySelector('.gallery_template');
        
        this.$photo = document.querySelector('.photo');
        this.$photoImage = document.querySelector('.photo_image');
        this.$photoPrevious = document.querySelector('.photo_arrow-previous');
        this.$photoNext = document.querySelector('.photo_arrow-next');
        // this.$photoName = document.querySelector('.photo_name');
    
        this.$photo.addEventListener("click", this.hidePhoto)
        this.$photoPrevious.addEventListener("click", this.showPreviousPhoto)
        this.$photoNext.addEventListener("click", this.showNextPhoto)
        window.addEventListener('keyup', this.checkKeys);

        this.loadGallery(number)
    }

    loadGallery = async (number) => {
        console.log("loadGallery()");

        try {
            const path = `assets/gallery${number}/`
            const response = await fetch(`${path}00.json`)
            const data = await response.json()
            this.buildGallery(data, path)
            
        } catch (error) {
            this.$gallery.classList.add("show")
            this.$gallery.classList.remove("none")
            this.$gallery.innerHTML ="Niestety wybrana galeria jest niedostępna..."
            console.log(error);
        }
    }
      
    buildGallery = (data, path) => {
        console.log("buildGallery()");
        console.log(data);

        this.$gallery.classList.add("show")
        this.$gallery.classList.remove("none")

        this.$galleryTitle.innerHTML = data.title
        this.$galleryDescription.innerHTML = data.description
        this.$photos = data.photos

        this.$photos.forEach(photo => {
            const imgPath = `${path}${photo}`
            
            const image = this.$galleryTemplate.content.cloneNode(true);
            const img = image.querySelector('.gallery_image');
    
            img.setAttribute("id", `${this.$index}`)
            img.setAttribute("src", `${imgPath}`)
            // img.setAttribute("alt", `${photo}`)
            // img.setAttribute("title", `${photo}`)
            img.addEventListener("click", this.showSelectedPhoto)
    
            this.$galleryGrid.appendChild(image)
            this.$index++;
        })             
    }
    
    showPresentation = (e) => {
        console.log("showPresentation()");
    
        this.$photo.classList.remove("none");
        this.$photo.classList.add("show");
    
        this.showPhoto(0)
        this.$index = 0;
    
        this.$interval = setInterval(() => {
            if (this.$index < this.$photos.length - 1) {
                this.showNextPhoto(e)
            } else {
                clearInterval(this.$interval)
                this.hidePhoto(e)
            }
        }, 3000);
    }
    
    showPhoto = (imgID) => {
        console.log(`showPhoto(${imgID})`);
    
        if (imgID == 0) {
            this.$photoPrevious.classList.add("none")
        } else {
            this.$photoPrevious.classList.remove("none")
        }
    
        if (imgID == this.$photos.length - 1) {
            this.$photoNext.classList.add("none")
        } else {
            this.$photoNext.classList.remove("none")
        }
    
        const image = document.getElementById(imgID)
    
        this.$photoImage.classList.add("show")
    
        setTimeout(() => {
            this.$photoImage.classList.remove("show")
        }, 900);
    
        this.$photoImage.setAttribute("src", image.src)
        this.$photoImage.setAttribute("title", image.title)
        // this.$photoName.textContent = image.title;
    }
    
    showSelectedPhoto = (e) => {      
        this.$photo.classList.remove("none");
        this.$photo.classList.add("show");
        
        let imgID = e.target.closest("img").id
        
        this.$index = imgID;
        console.log(`showSelectedPhoto(${this.$index})`);
        
        this.showPhoto(imgID)
    }
    
    showPreviousPhoto = (e) => {
        console.log("showPreviousPhoto()");
    
        e.stopPropagation()
        if (this.$index > 0) {
            this.$index = parseInt(this.$index) - 1
            this.showPhoto(this.$index)
        } 
    }
    
    showNextPhoto = (e) => {
        console.log("showNextPhoto()");
        
        e.stopPropagation()
        if (this.$index < this.$photos.length - 1) {
            this.$index = parseInt(this.$index) + 1
            this.showPhoto(this.$index)
        } 
    }
    
    hidePhoto = (e) => {
        console.log("hidePhoto()");
        clearInterval(this.$interval);
    
        e.stopPropagation()
        this.$photo.classList.add("hide")
        setTimeout(() => {
            this.$photo.classList.add("none")
            this.$photo.classList.remove("show");
            this.$photo.classList.remove("hide")
        }, 450);
    }
    
    checkKeys = (e) => {
        console.log("checkKeys() " + e.key);
        
        if (e.key === "ArrowLeft") {
            this.showPreviousPhoto(e)
        }
        if (e.key === "ArrowRight") {
            this.showNextPhoto(e)
        }
        if (e.key === "Escape") {
            this.hidePhoto(e)
        }
        if (e.key === "F9") {
            this.showPresentation(e)
        }
    }
}
