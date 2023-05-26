"use strict";

const keysList = document.querySelector(".keys-list");

if (localStorage.length > 0) {
  sendLocalStorageData();
} else {
  keysList.innerHTML += '<div class="keys-list__content_empty"><h2>Наразі ви не купили жодної гри</h2></div>';
}

function getCookie(name) {
  const cookieValue = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return cookieValue ? cookieValue.pop() : "";
}

function sendLocalStorageData() {
  const data = JSON.stringify(localStorage);
  const formData = new FormData();
  formData.append("data", data);

  const csrftoken = getCookie("csrftoken"); // Get the CSRF token from the cookie

  const requestOptions = {
    method: "POST",
    body: formData,
    headers: {
      "X-CSRFToken": csrftoken, // Include the CSRF token in the request headers
    },
  };

  fetch("/gamekey/keysStorage/", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      showAllPurchasedKeys(data);
    });
}

function showAllPurchasedKeys(data) {
  for (let key in data) {
    keysList.innerHTML += `
    <div class="keys-list__content">
      <div class="keys-list__content-info">
        <a href="/gamekey/game-page/${key}">
          <img class="keys-list__image" src="${data[key].image}" loading="lazy" alt="game image"/>
        </a>
        <p class="keys-list__game-name">${data[key].name}</p>
        <div class="keys-list__toggle">
          <svg width="70" height="70" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </div>
      <div class="keys-list__keys-content">
        <p class="keys-list__keys">${data[key].keys}</p>
      </div>
    </div>
`;
  }

  const toggle = document.querySelectorAll(".keys-list__toggle");
  const keyListContent = document.querySelectorAll(".keys-list__content");
  toggle.forEach((value, key) => {
    value.addEventListener("click", () => {
      keyListContent[key].classList.toggle("keys-list__content_open");
      value.classList.toggle("keys-list__toggle_active");
    });
  });
}

// <p class="keys-list__price">${data[key].keys}</p>
