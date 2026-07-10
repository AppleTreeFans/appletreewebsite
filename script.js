const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const dots = Array.from(document.querySelectorAll("[data-dot]"));
  const nextButton = document.querySelector("[data-next]");
  const prevButton = document.querySelector("[data-prev]");

  let activeIndex = 0;
  let timerId = window.setInterval(showNext, 5200);

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === activeIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
    });
  }

  function restartTimer() {
    window.clearInterval(timerId);
    timerId = window.setInterval(showNext, 5200);
  }

  function showNext() {
    showSlide(activeIndex + 1);
  }

  function showPrevious() {
    showSlide(activeIndex - 1);
  }

  nextButton?.addEventListener("click", () => {
    showNext();
    restartTimer();
  });

  prevButton?.addEventListener("click", () => {
    showPrevious();
    restartTimer();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.dot));
      restartTimer();
    });
  });

  slider.addEventListener("mouseenter", () => window.clearInterval(timerId));
  slider.addEventListener("mouseleave", restartTimer);
}
