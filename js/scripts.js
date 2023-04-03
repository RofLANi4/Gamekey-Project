const icon = document.querySelector(".logo-search");
const search = document.querySelector(".search");

icon.onclick = function () {
  search.classList.toggle("active");
};
