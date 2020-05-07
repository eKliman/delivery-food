const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// day 1

// console.log(buttonAuth);
// console.log(modalAuth);
// console.dir(modalAuth);

// buttonAuth.addEventListener("click", function () {
//   console.log("Hello");
// });

// buttonAuth.removeEventListener("click", toggleModalAuth);

// loginInput.classList.contains("notEntered");

const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");

let login = localStorage.getItem("gloDelivery");

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

    if (login) {
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

checkAuth();
