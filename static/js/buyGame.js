"use strict";
const buyGame = document.querySelector("#buyGame");

if (buyGame) {
  buyGame.addEventListener("click", confirmPurchase);
}

let cartDelete = JSON.parse(getCookie("cart") || "{}");

function getCookie(name) {
  let parts = document.cookie.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function confirmPurchase() {
  let gamesId = document.querySelectorAll(".games-cart");
  let storage = localStorage;

  gamesId.forEach((value) => {
    let quantity = value.querySelector(".quantity").innerHTML.replace("x", "");

    for (let i = 0; i < quantity; i++) {
      let storageKey = value.getAttribute("game-id");
      let storageValue = keyGenerator();

      if (storage.getItem(storageKey) !== null) {
        let existingValue = storage.getItem(storageKey);
        storageValue = existingValue + "<br><br>" + storageValue;
      }

      storage.setItem(storageKey, storageValue);
      delete cartDelete[storageKey];
      document.cookie = "cart=" + JSON.stringify(cartDelete) + ";path=/;";
    }
  });
  const modal = document.querySelector(".modal");
  modal.style.display = "grid";
  setTimeout(() => {
    modal.style.display = "none";
    clearCart();
    window.location = "http://127.0.0.1:8000/gamekey/profile/";
  }, 5000);
}

function clearCart() {
  const main = document.querySelector("main"),
    gamesCart = document.querySelector("#cart"),
    gamesInCartQuantiy = document.querySelector("#gameInCartQuantity");

  main.innerHTML = "<div id='cartIsEmpty'><h1>Кошик порожній</h1> </div>";
  gamesInCartQuantiy.innerHTML = "0";
  gamesCart.remove();
}

function keyGenerator() {
  const chrs = "ABCDEFGHIJKLMNOPQRSTUWXY1234567890";
  let key = "Ключ - ";
  let counter = 0;
  for (let i = 0; i < 17; i++) {
    if (counter % 5 === 0 && counter !== 0) {
      key += "-";
      counter = 0;
      continue;
    }
    key += chrs.charAt(Math.floor(Math.random() * chrs.length));
    counter++;
  }
  return key;
}
