const cartGame = document.querySelectorAll(".games-cart a"),
  gamePrice = document.querySelectorAll(".cart-price");

// const colorPrice = {
//   0: "#4ADBC8",
//   400: "#3DD222",
//   600: "#5F9AFF",
//   900: "#FFC800",
//   1200: "#FF7A00",
//   1500: "#FF50A6",
//   1800: "#D035FF",
// };
cartGame.forEach((value, key) => {
  // eslint-disable-next-line no-undef
  for (let keyPrice in colorPrice) {
    if (+gamePrice[key].innerHTML.replace("₴", "") > +keyPrice) {
      // eslint-disable-next-line no-undef
      value.style.backgroundColor = colorPrice[keyPrice];
    }
  }
});
