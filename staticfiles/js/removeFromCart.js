"use strict";
const getGame = document.querySelectorAll(".games-cart"),
  getRemoveButton = document.querySelectorAll(".remove-game"),
  main = document.querySelector("main");

let cart = JSON.parse(getCookie("cart") || "{}");

function getCookie(name) {
  let parts = document.cookie.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

getRemoveButton.forEach((value, key) => {
  value.addEventListener("click", () => {
    const gameId = getGame[key].getAttribute("game-id"),
      gamesQuantity = getGame[key].querySelector(".quantity"),
      gamesInCartQuantiy = document.querySelector("#gameInCartQuantity");

    cart[gameId].quantity--;
    gamesQuantity.innerHTML = `x${cart[gameId].quantity}`;
    +gamesInCartQuantiy.innerHTML--;

    updateTotalPrice(gameId);

    if (cart[gameId].quantity <= 0) {
      delete cart[gameId];
      removeGameFromPage(gameId);
    }
    document.cookie = "cart=" + JSON.stringify(cart) + ";path=/;";
  });
});

function removeGameFromPage(id) {
  const gameElement = document.querySelector(`[game-id="${id}"]`);

  if (gameElement) {
    gameElement.remove();
  }
}

function updateTotalPrice(id) {
  let totalPrice = document.querySelector("#totalPrice");
  const gameElement = document.querySelector(`[game-id="${id}"]`);
  const gamePrice = gameElement.querySelector(".cart-game-price").innerHTML.replace("₴", "");
  totalPrice.innerHTML = `${+totalPrice.innerHTML.replace("₴", "") - +gamePrice}₴`;

  if (totalPrice.innerHTML.replace("₴", "") <= 0) {
    const gamesCart = document.querySelector("#cart");
    main.innerHTML = "<div id='cartIsEmpty'><h1>Кошик порожній</h1> </div>";
    gamesCart.remove();
  }
}
