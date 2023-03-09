function getElement(selection){
  const element = document.querySelector(selection)
  if (element){
    return element
  } else {
    throw new Error(`Please verify the ${selection} selector, no such element exists.`)
  }
  }
  
  function Gallery(element){
  this.container = element
  this.list = [...element.querySelectorAll('.img')]
  // Target modal
  this.modal = getElement('.modal')
  this.modalImg = getElement('.main-img')
  this.modalImages = getElement('.modal-images')
  this.imageName = getElement('.image-name')
  this.prevBtn = getElement('.prev-btn')
  this.nextBtn = getElement('.next-btn')
  this.closeBtn = getElement('.close-btn')
  // Bind functions
  this.nextImage = this.nextImage.bind(this)
  this.prevImage = this.prevImage.bind(this)
  this.closeModal = this.closeModal.bind(this)
  this.chooseImage = this.chooseImage.bind(this)
  // Container event
  this.container.addEventListener('click', function(event){
  if (event.target.classList.contains('img')) {
    this.openModal(event.target, this.list)
  }
  }.bind(this)
  )
  }
  // ************ FUNCTIONS ************* //
  // Open modal
  Gallery.prototype.openModal = function(selectedImage, list){
    // Set main image
    this.setMainImage(selectedImage)
    // Map function
    this.modalImages.innerHTML = list.map(function (image) {
      return `<img src = "${image.src}" title = "${image.title}" data-id = "${image.dataset.id}" class = "${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected': 'modal-img'}"/>`
    }
    ).join('')
    this.modal.classList.add('open')
    // Event listenters
    this.nextBtn.addEventListener('click', this.nextImage)
    this.prevBtn.addEventListener('click', this.prevImage)
    this.closeBtn.addEventListener('click', this.closeModal)
    this.modalImages.addEventListener('click', this.chooseImage)
    } 
  // Set main image
  Gallery.prototype.setMainImage = function(selectedImage){
   this.modalImg.src = selectedImage.src
   this.imageName.textContent = selectedImage.title
  }
  // Close modal, prev and next button
  
  Gallery.prototype.closeModal = function () {
    // Remove class list and event listener
    this.modal.classList.remove('open')
    this.nextBtn.removeEventListener('click', this.nextImage)
    this.prevBtn.removeEventListener('click', this.prevImage)
    this.closeBtn.removeEventListener('click', this.closeModal)
    this.modalImages.removeEventListener('click', this.chooseImage)
  }
  Gallery.prototype.nextImage = function () {
    // conditional con element child
    const selected = this.modalImages.querySelector('.selected')
    const next = selected.nextElementSibling || this.modalImages.firstElementChild
    selected.classList.remove('selected')
    next.classList.add('selected')
    this.setMainImage(next)
  }
  
  Gallery.prototype.prevImage = function () {
  // conditional con element child
  const selected = this.modalImages.querySelector('.selected')
    const prev = selected.previousElementSibling || this.modalImages.lastElementChild
    selected.classList.remove('selected')
    prev.classList.add('selected')
    this.setMainImage(prev)
  }
  Gallery.prototype.chooseImage = function (e) {
    if(e.target.classList.contains('modal-img')){
      const selected = this.modalImages.querySelector('.selected')
      selected.classList.remove('selected')
      this.setMainImage(e.target)
      e.target.classList.add('selected')
    }
  }
  
  // ***** MAIN FUNCTION ****** // 
  const nature = new Gallery(getElement('.nature'))
  const city = new Gallery(getElement('.city'))
  
  