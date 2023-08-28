// handlers
const body = $("body");
const banner = $(".banner");
const bannerTitle = $("#bannerTitle");
// mainBody handlers
const aside = $("aside");
const gameRating = $(".gameRating");
const gList = $(".gList");
let allCats;
// const allCats = {
//   all: "همه",
//   shooting: "تیراندازی",
//   action: "اکشن",
//   firesPerson: "اول شخص",
//   thirdPerson: "سوم شخص",
//   sport: "ورزشی",
//   mental: "فکری",
//   role: "نقش آفرینی",
//   strategic: "استراتژیک",
//   adventure: "ماجراجویی",
// };
const allTitles = {
  gameCtg: "دسته بندی بازی ها",
  gameRate: "امتیاز بازی ها",
};
// aside section
// category Part
function gameListCtgPart(response, error) {
  if (error) {
    console.log("Error in making categories for gameList: ", error);
    return;
  } else {
    console.log(
      "response in making categories for gameList: ",
      response.allCtg
    );
    let allCategories = response.allCtg;
    htmlCatString = "";
    allCategories.forEach((cat) => {
      // catArray.push(cat.name);
      ctgs += `<li class="catItem">
              <input class="ctgCheck" type="checkbox">
              <span class="catId" id="ctg${cat._id}">${cat.name}</span>
            </li>
      `;
    });
    htmlCatString = `
        <span>${allTitles.gameCtg}</span>
          <ul id='ctgContainer'>
           ${ctgs}
          </ul>
        `;
    makeElement(htmlCatString, categorySection);
  }
  $(".catItem").on("click", function () {
    // isDataLoading = true;
    // loaderChecker(isDataLoading);
    // if (isDataLoading) {
    //   return;
    // }
    // isDataLoading = true;
    loadFilters($(this), ".catItem");
    // isDataLoading = false;
    // loaderChecker(isDataLoading);
  });
}
let ctgs = "";
const categorySection = $(".category");
const ratingSection = $(".gameRating");
function makeCategoryPart() {
  myFetch("categories", "GET", gameListCtgPart, "", "gameListCtgPart");
  // console.log("all ctg", ct);
  //   Object.values(allCats).forEach((cat) => {
  //     ctgs += `<li class="catItem">
  //         <input class="ctgCheck" type="checkbox">
  //         <span class="catId">${cat}</span>
  //       </li>
  // `;
  //   });
  //   htmlString = `
  //   <span>${allTitles.gameCtg}</span>
  //     <ul id='ctgContainer'>
  //      ${ctgs}
  //     </ul>
  //   `;
  //   makeElement(htmlString, categorySection);
}

// gameRating part
let srContainers;
let star_containers;
function makeRatingPart() {
  htmlString = "";
  htmlString = `
  <span>${allTitles.gameRate}</span>
  <!-- Stars First Row -->
  <div class="gamesStarRating">          
    <div class="srContainer" starNumber="5">
      <input type="checkbox">
      <span class="srWrapper">
          <div class="star-container inactive">
            <i class="fa-star fa-solid"></i>
          </div>
          <div class="star-container inactive">
            <i class="fa-star fa-solid"></i>
          </div>
          <div class="star-container inactive">
            <i class="fa-star fa-solid"></i>
          </div>
          <div class="star-container inactive">
            <i class="fa-star fa-solid"></i>
          </div>
          <div class="star-container inactive">
            <i class="fa-star fa-solid"></i>
          </div>
        </span>
    </div>
  <!-- Stars Second Row -->
  <div class="srContainer" starNumber="4">
  <input type="checkbox">
  <span class="srWrapper">
      <div class="star-container inactive">
        <i class="fa-star fa-solid"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-star fa-solid"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-star fa-solid"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-star fa-solid"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-regular fa-star"></i>
      </div>
    </span>
  </div>
  <!-- Stars third Row -->
  <div class="srContainer" starNumber="3">
  <input type="checkbox">
  <span class="srWrapper">
    <div class="star-container inactive">
      <i class="fa-star fa-solid"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-star fa-solid"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-star fa-solid"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    </span>
  </div>
  <!-- Stars fourth Row -->
  <div class="srContainer" starNumber="2">
  <input type="checkbox">
  <span class="srWrapper">
    <div class="star-container inactive">
      <i class="fa-star fa-solid"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-star fa-solid"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    </span>
  </div>
  <!-- Stars fifth Row -->
  <div class="srContainer"  starNumber="1">
  <input type="checkbox">
  <span class="srWrapper">
    <div class="star-container inactive">
      <i class="fa-star fa-solid"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    <div class="star-container inactive">
      <i class="fa-regular fa-star"></i>
    </div>
    </span>
  </div>
  <!-- Stars sixth Row -->
  <div class="srContainer" starNumber="0">
    <input type="checkbox">
    <span class="srWrapper">
      <div class="star-container inactive">
        <i class="fa-regular fa-star"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-regular fa-star"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-regular fa-star"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-regular fa-star"></i>
      </div>
      <div class="star-container inactive">
        <i class="fa-regular fa-star"></i>
      </div>
    </span>
  </div>
</div>
  `;
  makeElement(htmlString, ratingSection);
}
// calling initial Functions
// initFixedHeader();

