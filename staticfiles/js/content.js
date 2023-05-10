const colorPrice = {
  400: "#3DD222", //Зелений
  600: "#5F9AFF", //Синій
  900: "#FFC800", //Золотий
  1200: "#FF7A00", //Помаранчевий
  1500: "#FF50A6", //Рожевий
  1800: "#D035FF", //Фіолетовий
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
