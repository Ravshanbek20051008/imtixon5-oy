const image = document.querySelector("#image");
const name = document.querySelector("#name");
const newPriceElem = document.querySelector("#newprise");
const oldPriceElem = document.querySelector("#oldprise");
const loader = document.querySelector("#loader");
const wrapper = document.querySelector("#wrapper");
const addToBagBtn = document.querySelector("#add-to-bag");

async function fetchProductData(id) {
  try {
    const response = await fetch(
      `https://cars-pagination.onrender.com/products/${id}`
    );
    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getDataFromCart() {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
}

function addToCart(product) {
  const cartData = getDataFromCart();
  const exists = cartData.some((item) => item.id === product.id);

  if (!exists) {
    cartData.push(product);
    localStorage.setItem("cart", JSON.stringify(cartData));
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    const data = await fetchProductData(id);

    if (data) {
      image.setAttribute("src", data.image);
      name.textContent = data.name;
      newPriceElem.textContent = `$${data.newPrice}`;
      oldPriceElem.textContent = `$${data.oldPrice}`;

      addToBagBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const product = {
          id: data.id,
          name: data.name,
          newPrice: data.newPrice,
          image: data.image,
        };
        addToCart(product);
        window.location.assign(
          "http://127.0.0.1:5500/5-oyImtixon-main/page/cart.html"
        );
      });
    }
  } else {
    window.location.assign("http://127.0.0.1:5500/5-oyImtixon-main/index.html");
  }
  wrapper.style.display = "flex";
  loader.remove();
});
