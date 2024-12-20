const logBtn = document.querySelector(".login-btn");
const modal = document.querySelector(".modal");
const closeLogBtn = document.querySelector(".modal-log-close-btn");
const overlay = document.querySelector(".overlay");

// hiện thêm vào giỏ hàng thành công
function showPopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("open");
  overlay.style.display = "block";
}
//đóng popup thêm vào giỏ hàng thành công
function closePopupFunc() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("open");
  overlay.style.display = "none";
}

// updateLoginStatus();
// thêm vào giỏ hàng
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productCard = button.closest(".product-card");
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = productCard.querySelector(".new-price").dataset.price;
    const image = productCard.querySelector("img").src;
    const type = productCard.querySelector(".type").innerText;
    const quantity = 1;
    const product = { id, name, price, image, type, quantity };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    showPopup();
  });
});

const closePopup = document.querySelector(".close-popup");
closePopup.addEventListener("click", closePopupFunc);
overlay.addEventListener("click", () => {
  closePopupFunc();
  closeLogin();
});

// Function to redirect to user profile
// function RedirectToUserProfile() {
//   window.location = "./Profile/profile.html";
// }

const cartButton = document.querySelector(".cart");
cartButton.addEventListener("click", RedirectToCart);

function RedirectToCart() {
  window.location = "./Cart/cart.html";
}

function RedirectToProduct() {
  window.location = "./Product/product.html";
}
