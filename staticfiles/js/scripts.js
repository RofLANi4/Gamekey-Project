/* eslint-disable no-undef */
const search = document.querySelector(".search"),
  input = document.getElementById("mySearch"),
  next = document.getElementById("buttonNext"),
  prev = document.getElementById("buttonPrev"),
  slide = document.querySelector(".images"),
  slideAll = document.getElementsByClassName("images-block"),
  slideStyles = window.getComputedStyle(slide),
  width = 1300,
  slideLength = slideAll.length;

slide.style.width = width * (slideLength + 2) + "px"; // Расчет длины всех слайдов

search.onclick = () => (input.value = ""); //Очищает поисковую строку

//
//
//

createSlider();

//Добавление слайдов в начало и в конец
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
    offset = offset - width; // Расчет шага
    buttonClick(offset);
  };

  //Функция для перелистывания назад
  prev.onclick = function prevSlide() {
    offset = offset + width; // Расчет шага
    buttonClick(offset);
  };

  function buttonClick(offset) {
    prev.disabled = true;
    next.disabled = true;
    slide.style.left = offset + "px";
    checkIndex();
    whileSlide();
  }

  function whileSlide() {
    setTimeout(function () {
      next.disabled = false;
      prev.disabled = false;
    }, 1000);
  }

  //Функция проверки на "первый" или "последний" слайд
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

const mask = document.querySelector(".mask");

window.addEventListener("load", () => {
  mask.classList.add("hide");
  mask.remove();
});

const colorPrice = {
  700: "#3DD222",
  1000: "#5F9AFF",
  1300: "#FFB400",
  1400: "#FF9600",
  1700: "#DE466C",
  2100: "#00FFFF",
};

const info = document.querySelectorAll(".info");
const price = document.querySelectorAll(".info .price");

info.forEach((item, keyInfo) => {
  for (keyPrice in colorPrice) {
    if (+price[keyInfo].getAttribute("text").replace("₴", "") > +keyPrice) {
      item.style.backgroundColor = colorPrice[keyPrice];
    }
  }
});
