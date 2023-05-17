const priceElements = document.querySelectorAll("p.price");
priceElements.forEach((priceElement) => {
  priceElement.addEventListener("click", function () {
    const productId = priceElement.id.replace("game-id-", "");
    addToCart(productId);
  });
});

function addToCart(product_id) {
  // Get the cart data from the cookie
  let cart = JSON.parse(getCookie("cart") || "{}");

  // Add the product to the cart or increment its quantity
  if (product_id in cart) {
    cart[product_id].quantity += 1;
  } else {
    cart[product_id] = { quantity: 1 };
  }

  // Store the cart data in the cookie
  document.cookie = "cart=" + JSON.stringify(cart) + ";path=/;";
}
function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
