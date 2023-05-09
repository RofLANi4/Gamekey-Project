const colorPrice = {
  400: "#3DD222", //Зелений
  600: "#5F9AFF", //Синій
  900: "#FFB400", //Золотий
  1200: "#FF9600", //Помаранчевий
  1500: "#DE466C", //Рожевий
  1800: "#ED4CFF", //Фіолетовий
};

// for (key in colorPrice) {
//   if (+price[keyInfo].getAttribute("text").replace("₴", "") < key) {
//   }
// }

const info = document.querySelectorAll(".info");
const price = document.querySelectorAll(".info .price");

info.forEach((item, keyInfo) => {
  for (keyPrice in colorPrice) {
    if (+price[keyInfo].getAttribute("text").replace("₴", "") > +keyPrice) {
      item.style.backgroundColor = colorPrice[keyPrice];
    }
  }
});
