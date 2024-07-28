const hero = document.querySelector("#hero");
function getDatafromcard() {
  let data = [];
  if (localStorage.getItem("cart")) {
    data = JSON.parse(localStorage.getItem("cart"));
  }
  return data;
}
function createCard(product) {
  return `
    <div class="quti">
      <div class="image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="title">
        <h3 class="titlename">${product.name}</h3>
        <h3 class="padarok">
          + Подарок: <span>“Приложение к замкам Golden”</span>
        </h3>
        <select class="quantity-select" data-id="${product.id}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div class="ochirish">
        <div class="trash" data-id="${product.id}">
          <img src="../img/trash.png" alt="" />
          <h3>Удалить</h3>
        </div>
        <h3 class="trash-h3">$${product.newPrice}</h3>
      </div>
    </div>
  `;
}

function umumiynarxi() {
  const prices = document.querySelectorAll(".trash-h3");
  let totalPrice = 0;

  prices.forEach((price) => {
    const priceValue = parseFloat(price.textContent.replace("$", ""));
    totalPrice += priceValue;
  });

  document.querySelector("#total-price").textContent =
    "$" + totalPrice.toFixed();
}

async function fetchProduct(id) {
  const response = await fetch(
    `https://cars-pagination.onrender.com/products/${id}`
  );
  if (response.ok) {
    return await response.json();
  } else {
  }
}

async function renderCards() {
  let datacard = getDatafromcard();
  if (datacard.length) {
    hero.innerHTML = "";
    for (const product of datacard) {
      let card = createCard(product);
      hero.innerHTML += card;
    }

    const deleteButtons = document.querySelectorAll(".trash");
    deleteButtons.forEach(function (deleteButton) {
      deleteButton.addEventListener("click", async function () {
        let isDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
        let id = this.getAttribute("data-id");
        if (isDelete && id) {
          this.parentNode.parentNode.remove();
          datacard = datacard.filter(function (el) {
            return el.id != id;
          });
          localStorage.setItem("cart", JSON.stringify(datacard));
          await renderCards();
          umumiynarxi();
        }
      });
    });
  }

  umumiynarxi();
}

document.addEventListener("DOMContentLoaded", async function () {
  await renderCards();
});
