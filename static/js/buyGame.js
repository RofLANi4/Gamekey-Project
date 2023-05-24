const buyGame = document.querySelector("#buyGame");

buyGame.addEventListener("click", confirmPurchase);

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
        storageValue = existingValue + ", " + storageValue;
      }
      storage.setItem(storageKey, storageValue);
    }
  });
  sendLocalStorageData();
  // console.log(localStorage);
}

function sendLocalStorageData() {
  const data = localStorage;
  const formData = new FormData();
  formData.append("data", data);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  fetch("/keysStorage/", requestOptions).then((response) => {
    console.log(response);
  });

  // let data = localStorage;
  // let xhr = new XMLHttpRequest();
  // xhr.open("POST", "/keysStorage/", true);
  // xhr.setRequestHeader("Content-Type", "application/json");
  // xhr.send(JSON.stringify({ data: data }));
  // console.log(JSON.stringify({ data: data }));
}

function keyGenerator() {
  const chrs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let key = "";
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
