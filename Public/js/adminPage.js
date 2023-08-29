// Handlers
const panels = document.querySelectorAll(".panel");
const gameSetting = document.getElementById("gameSetting");
// players section
const allPlayersSection = document.querySelector(".allPlayers");
// game search for update
const searchGameUpdateInputs = document.getElementById(
  "searchGameUpdateInputs"
);
const gameIdInput = document.querySelector("#gameIdInput");
const gameAvatar = document.querySelector("#gameAvatar");
let currentAction = gameAvatar.action;
const searchBtn = document.querySelector("#searchBtn");
const updateGameBtn = document.querySelector("#updateGameBtn");
const deleteGameBtn = document.querySelector("#deleteGameBtn");
const updateGameDataForm = document.querySelector(".updateGameData");
const gameUpdatedInfoInput = document.querySelector("#gameUpdatedInfoInput");
const gameUpdatedAbstractInput = document.querySelector(
  "#gameUpdatedAbstractInput"
);
const gameUpdatedCtgInput = document.querySelector("#updateGameCtgInput");
const gameUpdatedNameInput = document.querySelector("#gameUpdatedNameInput");
const dropdownUpdate = document.querySelector("#dropdownContentUpdate");
// newGame handlers
const gameNameInput = document.querySelector("#gameNameInput");
const abstractInput = document.querySelector("#abstractInput");
const infoInput = document.querySelector("#infoInput");
const newGameCtgInput = document.querySelector("#newGameCtgInput");
const gameIdSpan = document.querySelector(".gameIdSpan");
const dropdownContents = document.querySelectorAll(".dropdown-content");
const dropdownRegister = document.querySelector("#dropdownContentRegister");
// new Ctg Handler
const categoryNameInput = document.querySelector("#categoryNameInput");

// Client Side
function changeCtgInputVal(ctgName) {
  newGameCtgInput.value = ctgName;
}
function updateData(response, error) {
  if (error) {
    return;
  } else {
    if (response.unAuthCode) {
      setTimeout(() => {
        alert(" به دلیل وقفه طولانی باید مجددا وارد سایت شی"),
          (window.location = "http://localhost:5500/Public/login.html");
      }, 500);
    } else {
      setTimeout(() => {
        alert("تغییرات ذخیره شد"), location.reload();
      }, 500);
    }
  }
}
function grantPlayer(_id) {
  const data = { _id };
  myFetch("admin/grantPlayer", "POST", updateData, data);
}
function disallowPlayer(_id) {
  const data = { _id };
  myFetch("admin/disallowPlayer", "POST", updateData, data);
}
function deletePlayer(_id) {
  const data = { _id };
  myFetch("admin/deletePlayer", "POST", updateData, data);
}
let string = "";
async function adminAllCtgCb(ctgResponse, type) {
  // let response = await ctgResponse.json();

  let response = await ctgResponse;
  let allCategories = response.allCtg;
  console.log("admin all ctgs: ", allCategories);
  allCategories.forEach((ctg) => {
    // makeString(ctg.name);
    string += `<label class="radio">
        <input name="radio" class='adminCtgIdentifier' type="radio"  id='${ctg._id}' onclick="getCtgValue(this)" >
        <span >${ctg.name}</span>
      </label>`;
  });
  if (type === "register") {
    makeElement(string, dropdownRegister);
    const adminCtgIdentifiers = document.querySelectorAll(
      ".adminCtgIdentifier"
    );
    adminCtgIdentifiers.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        newGameCtgInput.value = btn.nextElementSibling.innerText;
      });
      string = "";
    });
  } else if (type !== "register") {
    if (dropdownUpdate.children.length < 1) {
      makeElement(string, dropdownUpdate);
      let ctgIdentifiers = dropdownUpdate.children[0].children;
      for (let index = 0; index < ctgIdentifiers.length; index++) {
        ctgIdentifiers[index].children.radio.setAttribute(
          "class",
          "updatedCtgIdentifiers"
        );
      }
      const updatedCtgIdentifiers = document.querySelectorAll(
        ".updatedCtgIdentifiers"
      );
      updatedCtgIdentifiers.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          gameUpdatedCtgInput.value = btn.nextElementSibling.innerText;
        });
      });
      string = "";
    } else {
      return;
    }
  }
}

