const search = document.querySelector(".search"),
  input = document.getElementById("mySearch");

search.onclick = () => (input.value = ""); //Очищает поисковую строку
