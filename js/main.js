"use strict"; //activates strict regime

// buttonAuth.removeEventListener("click", toggleModalAuth);
// loginInput.classList.contains("notEntered");
// const BIRTHDAY = '10 march';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestuarants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("gloDelivery");

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}
function clearModalAuth() {
  logInForm.reset();
  loginInput.style.border = "";
  loginInput.placeholder = "";
  loginInput.classList.remove("notEntered");
}

function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("gloDelivery");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    containerPromo.classList.remove("hide");
    restaurants.classList.remove("hide");
    menu.classList.add("hide");
    checkAuth();
  }
  console.log("Авторизован");

  userName.textContent = login;

  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}

function notAuthorized() {
  console.log("Не авторизован");

  function logIn(event) {
    // console.log(event);
    event.preventDefault();
    login = loginInput.value;

    if (login.trim()) {
      localStorage.setItem("gloDelivery", login);

      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);
      logInForm.reset();
      loginInput.style.border = "";
      loginInput.placeholder = "";
      loginInput.classList.remove("notEntered");
      checkAuth();
    } else {
      loginInput.style.border = "2px solid #ff0000";
      loginInput.placeholder = "Введите Логин";
      loginInput.classList.add("notEntered");
    }
  }
  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", clearModalAuth);
  logInForm.addEventListener("submit", logIn);
}

//If the login contains an empty string, it means it's False
function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestuarant() {
  const card = `
    <a class="card card-restaurant">
      <img src="img/pizza-plus/preview.jpg" alt="image" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Пицца плюс</h3>
          <span class="card-tag tag">50 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 900 ₽</div>
          <div class="category">Пицца</div>
        </div>
      </div>
    </a>
  `;

  cardsRestuarants.insertAdjacentHTML("beforeend", card);
}

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";

  card.insertAdjacentHTML(
    "beforeend",
    `
    <img src="img/pizza-plus/pizza-girls.jpg" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">Пицца Девичник</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">Соус томатный, постное тесто, нежирный сыр, кукуруза, лук, маслины,
          грибы, помидоры, болгарский перец.
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">450 ₽</strong>
      </div>
    </div>
  `
  );

  cardsMenu.insertAdjacentElement("beforeend", card);

  // card.innerHTML = `
  //   <div class="card">
  //     <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image" />
  //     <div class="card-text">
  //       <div class="card-heading">
  //         <h3 class="card-title card-title-reg">Пицца Везувий</h3>
  //       </div>
  //       <div class="card-info">
  //         <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
  //           «Халапенье», соус «Тобаско», томаты.
  //         </div>
  //       </div>
  //       <div class="card-buttons">
  //         <button class="button button-primary button-add-cart">
  //           <span class="button-card-text">В корзину</span>
  //           <span class="button-cart-svg"></span>
  //         </button>
  //         <strong class="card-price-bold">545 ₽</strong>
  //       </div>
  //     </div>
  //   </div>
  // `;
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest(".card-restaurant");
  if (restaurant) {
    cardsMenu.textContent = "";
    containerPromo.classList.add("hide");
    restaurants.classList.add("hide");
    menu.classList.remove("hide");

    createCardGood();
    createCardGood();
    createCardGood();
  }
}

function goodsCheck() {
  if (login) {
    openGoods(event);
  } else {
    toggleModalAuth();
  }
}

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

cardsRestuarants.addEventListener("click", goodsCheck);
logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});

checkAuth();

createCardRestuarant();
createCardRestuarant();
createCardRestuarant();