var filters = {
  rates: [],
  categories: [],
};
let serverObj;
let serverGames;
let foundItemNum;
let gameCategories;
let htmlCatString = "";
let getInput;
let catItemIndex;
let itemIndex;
let tempCatItemIndex;
let catArray = filters.categories;
let gameOffset = 0;
let allGamesCountAtFirst = 0;
let unloadedGames = 0;
let serverUnloadedGames;
let tmpChi = [];
let gListBtnSection = "";
let unloadedObjectCount;
const gameLoadMoreBtn = $("button");
function postingFilterResponse(response, error) {
  if (error) {
    console.log("Error in handling response of postig game filters: ", error);
    return;
  } else {
    console.log(
      "Response in handling response of postig game filters: ",
      response
    );
    serverGames = response.game;
    // console.log("all recieved Games from server: ", serverGames);
    gameOffset = serverGames.length;
    // console.log("game offset@", gameOffset);
    // checkMoreGames(Number(serverObj.count), gameOffset);
    // console.log("game Offset after posting filters : ", gameOffset);
    serverGames.forEach((game) => {
      produceCard(game, false);
      makeElement(htmlString, gList, "html");
    });
  }
}
function postFilterToServer(filters) {
  makeEmpty(".gList");
  // @todo gmLoadMoreBtn here
  const data = { filters };
  myFetch(
    "games/postFilters",
    "POST",
    postingFilterResponse,
    data,
    "postingFilterResponse"
  );
  // setTimeout(() => {
  //   $.ajax({
  //     url: `http://localhost/IE-F95-API-master/games_list`,
  //     type: "POST",
  //     data: { filters: JSON.stringify(filters) },
  //     success: function (data) {
  //       serverObj = data.response.result.games_list;
  //       console.log("server Object", serverObj);
  //       serverGames = serverObj.games;
  //       // console.log("all recieved Games from server: ", serverGames);
  //       gameOffset = serverGames.length;
  //       // console.log("game offset@", gameOffset);
  //       checkMoreGames(Number(serverObj.count), gameOffset);
  //       // console.log("game Offset after posting filters : ", gameOffset);
  //       serverGames.forEach((game) => {
  //         produceCard(game, false);
  //         makeElement(htmlString, gList, "html");
  //       });
  //     },
  //     error: function (xhr) {
  //       console.log(xhr.statusCode);
  //     },
  //   });
  // }, 200);
}
let unloadedGameObject;

