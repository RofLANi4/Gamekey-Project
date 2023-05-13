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
        // console.log(jsonResponse.results[0].name);
        // console.log(jsonResponse.results[0].id);
        for (key in jsonResponse.results) {
          console.log(jsonResponse.results[key]);
          searchRquestActive.innerHTML += `<a href="/gamekey/game-page/${jsonResponse.results[key].id}">${jsonResponse.results[key].name}</a>`;
        }
        // searchRquestActive.innerHTML = `<a href="/gamekey/game-page/${jsonResponse.results[0].id}">${jsonResponse.results[0].name}</a>`;
      } else if (jsonResponse.results.length == 0) {
        searchRquestActive.innerHTML = "";
        searchRquestActive.classList.remove("search-request-active");
        inputActive.classList.remove("input-active");
      }
    });

  // let xhr = new XMLHttpRequest();
  // xhr.open("GET", url, true);

  // xhr.responseType = "json";
  // xhr.onload = function () {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     let results = xhr.response;
  //     // console.log(results); // handle the results here
  //   }
  // };

  // xhr.send();
}

document
  .getElementById("mySearch")
  .addEventListener("input", sendSearchRequest);
