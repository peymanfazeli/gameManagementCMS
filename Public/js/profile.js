const panels = document.querySelectorAll(".panel");
const covers = document.querySelectorAll(".cover");
const changePasswordBtn = document.querySelector("#changePasswordBtn");
const changeUserNameBtn = document.querySelector("#changeUserNameBtn");
const changePasswordInput = document.querySelector("#changePasswordInput");
const changeUserNameInput = document.querySelector("#changeUserNameInput");

const ctgContainer = document.querySelector(".categoryContainer");
const allCtgs = document.querySelector("#allCtgs");
const yourCtgs = document.querySelector("#yourCtgs");
const categoryAdd = document.querySelector("#categoryAdd");
const categoryDelete = document.querySelector("#categoryDelete");
// Client Side
covers.forEach((cover) => {
  cover.addEventListener("click", () => {
    addCover();
    cover.style.top = "-100vh";
  });
});
function addCover() {
  covers.forEach((cover) => {
    cover.style.top = 0;
  });
}
panels.forEach((panel) => {
  panel.addEventListener("click", () => {
    removeActiveClass();
    panel.classList.add("active");
  });
});
function removeActiveClass() {
  panels.forEach((deleteActive) => {
    deleteActive.classList.remove("active");
    // deleteActive.classList.add("cover");
  });
}

// Server connection
function makeCtgs(response) {
  let allCategories = response.allCtg;
  let userCategories = response.userCtg;
  htmlString = "";
  allCategories.forEach((ctg) => {
    htmlString += ` <label class="radio">
      <input name="radio" type="radio"  id='${ctg._id}' onclick="getCtgValue(this)" >
      <span >${ctg.name}</span>
    </label>`;
  });
  makeElement(htmlString, allCtgs);
  htmlString = "";
  // user's categories part
  if (userCategories.length < 1) {
    htmlString = `<h3 id='noUserCtg'> هنوز دسته بندی ای انتخاب نکردی</h3>`;
    makeElement(htmlString, yourCtgs);
    htmlString = "";
  } else {
    let noUserCtgSign = document.getElementById("noUserCtg");
    if (noUserCtgSign) {
      noUserCtgSign.remove();
    }
    userCategories.forEach((ctg) => {
      htmlString += ` <label class="radio">
        <input name="radio" type="radio"  id='${ctg._id}' onclick="getCtgValue(this)" >
        <span >${ctg.name}</span>
      </label>`;
    });
    makeElement(htmlString, yourCtgs);
    htmlString = "";
  }
}
function getAllCtg() {
  myFetch("categories", "GET", makeCtgs);
}
function checkPasword(response) {
  if (response.code === 400) {
    console.log("Error in pass", response);
    setTimeout(() => {
      alert("رمز عبور باید شامل حروف کوچیک بزرگ و عدد باشه");
      changePasswordInput.value = "";
    }, 500);
  } else {
    setTimeout(() => {
      alert("تغییرات ذخیره شد"), location.reload();
    }, 500);
  }
}
function updateData(type) {
  let userName = changeUserNameInput.value;
  let password = changePasswordInput.value;
  let updateInfo;
  type === "userName"
    ? (updateInfo = { userName })
    : (updateInfo = { password });
  myFetch("profile/update", "POST", checkPasword, updateInfo);
}
function ctgResponse(response) {
  setTimeout(() => {
    alert("دسته بندی ها آپدیت شد");
    location.reload();
  }, 500);
}
let category;
function updateCtg() {
  category = newCategoryList;
  console.log("new ctg for sending to server: ", category);
  myFetch("profile/ctgUpdate", "POST", ctgResponse, { category });
}
function deleteCtg() {
  category = newCategoryList;
  myFetch("profile/ctgDelete", "POST", ctgResponse, { category });
}

changeUserNameBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  updateData("userName");
});
changePasswordBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await updateData("password");
});
categoryAdd.addEventListener("click", (e) => {
  e.preventDefault();
  updateCtg();
});
categoryDelete.addEventListener("click", (e) => {
  e.preventDefault();
  deleteCtg();
});
getAllCtg();
