'use strict'; //activates strict regime

// buttonAuth.removeEventListener("click", toggleModalAuth);
// loginInput.classList.contains("notEntered");
// const BIRTHDAY = '10 march';

const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.getElementById('logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestuarants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurantTitle = document.querySelector('.restaurant-title');
const rating = document.querySelector('.rating');
const minPrice = document.querySelector('.price');
const category = document.querySelector('.category');
const inputSearch = document.querySelector('.input-search');

let login = localStorage.getItem('gloDelivery');

const getData = async function (url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Ошибка по адресу ${url}, статус ошибки ${response.status}!`
    );
  }
  return await response.json();
};

const valid = function (str) {
  const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
  return nameReg.test(str);
};

function toggleModal() {
  modal.classList.toggle('is-open');
}

function toggleModalAuth() {
  modalAuth.classList.toggle('is-open');
}
function clearModalAuth() {
  logInForm.reset();
  loginInput.style.border = '';
  loginInput.placeholder = '';
  loginInput.classList.remove('notEntered');
}

function authorized() {
  function logOut() {
    login = null;
    localStorage.removeItem('gloDelivery');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut);
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
    checkAuth();
  }
  console.log('Авторизован');

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
  console.log('Не авторизован');

  function logIn(event) {
    // console.log(event);
    event.preventDefault();
    login = loginInput.value;

    if (valid(loginInput.value)) {
      localStorage.setItem('gloDelivery', login);

      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click', toggleModalAuth);
      logInForm.removeEventListener('submit', logIn);
      logInForm.reset();
      loginInput.style.border = '';
      loginInput.placeholder = '';
      loginInput.classList.remove('notEntered');
      checkAuth();
    } else {
      loginInput.style.border = '2px solid #ff0000';
      loginInput.placeholder = 'Введите Логин';
      loginInput.classList.add('notEntered');
      loginInput.value = '';
    }
  }
  buttonAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', clearModalAuth);
  logInForm.addEventListener('submit', logIn);
}

//If the login contains an empty string, it means it's False
function checkAuth() {
  if (login) {
    authorized();
  } else {
    notAuthorized();
  }
}

function createCardRestaurant({
  image,
  kitchen,
  name,
  price,
  products,
  stars,
  time_of_delivery: timeOfDelivery,
}) {
  const card = document.createElement('a');
  card.className = 'card card-restaurant';
  card.products = products;
  card.info = [name, price, stars, kitchen];

  card.insertAdjacentHTML(
    'beforeend',
    `
      <img src="${image}" alt="image" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${timeOfDelivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
          ${stars}
          </div>
          <div class="price">${price}</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    `
  );

  cardsRestuarants.insertAdjacentElement('beforeend', card);
}
// function createCardRestaurant(restaurant) {
//   const {
//     image,
//     kitchen,
//     name,
//     price,
//     products,
//     stars,
//     time_of_delivery: timeOfDelivery,
//   } = restaurant;
//   const card = `
//     <a class="card card-restaurant" data-products="${products}"
//     data-info="${[name, price, stars, kitchen]}">
//       <img src="${image}" alt="image" class="card-image" />
//       <div class="card-text">
//         <div class="card-heading">
//           <h3 class="card-title">${name}</h3>
//           <span class="card-tag tag">${timeOfDelivery} мин</span>
//         </div>
//         <div class="card-info">
//           <div class="rating">
//           ${stars}
//           </div>
//           <div class="price">${price}</div>
//           <div class="category">${kitchen}</div>
//         </div>
//       </div>
//     </a>
//   `;

//   cardsRestuarants.insertAdjacentHTML("beforeend", card);
// }

// function createRestInfo() {
//   const section = `
//     <h2 class="section-title restaurant-title">Пицца Плюс</h2>
//     <div class="card-info">
//       <div class="rating">
//         4.5
//       </div>
//       <div class="price">От 900 ₽</div>
//       <div class="category">Пицца</div>
//     </div>
//   `;

//   sectionHeading.insertAdjacentHTML("beforeend", section);
// }

function createCardGood({ description, image, name, price }) {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML(
    'beforeend',
    `
    <img src="${image}" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
        <div class="ingredients">${description}
        </div>
      </div>
      <div class="card-buttons">
        <button class="button button-primary button-add-cart">
          <span class="button-card-text">В корзину</span>
          <span class="button-cart-svg"></span>
        </button>
        <strong class="card-price-bold">${price} ₽</strong>
      </div>
    </div>
  `
  );

  cardsMenu.insertAdjacentElement('beforeend', card);

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
  const restaurant = target.closest('.card-restaurant');
  if (restaurant) {
    // const info = restaurant.dataset.info.split(",");
    const [name, price, stars, kitchen] = restaurant.info;
    cardsMenu.textContent = '';
    containerPromo.classList.add('hide');
    restaurants.classList.add('hide');
    menu.classList.remove('hide');

    restaurantTitle.textContent = name;
    rating.textContent = stars;
    minPrice.textContent = `От ${price} ₽`;
    category.textContent = kitchen;

    getData(`./db/${restaurant.products}`).then(function (data) {
      data.forEach(createCardGood);
    });
  }
}

function goodsCheck() {
  if (login) {
    openGoods(event);
  } else {
    toggleModalAuth();
  }
}

function init() {
  getData('./db/partners.json').then(function (data) {
    data.forEach(createCardRestaurant);
  });

  cartButton.addEventListener('click', toggleModal);
  close.addEventListener('click', toggleModal);

  cardsRestuarants.addEventListener('click', goodsCheck);
  logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide');
    restaurants.classList.remove('hide');
    menu.classList.add('hide');
  });

  inputSearch.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      // console.log(inputSearch.value);
      // console.log(event.target.value);
      const target = event.target;
      const value = target.value.toLowerCase().trim();
      target.value = '';
      if (!value || value.length < 3) {
        target.style.backgroundColor = 'tomato';
        setTimeout(function () {
          target.style.backgroundColor = '';
        }, 2000);
        return;
      }
      const goods = [];

      getData('./db/partners.json').then(function (data) {
        const products = data.map(function (item) {
          return item.products;
        });

        products.forEach(function (product) {
          getData(`./db/${product}`)
            .then(function (data) {
              goods.push(...data);
              const searchGoods = goods.filter(function (item) {
                return item.name.toLowerCase().includes(value);
              });
              cardsMenu.textContent = '';
              containerPromo.classList.add('hide');
              restaurants.classList.add('hide');
              menu.classList.remove('hide');

              restaurantTitle.textContent = 'Результат поиска';
              rating.textContent = '';
              minPrice.textContent = '';
              category.textContent = '';

              return searchGoods;
            })
            .then(function (data) {
              data.forEach(createCardGood);
            });
        });
      });
    }
  });

  checkAuth();

  new Swiper('.swiper-container', {
    loop: true,
    autoplay: true,
    disableOnInteraction: false,
  });
}

init();
