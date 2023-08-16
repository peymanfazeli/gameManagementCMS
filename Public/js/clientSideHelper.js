let signup = document.querySelector("#signup");
let loginBtn = document.querySelector("#loginBtn");
let profileBtn = document.querySelector("#profileBtn");
let userNameBtn = document.querySelector("#userNameBtn");
let logout = document.querySelector("#logout");
let adminBtn = document.querySelector("#adminBtn");

function displayLoginBtn(
  userName = "پروفایل",
  background = "transparent",
  isAdmin
) {
  signup.style.display = "none";
  loginBtn.style.display = "none";
  profileBtn.style.display = "inline-block";
  profileBtn.innerHTML = userName;
  profileBtn.style.backgroundImage = `url(${background})`;

  if (isAdmin) {
    adminBtn.style.display = "inline-block";
    adminBtn.innerHTML = "پنل مدیریت";
  } else {
    adminBtn.style.display = "none";
  }

  logout.style.display = "inline-block";
}

function offDisplayLogin() {
  if (window.location.href !== "http://localhost:5500/Public/login.html") {
    signup.style.display = "inline-block";
    loginBtn.style.display = "inline-block";
    profileBtn.style.display = "none";
    logout.style.display = "none";
    adminBtn.style.display = "none";
  }
}

function clearSession() {
  console.log("session must be cleared");

  fetch("http://localhost:3001/auth/logout", {
    method: "GET",
    credentials: "include",
  }).then(async (clearSessionRes) => {
    // console.log("session response", await clearSessionRes.json());
    try {
      if (clearSessionRes.status === 200) {
        console.log("session response", clearSessionRes);
        window.location = "http://localhost:5500/Public/login.html";
      }
    } catch (error) {
      console.log("Error in parsing clear session response: ", error);
    }
  });
}

const winLoc = "http://localhost:5500/Public/profile.html";
const generalPhoto = "";
function displayUserName(userName, userPhto) {
  if (window.location.href === winLoc && document.cookie !== "") {
    profileBtn.style.display = "none";
    userNameBtn.style.display = "inline-block";
    userNameBtn.innerHTML = userName;
  } else {
    userNameBtn.style.display = "none";
    window.location = "http://localhost:5500/Public/login.html";
  }
}
// function getProfile(response) {
//   let isAdmin;
//   console.log("response for getting profile: ", response);
//   // if (response.user.role === "admin") {
//   //   isAdmin = true;
//   // } else {
//   //   isAdmin = false;
//   // }
//   // let userAvatarPath = response.user.avatar;
//   // let userAvatarFile = userAvatarPath.replace(
//   //   "C:/xampp/htdocs/IE-Express/Public/",
//   //   ""
//   // );
//   // console.log("user avatar file: ", userAvatarFile);
//   // displayLoginBtn(response.user.userName, userAvatarFile, isAdmin);
//   // updateData(response.user.token);
// }

let newCategoryList;
function getCtgValue(option) {
  console.log(
    "value of option in getCtgValue=>clientSideHelper.js: ",
    option.id
  );
  newCategoryList = { _id: option.id };
  return newCategoryList;
}
function makeInputEmpty(item) {
  item.value = "";
}
// My Fetch
function myFetch(path, method, callBack, data = "", func = "") {
  fetch(
    `http://localhost:3001/${path}`,
    method === "GET"
      ? { method: method, credentials: "include" }
      : {
          method: method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
  ).then(async (response) => {
    try {
      if (response.status === 200) {
        // callBack(await response.json(), null);
        callBack(await response.json(), null);
        console.log("response ok", response.status);
      } else if (response.status !== 200) {
        throw new Error(response.status);
      }
    } catch (error) {
      let errCode = Number(error.message);
      if (errCode === 201) {
        callBack(
          null,
          setTimeout(() => {
            alert("کدایمیل شده");
            window.location =
              "http://localhost:5500/Public/mailCodeValidation.html";
          }, 500)
        );
      } else if (errCode === 400) {
        callBack(
          null,
          setTimeout(() => {
            if (func !== "registerDataResponse") {
              alert("چیزی که دنبالشی تو دیتابیس نداریم");
            } else if (func === "registerDataResponse") {
              alert("ایمیلت تکراریه");
            }
          }, 500)
        );
      } else if (errCode === 401) {
        callBack(
          null,
          setTimeout(() => {
            if (func === "updateData") {
              alert("رمز عبور باید شامل حروف کوچیک و بزرگ و عددباشه");
            } else {
              alert("ایمیل یا رمز عبور رو اشتباه وارد کردی");
            }
          }, 500)
        );
      } else if (errCode === 403) {
        // console.log("errCode is : ", errCode);
        callBack(
          null,
          setTimeout(() => {
            alert("کد ارسالی تایید نشده");
            window.location =
              "http://localhost:5500/Public/mailCodeValidation.html";
          }, 500)
        );
      } else if (errCode === 404) {
        callBack(
          null,
          setTimeout(() => {
            alert("فیلد مورد نظر رو پر کن");
          }, 500)
        );
      } else if (errCode === 409) {
        callBack(
          null,
          setTimeout(() => {
            alert("قبلا انتخابش کردی");
          }, 500)
        );
      } else if (errCode === 498) {
        callBack(
          null,
          setTimeout(() => {
            alert("کپجا اشتباهه");
          }, 500)
        );
      }
    }
  });
}
function correctImgAddress(entityImg) {
  if (entityImg) {
    return entityImg.replace("C:/xampp/htdocs/IE-Express/Public/", "");
  } else {
    return;
  }
}

// Logged in Profile data:
function getProfileData(response) {
  let userProfile = response.userProfile;
  let id = userProfile._id;
  let isAdmin;
  if (userProfile.role === "admin") {
    isAdmin = true;
  } else {
    isAdmin = false;
  }
  let userAvatarPath = userProfile.avatar;
  let userAvatarFile = userAvatarPath.replace(
    "C:/xampp/htdocs/IE-Express/Public/",
    ""
  );
  displayLoginBtn(userProfile.userName, userAvatarFile, isAdmin);
  return id;
}
function getProfile() {
  myFetch("profile", "GET", getProfileData);
}
function checkUserLogin() {
  if (document.cookie !== "") {
    getProfile();
    return true;
  } else {
    offDisplayLogin();
    return false;
  }
}
