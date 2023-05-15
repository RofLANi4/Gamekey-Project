import { colorPrice } from "./content.js";

console.log(colorPrice);

const search = document.querySelector(".search"),
  input = document.getElementById("mySearch"),
  searchRquestActive = document.querySelector(".search-request"),
  inputActive = document.querySelector(".input");

search.onclick = () => (input.value = ""); //Очищает поисковую строку

function sendSearchRequest() {
  let searchTerm = document.getElementById("mySearch").value;
  let url = "/gamekey/search/?q=" + searchTerm;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      console.log(jsonResponse);
      searchRquestActive.classList.add("search-request-active");
      inputActive.classList.add("input-active");
      searchRquestActive.innerHTML = "";
      if (jsonResponse.results.length != 0) {
        for (let key in jsonResponse.results) {
          console.log(jsonResponse.results[key]);
          searchRquestActive.innerHTML += `
            <div class="hover">
              <a href="/gamekey/game-page/${jsonResponse.results[key].id}">
                <img src="/media/${jsonResponse.results[key].image}" alt="game image"/>
                <p>${jsonResponse.results[key].name}</p>
              </a>
            </div>
          `;
        }
      } else if (jsonResponse.results.length == 0) {
        searchRquestActive.innerHTML = "";
        searchRquestActive.classList.remove("search-request-active");
        inputActive.classList.remove("input-active");
      }
    });
}

document
  .getElementById("mySearch")
  .addEventListener("input", sendSearchRequest);
