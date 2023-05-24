const buyGame = document.querySelector("#buyGame");

buyGame.addEventListener("click", keyGenerator);

function confirmPurchase() {}

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
  console.log(key);
  return key;
}
