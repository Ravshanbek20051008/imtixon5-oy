import { createCard, createCard2 } from "./function.js";

const wrapper = document.querySelector("#wrapper");
const wrapper1 = document.querySelector("#wrapper1");
const loader = document.querySelector("#loader");
const btn2 = document.querySelector("#btn2");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const filterBtn = document.getElementById("Filter");

async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      return await res.json();
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function renderCards(category = "") {
  const url = category
    ? `https://cars-pagination.onrender.com/products/category?category=${category}`
    : "https://cars-pagination.onrender.com/products";

  const data = await fetchData(url);

  if (data.length) {
    const kesibolish = data.slice(0, 15);
    wrapper.innerHTML = kesibolish.map(createCard).join("");

    if (data.length > 10) {
      const limitedData1 = data.slice(10, 14);
      wrapper1.innerHTML = limitedData1.map(createCard2).join("");
    }

    addCardClickListeners();
  }
}

function addCardClickListeners() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      window.location.assign(
        `http://127.0.0.1:5500/page/details.html?id=${id}`
      );
    });
  });
}
// function addCardClickListeners() {
//   const cards = document.querySelectorAll(".card");
//   cards.forEach((card) => {
//     card.addEventListener("click", function () {
//       const id = this.getAttribute("data-id");
//       let url = window.location.href.split("/index")[0];
//       window.location.assign(`${url}/pages/details.html?id=${id}`);
//     });
//   });
// }
async function applyFilter() {
  const minPrice = minPriceInput.value;
  const maxPrice = maxPriceInput.value;

  const data = await fetchData(
    `https://cars-pagination.onrender.com/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`
  );
  wrapper.innerHTML = data.map(createCard).join("");

  addCardClickListeners();
  minPriceInput.value = "";
  maxPriceInput.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  renderCards();

  if (btn2) {
    btn2.addEventListener("change", function () {
      renderCards(this.value);
    });
  }

  if (filterBtn) {
    filterBtn.addEventListener("click", applyFilter);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  loader.remove();
});