$(".gmLoadMoreBtn").on("click", function () {
  // $.ajax({
  //   url: `http://localhost/IE-F95-API-master/games_list?offset=${gameOffset}`,
  //   type: "POST",
  //   data: { filters: JSON.stringify(filters) },
  //   success: function (data) {
  //     console.log("more games Data:", data);
  //     unloadedGameObject = data.response.result.games_list;
  //     serverUnloadedGames = unloadedGameObject.games;
  //     gameOffset += serverUnloadedGames.length;
  //     // console.log("game offset-----", gameOffset);
  //     checkMoreGames(Number(unloadedGameObject.count), gameOffset);
  //   },
  //   error: function () {
  //     console.log("Error in loading more games");
  //   },
  // });
});
function checkMoreGames(allGamesCount, gameOffset) {
  unloadedGames = allGamesCount - gameOffset;
  unloadedGames = 10 - gameOffset;
  // console.log("unloaded Games Count", allGamesCount);
  // console.log("game Offset", gameOffset);
  // console.log("unloaded Games", unloadedGames);
  // Unloaded Games
  if (unloadedGames > 0) {
    gameLoadMoreBtn.addClass("gmLoadMoreBtn");
  } else {
    gameLoadMoreBtn.removeClass("gmLoadMoreBtn").addClass("hideBtn");
  }
  // console.log("game Offset in checking more games:", gameOffset);
  //   produceCard(game, false);
  //   makeElement(htmlString, gList, "html");
  // });
}
function allGamesCtg(response, error) {
  if (error) {
    console.log("Error in handling all game ctgs: ", error);
    return;
  } else {
    console.log("Response in handling all game ctgs: ", response.allCtg);
    allCats = response.allCtg;
    allCats.forEach((cat) => {
      // console.log("cat in initallgames ctg:", cat);
      catArray.push(cat.name);
    });
  }
}
// console.log("catArrY LENGTH:", catArray.length);
function initAllGames() {
  console.log("cagtegory arr:", catArray);
  return catArray;
  // myFetch('categories','GET',)
}
// console.log("catArray:", catArray);
let isDataLoading = false;
function loaderChecker(isDataLoading) {
  if (isDataLoading) {
    $(".spinner").css("display", "block");
    aside.css("filter", "blur(10px)");
    $("button").addClass("disabled");
    $(".catItem").addClass("disabled");
    $(".srContainer").addClass("disabled");
    gList.addClass("disabled");
    gList.css("filter", "blur(10px)");
  } else {
    $(".spinner").css("display", "none");
    aside.css("filter", "none");
    $(".catItem").removeClass("disabled");
    $(".srContainer").removeClass("disabled");
    $("button").removeClass("disabled");
    gList.removeClass("disabled");
    gList.css("filter", "none");
  }
}
let getCatId;
let tempCtgArr = [];
let isCatSelected = false;
let starNumber = 0;
let rateArr = filters.rates;
let rate;
let serverRates;
let htmlRateString = "";
let rateFound = false;
function loadFilters(filterItem, asidePart) {
  // isDataLoading = true;
  // loaderChecker(isDataLoading);
  // if filter is category
  getCatId = filterItem.closest(asidePart).children(".catId").html();
  catItemIndex = catArray.indexOf(getCatId);
  console.log(
    "category name:",
    getCatId,
    "categry item index in cat arr: ",
    catItemIndex,
    "cat arr: ",
    catArray
  );
  // if filter is rating
  starNumber = filterItem.attr("starnumber");
  itemIndex = rateArr.indexOf(starNumber);
  setTimeout(() => {
    isDataLoading = false;
    // loaderChecker(isDataLoading);
    isCatSelected = true;
    getInput = filterItem.closest(asidePart).children("input");
    asidePart === ".catItem" ? getCatId : starNumber;
    if (getInput.attr("checked")) {
      asidePart === ".catItem" ? catItemIndex : itemIndex;
      if (asidePart === ".catItem") {
        tempCatItemIndex = tempCtgArr.indexOf(getCatId);
        console.log(tempCatItemIndex);
        if ($('.ctgCheck[checked="checked"]').length - 1 > 0) {
          getInput.removeAttr("checked");
          if (getCatId === "همه") {
            catArray.splice(0, catArray.length);
            tempCtgArr.forEach((newCtg) => catArray.push(newCtg));
          }
          if (
            catItemIndex > -1 &&
            tempCatItemIndex > -1 &&
            getCatId !== "همه"
          ) {
            if (
              filterItem
                .siblings()
                .first()
                .children(".ctgCheck")
                .attr("checked")
            ) {
              console.log("hit point 3: ");
              catArray.splice(catItemIndex, 1);
              tempCtgArr.splice(tempCatItemIndex, 1);
              // initAllGames();
            } else {
              catArray.splice(catItemIndex, 1);
              tempCtgArr.splice(tempCatItemIndex, 1);
            }
          }
        } else {
          getInput.removeAttr("checked");
          catArray.splice(catItemIndex, 1);
          tempCtgArr.splice(tempCatItemIndex, 1);
          // filterItem
          //   .siblings()
          //   .first()
          //   .children(".ctgCheck")
          //   .attr("checked", "checked");
          console.log("hit point 2: ");
          console.log(catArray);
          // initAllGames();
        }
      } else if (asidePart === ".srContainer") {
        rateArr.splice(itemIndex, 1);
        getInput.removeAttr("checked");
      }
    } else {
      getInput.attr("checked", "checked");
      if (asidePart === ".catItem") {
        // filterItem
        //   .siblings()
        //   .first()
        //   .children(".ctgCheck")
        //   .removeAttr("checked");
        if (getCatId !== "همه") {
          console.log("hit point 1");
          catArray.splice(0, catArray.length);
          if (!tempCtgArr.includes(getCatId)) {
            tempCtgArr.push(getCatId);
            tempCtgArr.forEach((ctg) => catArray.push(ctg));
          }
          // tempCtgArr.splice(0, tempCtgArr.length);
        } else if (getCatId === "همه") {
          tempCtgArr.splice(0, tempCtgArr.length);
          filterItem.siblings().children(".ctgCheck").removeAttr("checked");
          initAllGames();
        }
      } else if (asidePart === ".srContainer") {
        rateArr.push(starNumber);
      }
    }
    postFilterToServer(catArray);
  }, 300);
}
// getting transfered data
let searchedKey;
function getSearchedResponse() {
  let getValue = localStorage.getItem("gotSearchResponse");
  return getValue;
}
function makeGameCards(searchItem) {
  console.log("data for making cards: ", searchItem);
  searchItem.forEach((item) => {
    // make Element
    produceCard(item);
    makeElement(htmlString, gList, 0, false, "append");
  });
  localStorage.clear();
}
let searchedGameResponseJson = JSON.parse(getSearchedResponse());
window.onload = () => {
  //fixed header
  initFixedHeader();
  if (checkUserLogin()) {
    findElement("#logout").addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
    });
  } else {
    console.log("User is Offline");
    // window.location = "http://localhost:5500/Public/login.html";
  }
  if (searchedGameResponseJson) {
    console.log("transfered searched response: ", searchedGameResponseJson);
    aside.css("display", "none");
    bannerTitle.css("display", "block");
    searchedKey = localStorage.getItem("typedLetters");
    bannerTitle.html(`نتایج جستجو برای : ${searchedKey}`);
    makeGameCards(searchedGameResponseJson);
  } else {
    // optional search must be initialized
    console.log("**** nothing is searched and filters are available ****");
    aside.css("display", "block");
    bannerTitle.css("display", "none");

    makeRatingPart();
    makeCategoryPart();
    initAllGames();

    // }

    //   $(".srContainer").on("click", function () {
    //     if (isDataLoading) {
    //       return;
    //     }
    //     isDataLoading = true;
    //     loadFilters($(this), ".srContainer");
    //   });
    //   if (!isCatSelected) {
    //     let a = initAllGames();
    //     console.log("catArray: ", a);
    //     // postFilterToServer(catArray);
    //   } else {
    //     catArray = [];
    //   }
  }
};

// let isClickable = true;

// window.onload = () => {
//   //fixed header
//   initFixedHeader();
//   if (checkUserLogin()) {
//     findElement("#logout").addEventListener("click", (e) => {
//       e.preventDefault();
//       clearSession();
//     });
//   } else {
//     console.log("User is Offline");
//     // window.location = "http://localhost:5500/Public/login.html";
//   }
// };
