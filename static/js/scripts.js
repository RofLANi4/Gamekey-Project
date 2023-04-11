const search = document.querySelector(".search");
const input = document.getElementById("mySearch");
const next = document.getElementById("buttonNext");
const prev = document.getElementById("buttonPrev");
const slide = document.querySelector(".images");
const slideAll = document.getElementsByClassName("images-block");
const slideStyles = window.getComputedStyle(slide);
const width = 1300;
const slideLength = slideAll.length;

slide.style.width = width * (slideLength + 2) + "px"; // Расчет длины всех слайдов

search.onclick = () => (input.value = ""); //Очищает поисковую строку

//
//
//

createSlider();

function createSlider() {
  slide.style.left = -width + "px";
  let cloneFirst = slideAll[0].cloneNode(true),
    cloneLast = slideAll[slideLength - 1].cloneNode(true);

  slide.appendChild(cloneFirst);
  slide.insertBefore(cloneLast, slideAll[0]);
  const slidesWithCopies = document.getElementsByClassName("images-block");

  let offset = -+slideStyles.left.replace(/[^0-9]/g, "");

  // Функция для перелистывания вперед
  next.onclick = function nextSlide() {
    prev.disabled = true;
    next.disabled = true;
    offset = offset - width; // Расчет шага
    slide.style.left = offset + "px"; // Ввод размера отступа
    checkIndex();
    whileSlide();
  };

  //Функция для перелистывания назад

  prev.onclick = function prevSlide() {
    prev.disabled = true;
    next.disabled = true;
    offset = offset + width; // Расчет шага
    slide.style.left = offset + "px"; // Ввод размера отступа
    checkIndex();
    whileSlide();
  };
  function whileSlide() {
    setTimeout(function () {
      next.disabled = false;
      prev.disabled = false;
    }, 1000);
  }

  function checkIndex() {
    slide.classList.add("return");

    if (offset == -width * (slidesWithCopies.length - 1)) {
      setTimeout(function () {
        slide.style.left = -width + "px";
        slide.classList.remove("return");
      }, 1000);

      offset = -width;
    } else if (offset == 0) {
      setTimeout(function () {
        slide.style.left = -width * (slidesWithCopies.length - 2) + "px";
        slide.classList.remove("return");
      }, 1000);
      offset = -width * (slidesWithCopies.length - 2);
    }
  }
}
