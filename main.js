// Slides

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const container = document.querySelector(".slides");

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let current = 0;
let startX = 0;
let endX = 0;

let autoSlide = setInterval(slideFoward, 4000);
let position = 0;

function slideWidth() {
  let totalWidth = 0;
  
  slides.forEach(slide => {
    slide.style.width = slider.offsetWidth + "px";
    totalWidth = totalWidth +  slider.offsetWidth;
  });
  
  container.style.width = totalWidth + 'px';
}

function animate() {
  container.style.transform = `translateX(-${slider.offsetWidth * current}px)`;
  position = slider.offsetWidth * current;
  requestAnimationFrame(animate);
}

function slideFoward() {
  if (current < slides.length - 1) {
    current++;
    requestAnimationFrame(animate);
  }
  else if (current == slides.length-1){
      current = 0;
  }
}

function slideBack() {
  if (current > 0) {
    current = current - 1;
    requestAnimationFrame(animate);
  }
}

// LOAD EVENT
window.addEventListener("load", slideWidth);

// RESIZE EVENT
window.addEventListener("resize", slideWidth);

// TOUCH EVENTS
container.addEventListener("pointerdown", event => {
  event.preventDefault();
  
  clearInterval(autoSlide);
  startX = event.pageX;
});


container.addEventListener("pointerup", event => {
  event.preventDefault();
  
  endX = event.pageX;
  if (startX - endX > 40) {
    slideFoward();
  }
  if (startX - endX < -40) {
    slideBack();
  }
});