function allPlayersCb(response, error) {
  if (error) {
    console.log("Error in getting all players: ", error);
    return;
  } else {
    const allPlayers = response.players;
    string = "";
    allPlayers.forEach((player) => {
      string += ` <li>
      <span id='${player._id}'>${player.userName}</span>
      <button class="btn practical" id="grantPlayer" onclick='grantPlayer("${player._id}")'>
        افزایش اختیارات
      </button>
      <button class="btn practical" id="disallowPlayer" onclick='disallowPlayer("${player._id}")'>
    کاهش اختیارات
    </button>
      <button class="btn practical" id="deletePlayer" onclick='deletePlayer("${player._id}")'>
        حذف
      </button>
    </li>`;
    });
    makeElement(string, allPlayersSection);
    string = "";
  }
}
const getAllPlayers = myFetch("admin/allPlayers", "GET", allPlayersCb);

const getAdminAllCtg = (type) => {
  myFetch("categories", "GET", (response) => adminAllCtgCb(response, type));
};
getAdminAllCtg("register");
// Server connection

// click
document.querySelector("#registerGameBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const title = gameNameInput.value.split(" ").join("");
  const abstract = abstractInput.value;
  const info = infoInput.value;
  const categories = newGameCtgInput.value;
  const data = { title, abstract, info, categories };
  myFetch("games/postGame", "POST", updateData, data);
});
document
  .querySelector("#registerCtgBtn")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const name = categoryNameInput.value;
    myFetch("categories/addCtg", "POST", updateData, {
      name,
    });
  });
console.log("game avatar form: ", gameAvatar);
console.log("current action", currentAction);
function fillUpdateGameDataInput(response) {
  console.log("response in searching games: ", response);
  let game = response.game;
  updateGameDataForm.style.display = "flex";
  gameIdInput.value = game._id;
  gameAvatar.action = currentAction + game._id;
  gameUpdatedNameInput.value = game.title;
  gameUpdatedAbstractInput.value = game.abstract;
  gameUpdatedInfoInput.value = game.info;
  gameUpdatedCtgInput.value = game.categories;
  getAdminAllCtg("update");
  makeInputEmpty(gameNameInput);
}

function fillCtgItemsInUpdateGameDataForm(response, error) {
  if (error) {
    console.log("Error in filling ctgItems in update dataForm: ", error);
    return;
  } else {
    if (response.unAuthCode) {
      setTimeout(() => {
        alert(" به دلیل وقفه طولانی باید مجددا وارد سایت شی"),
          (window.location = "http://localhost:5500/Public/login.html");
      }, 500);
    } else {
      // setTimeout(() => {
      //   alert("تغییرات ذخیره شد"), location.reload();
      // }, 500);
      const adminCtgIdentifiers = document.querySelectorAll(
        ".adminCtgIdentifier"
      );
      adminCtgIdentifiers.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          gameUpdatedCtgInput.value = btn.nextElementSibling.innerText;
        });
      });
      updateData();
    }
  }
}
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let gameName = searchGameUpdateInputs.value.split(" ").join("");
  console.log("game name: ", gameName);
  myFetch(
    `games/${gameName}`,
    "GET",
    fillUpdateGameDataInput,
    "",
    "fillUpdateGameData"
  );
});
updateGameBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let _id = gameIdInput.value;
  let title = gameUpdatedNameInput.value.split(" ").join("");
  let abstract = gameUpdatedAbstractInput.value;
  let info = gameUpdatedInfoInput.value;
  let categories = gameUpdatedCtgInput.value;
  const data = { _id, title, abstract, info, categories };
  myFetch("games/updateGame", "POST", fillCtgItemsInUpdateGameDataForm, data);
});
deleteGameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let _id = gameIdInput.value;
  const data = { _id };
  myFetch("games/deleteGame", "POST", updateData, data);
});
if (!checkUserLogin()) {
  window.location = "http://localhost:5500/Public/login.html";
}
