const captchaDisplayer = document.querySelector("#captchaCode");
const getCaptchaCode = document.querySelector("#captcha");
const captchaIcon = document.querySelector(".fa-refresh");
const emailHandler = document.querySelector("#email");
const passwordHandler = document.querySelector("#password");
const rememberMe = document.querySelector("#rememberMe");

function postLoginResponse(data, error) {
  if (error) {
    console.log("error in posting login data : ", error);
    return;
  } else {
    window.location = "http://localhost:5500/Public/index.html";
  }
}

document.querySelector(".btn-form").addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailHandler.value;
  const password = passwordHandler.value;
  const userCaptcha = getCaptchaCode.value;
  console.log("rememberme: ", rememberMe.checked);
  let shouldRemember = false;
  if (rememberMe.checked === true) {
    shouldRemember = true;
  } else {
    shouldRemember = false;
  }
  const data = {
    email,
    password,
    rememberMe: shouldRemember,
    userCaptcha,
    role: "user",
  };
  if (email.length < 1 || password.length < 1 || userCaptcha.length < 1) {
    setTimeout(() => {
      alert("همه فیلد ها باید پر بشن");
    }, 500);
  } else {
    myFetch("auth/login", "POSt", postLoginResponse, data, "postLoginResponse");
  }
});

// Captcha
let captcaCodeVar;
function displayCaptcha(response, error) {
  if (error) {
    console.log("Error in handling captcha: ", error);
    return;
  } else {
    captchaDisplayer.innerHTML = response.captcha;
  }
}
function getCapthaCode() {
  myFetch("auth/login", "GET", displayCaptcha);
}
getCapthaCode();
if (checkUserLogin()) {
  window.location = "http://localhost:5500/Public/index.html";
}
