function createCard(data) {
  return `

    <div class="card" data-id="${data.id}">
      <img src="${data.image}" alt="" />
      <div class="box1">
        <h4>${data.isExist ? "В наличии" : "Нет в наличии"}</h4>
        <button>SALE</button>
      </div>
      <div class="box2">
        <button>
          <img src="img/gift 1.svg" alt="gif" />Подарок
        </button>
      </div>
      <div class="izoh">
        <div class="yulduz">
          <h4>${data.star} <img src="img/Vector (2).png" alt="" /></h4>
          <h4>(${data.comments}) отзывов</h4>
        </div>
        <p>${data.name}</p>
        <div class="narxi">
          <h3>$${data.newPrice}</h3>
          <h3 class="narx-h3">$${data.oldPrice}</h3>
        </div>
      </div>
    </div>
  `;
}

function createCard2(data) {
  return `
    <div class="card qulf1" data-id="${data.id}">
      <img src="${data.image}" alt="" />
      <div class="box1">
        <h4>${data.isExist ? "В наличии" : "Нет в наличии"}</h4>
        <button>SALE</button>
      </div>
      <div class="box2">
        <button>
          <img src="img/gift 1.svg" alt="gif" />Подарок
        </button>
      </div>
      <div class="izoh">
        <p>${data.name}</p>
        <div class="narxi">
          <h3>$${data.newPrice}</h3>
          <h3 class="narx-h3">$${data.oldPrice}</h3>
        </div>
      </div>
    </div>
  `;
}

export { createCard, createCard2 };
