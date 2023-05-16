const info = document.querySelectorAll(".info"),
  price = document.querySelectorAll(".info .price"),
  searchRequestActive = document.querySelector(".search-request"),
  inputActive = document.querySelector(".input"),
  searchForm = document.querySelector("#search-form");

colorizeGame(info, price);

document.addEventListener("input", sendSearchRequest);
function sendSearchRequest() {
  let searchTerm = document.getElementById("mySearch").value;
  let url = "/gamekey/search/?q=" + searchTerm;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      searchLineIsNotEmpty(
        searchRequestActive,
        inputActive,
        jsonResponse.results
      );
    });
}

//
function colorizeGame(game, gamePrice) {
  const colorPrice = {
    0: "#4ADBC8",
    400: "#3DD222",
    600: "#5F9AFF",
    900: "#FFC800",
    1200: "#FF7A00",
    1500: "#FF50A6",
    1800: "#D035FF",
  };

  //
  game.forEach((item, keyInfo) => {
    for (let keyPrice in colorPrice) {
      //
      try {
        if (
          +gamePrice[keyInfo].getAttribute("text").replace("₴", "") > +keyPrice
        ) {
          item.style.backgroundColor = colorPrice[keyPrice];
        }
      } catch {
        if (+gamePrice[keyInfo].price > +keyPrice) {
          item.addEventListener("mouseover", () => {
            item.style.backgroundColor = colorPrice[keyPrice];
          });
          item.addEventListener("mouseout", () => {
            item.style.backgroundColor = "#FFFFFF";
          });
        }
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
  fill(search, input, json);
}

//
function fill(search, input, json) {
  //

  if (json.length != 0) {
    for (let key in json) {
      searchRequestActive.innerHTML += `
            <div class="hover">
              <a href="/gamekey/game-page/${json[key].id}">
                <img src="/media/${json[key].image}" loading="lazy" alt="game image"/>
                <p>${json[key].name}</p>
              </a>
            </div>
          `;
    }
    const divHover = document.querySelectorAll(".hover");

    searchForm.addEventListener("focusin", searchLineIsFocus);
    searchLineIsFocus();
    document.addEventListener("click", (event) => {
      if (!searchForm.contains(event.target)) {
        searchLineIsEmptyOrUnfocus();
      }
    });

    colorizeGame(divHover, json);
  } else if (json.length == 0) {
    searchForm.removeEventListener("focusin", searchLineIsFocus);
    searchLineIsEmpty(searchRequestActive, inputActive);
    input.style.borderRadius = "15px";
    searchRequestActive.style.display = "none";
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
