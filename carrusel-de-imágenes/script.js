const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");


btnLeft.addEventListener("click", e => moveToLeft())
btnRight.addEventListener("click", e => moveToRight())
//El carrusel se mueve solo cada 2 segundos
let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;

// control del auto-slide (guardamos el id para poder pausarlo cuando se abra la imagen)
let autoSlideId = null;
function startAutoSlide() {
    stopAutoSlide();
    autoSlideId = setInterval(() => moveToRight(), 2000);
}
function stopAutoSlide() {
    if (autoSlideId) {
        clearInterval(autoSlideId);
        autoSlideId = null;
    }
}
// iniciar auto-slide
startAutoSlide();

function moveToRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
}  

function moveToLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none";
        return;
    } 
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
    
    
}   

// Ampliar imagen: usar overlay existente en DOM (declarado en index.html)
const imageOverlay = document.getElementById('image-overlay');
const overlayImage = document.getElementById('overlay-img');
const overlayCaption = document.getElementById('overlay-caption');

slider.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (!img || !slider.contains(img) || !imageOverlay) return;
    overlayImage.src = img.src;
    overlayCaption.textContent = img.dataset.caption || img.alt || '';
    imageOverlay.classList.add('show');
    stopAutoSlide();
});

imageOverlay && imageOverlay.addEventListener('click', () => {
    imageOverlay.classList.remove('show');
    overlayImage.src = '';
    overlayCaption.textContent = '';
    startAutoSlide();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageOverlay && imageOverlay.classList.contains('show')) {
        imageOverlay.classList.remove('show');
        overlayImage.src = '';
        overlayCaption.textContent = '';
        startAutoSlide();
    }
});