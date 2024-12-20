const logBtn = document.querySelector(".login-btn");
const modal = document.querySelector(".modal");
const closeLogBtn = document.querySelector(".modal-log-close-btn");
const overlay = document.querySelector(".overlay");

// function showLogin() {
//   modal.classList.add("open");
//   overlay.style.display = "block";
// }

// function closeLogin() {
//   modal.classList.remove("open");
//   overlay.style.display = "none";
// }

// logBtn.addEventListener("click", showLogin);
// closeLogBtn.addEventListener("click", closeLogin);

// function isUserLoggedIn() {
//   return localStorage.getItem("isLoggedIn") === "true";
// }

// function login() {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   if (username && password) {
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("username", username);
//     closeLogin();
//     updateLoginStatus();
//     alert("Đăng nhập thành công!");
//   } else {
//     alert("Vui lòng nhập tài khoản và mật khẩu.");
//   }
// }

// document.querySelector(".modal-log-btn").addEventListener("click", login);

function showPopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("open");
  overlay.style.display = "block";
}

function closePopupFunc() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("open");
  overlay.style.display = "none";
}

// Function to update login status
// function updateLoginStatus() {
//   const logBtn = document.querySelector(".login-btn");
//   const username = localStorage.getItem("username");

//   if (isUserLoggedIn() && username) {
//     const newLogBtn = document.createElement("div");
//     newLogBtn.classList.add("login-btn");
//     newLogBtn.onclick = function () {
//       RedirectToUserProfile();
//     };
//     newLogBtn.innerHTML = `<i class="fa-solid fa-user"></i>${username}`;

//     logBtn.replaceWith(newLogBtn);
//   }
// }

// updateLoginStatus();

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // if (!isUserLoggedIn()) {
    //   showLogin();
    //   return;
    // }

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
  window.location = "../Cart/cart.html";
}
