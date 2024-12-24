document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll(".gal-image").length;

  // Update arrows visibility
  function updateArrows() {
    leftArrow.classList.toggle("disabled", currentSlide === 0);
    rightArrow.classList.toggle("disabled", currentSlide === totalSlides - 1);
  }

  leftArrow.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      gallery.style.marginLeft = `${currentSlide * -100}%`;
      updateArrows();
    }
  });

  rightArrow.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      gallery.style.marginLeft = `${currentSlide * -100}%`;
      updateArrows();
    }
  });

  // Initialize arrows state
  updateArrows();
});
