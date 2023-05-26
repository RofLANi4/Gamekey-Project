"use strict";
const info = document.querySelectorAll(".info"),
  searchRequestActive = document.querySelector(".search-request"),
  inputActive = document.querySelector(".input"),
  searchForm = document.querySelector("#search-form"),
  releaseDate = document.querySelector(".data");

const price = [];

const colorPrice = {
  0: "#4ADBC8",
  400: "#3DD222",
  600: "#5F9AFF",
  900: "#FFC800",
  1200: "#FF7A00",
  1500: "#FF50A6",
  1800: "#D035FF",
};

document.querySelectorAll(".info .price").forEach((elem, num) => {
  price[num] = elem.getAttribute("text").replace("₴", "");
});

colorizeGame(info, price);

document.addEventListener("input", sendSearchRequest);

if (releaseDate) {
  checkReleaseDate(releaseDate);
}

function sendSearchRequest() {
  let searchTerm = document.getElementById("mySearch").value;
  let url = "/gamekey/search/?q=" + searchTerm;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      searchLineIsNotEmpty(searchRequestActive, inputActive, jsonResponse.results);
    });
}

function colorizeGame(game, gamePrice) {
  //
  game.forEach((item, keyInfo) => {
    for (let keyPrice in colorPrice) {
      //
      if (+gamePrice[keyInfo] > +keyPrice) {
        item.style.backgroundColor = colorPrice[keyPrice];
      }
    }
  });
}

//
function searchLineIsEmpty(search, input) {
  search.innerHTML = "";
  search.classList.remove("search-request-active");
  input.classList.remove("input-active");
}

//
function searchLineIsNotEmpty(search, input, json) {
  search.classList.add("search-request-active");
  input.classList.add("input-active");
  search.innerHTML = "";
  fill(search, json);
}

//
function fill(search, json) {
  //
  if (json.length != 0) {
    for (let key in json) {
      search.innerHTML += `
            <div class="hover">
              <a href="/gamekey/game-page/${json[key].id}">
                <img src="/media/${json[key].image}" loading="lazy" alt="game image"/>
                <p>${json[key].name}</p>
                <p class="request-price">${json[key].price}₴</p>
              </a>
            </div>
          `;
    }

    const divHover = document.querySelectorAll(".hover");
    const requestPrice = document.querySelectorAll(".request-price");

    divHover.forEach((hover, key) => {
      for (let keyPrice in colorPrice) {
        if (+requestPrice[key].innerHTML.replace("₴", "") > +keyPrice) {
          hover.addEventListener("mouseover", () => {
            hover.style.backgroundColor = colorPrice[keyPrice];
          });
          hover.addEventListener("mouseout", () => {
            hover.style.backgroundColor = "white";
          });
        }
      }
    });

    searchForm.addEventListener("focusin", searchLineIsFocus);
    searchLineIsFocus();
    document.addEventListener("click", (event) => {
      if (!searchForm.contains(event.target)) {
        searchLineIsEmptyOrUnfocus();
      }
    });
  } else if (json.length == 0) {
    searchForm.removeEventListener("focusin", searchLineIsFocus);
    searchLineIsEmptyOrUnfocus();
    searchLineIsEmpty(searchRequestActive, inputActive);
  }
}

//
function searchLineIsFocus() {
  searchRequestActive.style.display = "block";
  inputActive.style.borderRadius = "15px 15px 0px 0px";
}

//
function searchLineIsEmptyOrUnfocus() {
  inputActive.style.borderRadius = "15px";
  searchRequestActive.style.display = "none";
}

function checkReleaseDate(date) {
  date = date.innerHTML;
  date = date.split("-");
  const releaseDate = new Date(date[2], date[1] - 1, date[0]);
  const currentDate = new Date();
  if (releaseDate > currentDate) {
    const gamePriceCart = document.querySelector(".game-price-cart");

    gamePriceCart.innerHTML = '<p class="game-price">Гра ще не вийшла</p>';
    const gamePrice = document.querySelector(".game-price");
    gamePrice.style.marginLeft = "0px";
    console.log(gamePriceCart);
    // gamePrice.remove();
  }
}
