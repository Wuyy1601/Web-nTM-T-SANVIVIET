document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const billContainer = document.getElementById("bill-container");
  const shoppingCart = document.getElementById("shopping-cart");
  const aboutCart = document.getElementById("about-cart");
  const payBtn = document.getElementById("pay-btn");
  const formInfor = document.querySelector(".form-info");
  const closeFormInfor = document.querySelector(".form-close-btn");
  const overlay = document.querySelector(".overlay");
  const backToCartBtn = document.querySelector(".return-btn");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    cart.forEach((product, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}" /></td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${parseFloat(product.price).toLocaleString("vi-VN")} ₫</td>
        <td>
          <button class="quantity-btn minus" data-index="${index}">-</button>
          <input type="text" value="${
            product.quantity
          }" class="quantity" data-index="${index}" />
          <button class="quantity-btn plus" data-index="${index}">+</button>
        </td>
        <td class="item-total">${(
          product.quantity * parseFloat(product.price)
        ).toLocaleString("vi-VN")} ₫</td>
        <td><button class="remove-btn" data-index="${index}"><i class="fa-solid fa-xmark"></i></button></td>
      `;
      cartItemsContainer.appendChild(row);
    });
    attachEventListeners();
    updateTotal();
  }

  function attachEventListeners() {
    document.querySelectorAll(".quantity-btn").forEach((btn) => {
      btn.addEventListener("click", changeQuantity);
    });
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", removeItem);
    });
    document.querySelector(".pay-btn").addEventListener("click", showBill);
    document.querySelector(".checkout-btn").addEventListener("click", showForm);
    document
      .querySelector(".form-close-btn")
      .addEventListener("click", closeForm);
    document.querySelector(".return-btn").addEventListener("click", backToCart);
  }

  function changeQuantity(event) {
    const index = event.target.dataset.index;
    const isPlus = event.target.classList.contains("plus");
    const quantityInput = document.querySelector(
      `input.quantity[data-index="${index}"]`
    );
    let quantity = parseInt(quantityInput.value);

    if (isPlus) {
      quantity += 1;
    } else if (quantity > 1) {
      quantity -= 1;
    }

    quantityInput.value = quantity;
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart)); // Cập nhật lại giỏ hàng trong LocalStorage

    const price = parseFloat(cart[index].price);
    const itemTotal = document.querySelectorAll(".item-total")[index];
    itemTotal.innerText = (quantity * price).toLocaleString("vi-VN") + " ₫";

    updateTotal();
  }

  function removeItem(event) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function updateTotal() {
    const itemTotals = document.querySelectorAll(".item-total");
    let total = 0;
    itemTotals.forEach((totalEl) => {
      total += parseFloat(
        totalEl.innerText.replace(" ₫", "").replace(/\./g, "")
      );
    });
    const formattedTotal = total.toLocaleString("vi-VN") + " ₫";
    document.querySelector(".total-price").innerText = formattedTotal;
    document.querySelector(".summary-info span:nth-child(2) b").innerText =
      formattedTotal;
    document.querySelector(".summary-info span:nth-child(3) b").innerText =
      formattedTotal;
  }

  function applyCoupon() {
    const couponInput = document.querySelector(".coupon input").value.trim();
    const saleOffPriceEl = document.querySelector(".sale-off-price b");
    const totalPriceEl = document.querySelector(".total-price");
    const originalTotal = parseFloat(
      totalPriceEl.innerText.replace(" ₫", "").replace(/\./g, "")
    );
    let discount = 0;

    if (couponInput === "SANVIVIET") {
      discount = originalTotal * 0.2;
    } else {
      alert("Mã khuyến mãi không hợp lệ!");
      saleOffPriceEl.innerText = "0 ₫";
      return;
    }

    const finalTotal = originalTotal - discount;
    saleOffPriceEl.innerText = discount.toLocaleString("vi-VN") + " ₫";
    totalPriceEl.innerText = finalTotal.toLocaleString("vi-VN") + " ₫";
    document.querySelector(".summary-info span:nth-child(3) b").innerText =
      finalTotal.toLocaleString("vi-VN") + " ₫";
  }

  function showBill() {
    payBtn.style.display = "none";
    aboutCart.style.display = "none";
    shoppingCart.style.display = "none";
    billContainer.style.display = "block";

    const billItemsContainer = document.getElementById("bill-items");
    billItemsContainer.innerHTML = "";
    cart.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}" /></td>
        <td>${product.name}</td>
        <td>${product.type}</td>
        <td>${parseFloat(product.price).toLocaleString("vi-VN")} ₫</td>
        <td><input type="text" value="${
          product.quantity
        }" class="quantity-bill" readonly /></td>
        <td class="item-total-bill">${(
          product.quantity * parseFloat(product.price)
        ).toLocaleString("vi-VN")} ₫</td>
      `;
      billItemsContainer.appendChild(row);
    });

    const totalPriceBillEl = document.getElementById("total-price-bill");
    const totalPriceEl = document.querySelector(".total-price");
    totalPriceBillEl.innerText = totalPriceEl.innerText;

    const savingAmountEl = document.querySelector(".saving-amount");
    const finalAmountEl = document.querySelector(".total-amount");
    savingAmountEl.innerText =
      document.querySelector(".sale-off-price b").innerText;
    const totalPriceBillValue = parseFloat(
      totalPriceBillEl.innerText.replace(" ₫", "").replace(/\./g, "")
    );
    let finalAmountValue = totalPriceBillValue + 30000;

    if (totalPriceBillValue === 0) {
      finalAmountValue = 0;
    }

    finalAmountEl.innerText = finalAmountValue.toLocaleString("vi-VN") + " ₫";
  }

  function showForm() {
    formInfor.style.display = "block";
    overlay.style.display = "block";
  }

  function closeForm() {
    formInfor.style.display = "none";
    overlay.style.display = "none";
  }

  function backToCart() {
    payBtn.style.display = "flex";
    aboutCart.style.display = "flex";
    shoppingCart.style.display = "block";
    billContainer.style.display = "none";
  }

  document
    .querySelector(".apply-coupon")
    .addEventListener("click", applyCoupon);

  renderCart(); // Gọi để render giỏ hàng ban đầu
});
