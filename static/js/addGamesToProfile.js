const keysList = document.querySelector(".keys-list");
let storage = window.localStorage;

for (let i = 0; i < storage.length; i++) {
  keysList.innerHTML = console.log(storage[storage.key(i)]);
}
