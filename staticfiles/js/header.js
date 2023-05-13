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
      if (jsonResponse.results.length != 0) {
        console.log(jsonResponse.results[0].name);
        console.log(jsonResponse.results[0].id);
        searchRquestActive.innerHTML = `<a href="{% url 'game_keys:game_page' pk=game.${jsonResponse.results[0].id} %}"${jsonResponse.results[0].name}</a>`;
      } else if (jsonResponse.results.length == 0) {
        searchRquestActive.innerHTML = "";
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

searchRquestActive.classList.add("search-request-active");
inputActive.classList.add("input-active");
