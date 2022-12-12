class Gallery {
    constructor(number) {
        console.log(`Gallery(${number})`);

        this.$index = 0;
        this.$photos = [];
        this.$interval;

        this.$gallery = document.querySelector('.gallery');
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
            const response = await fetch(`${path}00.txt`)
            const data = await response.text()
    
            this.$gallery.classList.remove("none")
            this.$gallery.classList.add("show")
    
            if (data.startsWith("01")) {
                this.buildGallery(data, path)
    
            } else {
                this.$gallery.innerHTML ="Niestety wybrana galeria jest niedostępna..."
            }
    
        } catch (error) {
            console.log(error);
        }
    }
      
    buildGallery = (data, path) => {
        console.log("buildGallery()");

        let table = data.split("\n")
        this.$photos = [];
        this.$index = 0;
         
        table.forEach(name => {
            name = name.trimEnd()
            if (name !== "" && name !== "\n")
            this.$photos.push(name)
        })

        this.$photos.forEach(photo => {
            const imgPath = `${path}${photo}.jpg`
            // console.log(imgPath);
            
            const image = this.$galleryTemplate.content.cloneNode(true);
            const img = image.querySelector('.gallery_image');
    
            img.setAttribute("id", `${this.$index}`)
            img.setAttribute("src", `${imgPath}`)
            // img.setAttribute("alt", `${photo}`)
            // img.setAttribute("title", `${photo}`)
            img.addEventListener("click", this.showSelectedPhoto)
    
            this.$gallery.appendChild(image)
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
