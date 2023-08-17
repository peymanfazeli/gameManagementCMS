let htmlString = "";
const headerSection = $(".fixedHeader");
//

const fvSlider = document.querySelector(".fvSlider");
const fvContainer = document.querySelector(".container");
const svSlider = document.querySelector(".svSlider");
const commentsDiv = document.querySelector(".comments");
const tutorialsDiv = document.querySelector(".tutorials");
const owImgs = document.querySelectorAll(".owItemImg");
const layer = document.querySelector(".layer");
const layerTitle = document.querySelector(".layerTitle");
const commentsNumber = document.querySelector(".commentsNumber");
const footerSection = $(".footer");

let owlDots;
let sliders;
let BannerBgImg = [];
let newGames;
let items;
let comments;
let tutorials;
let bgImage = $(".container");
let bannerText = $(".bannerText");
let bannerBtn = $(".bannerBtn");
let trailerBtn = $("#gallery");
let commentSection;
let paramUrl;

console.log("banner Btn: ", bannerBtn);
// const serverUrl = `http://localhost:3001/home`;
// function headerSliderInit(imgContainer, sliderNum, gameId) {
//   imgContainer.css("background", `url(${sliders[sliderNum].large_image})`);
//   imgContainer.css("background-repeat", `no-repeat`);
//   imgContainer.css("background-size", `cover`);
//   imgContainer.css("background-position", `center center`);
//   imgContainer.attr("gameId", gameId);
//   implementGreenLayer(gameId);
//   bannerText.text(sliders[sliderNum].abstract);
//   paramUrl = sliders[sliderNum].title;
//   bannerBtn.attr("gameTitle", `${paramUrl}#info`);
//   trailerBtn.attr("gameTitle", `${paramUrl}#gallery`);
// }
function headerSliderInit(imgContainer, game, gameNum, gameId) {
  let imgPath = correctImgAddress(game.large_image);
  imgContainer.css("background", `url(${imgPath})`);
  imgContainer.css("background-repeat", `no-repeat`);
  imgContainer.css("background-size", `cover`);
  imgContainer.css("background-position", `center center`);
  imgContainer.attr("gameId", gameId);
  implementGreenLayer(gameId);
  bannerText.text(game.abstract);
  paramUrl = game.title;
  bannerBtn.attr("gameTitle", `${paramUrl}#info`);
  trailerBtn.attr("gameTitle", `${paramUrl}#gallery`);
}
// green layer
let allOwItemsGameId;
function implementGreenLayer(gameId) {
  allOwItemsGameId = document.querySelectorAll(".owItemImg");
  // console.log("sent game id : ", gameId);
  allOwItemsGameId.forEach((owItemId) => {
    // console.log("owItem Game id :", Number(owItemId.getAttribute("gameId")));
    if (gameId === Number(owItemId.getAttribute("gameId"))) {
      // console.log(owItemId.parentElement.querySelector(".layer"));
      owItemId.parentElement.querySelector(".layer").removeAttribute("id");
      owItemId.parentElement
        .querySelector(".layer")
        .setAttribute("id", "greenLayer");
    } else {
      owItemId.parentElement.querySelector(".layer").removeAttribute("id");
      owItemId.parentElement
        .querySelector(".layer")
        .setAttribute("id", "blueLayer");
    }
  });
}
function transferData(btnHref) {
  console.log("btnHref in transferData: ", btnHref);

  let transferableData = new URLSearchParams();
  if (btnHref instanceof jQuery) {
    location.href =
      "http://localhost:5500/Public/gamePage.html" +
      `?game=${btnHref.attr("gameTitle")}`;
    // "http://localhost/IE-F95-API-master/public/AmirKabirStudio/gamePage.html" + `?game=${btnHref.attr("gameTitle")}#info`;
  } else {
    location.href =
      "http://localhost:5500/Public/gamePage.html" +
      `?game=${btnHref.getAttribute("gameTitle")}`;
    // console.log("rendered by vanila");
  }
  transferableData.toString();
}
function enableDots(dots) {
  dots.forEach((dot) => dot.classList.remove("disabled"));
  console.log("enabled");
}
// function deleteAllDisabled(items) {
//   items.forEach((item) => {
//     console.log("disabled: ", item);
//     // item.classList.remove("disabled");
//     // console.log("ok");
//   });
// }
// test part
function initFvData(response, error) {
  if (error) {
    console.log("Error in initializing fvData1 data", error);
    return;
  } else {
    let user = response.user;
    let games = response.games;
    let newGames = response.newGames;
    console.log("newGames: ", newGames);
    console.log("user Comments: ", response);
    // show user game slider in homepage
    let i = 0;
    headerSliderInit(bgImage, games[i], i, i);
    let carouselItems = "";
    Object.values(games).forEach((game, counter) => {
      let large_image = correctImgAddress(game.large_image);
      let small_image = correctImgAddress(game.small_image);
      BannerBgImg.push(large_image);
      console.log("banners bg img: ", BannerBgImg);
      carouselItems += `<div class="owItem">
      <img src="${small_image}" alt="" class="owItemImg" gameId=${counter} />
      <p class="imgTitle">بررسی بازی  ${game.title}</p>
      <div class="layer" id='blueLayer'>
        <h6 class="layerTitle">${game.title}</h6>
        <p class="commentsNumber">تعداد نظرات : ${game.number_of_comments}</p>
        <span  class="layerBtn" gameTitle="${game.title}#info" onclick="transferData(this)"> صفحه بازی</span>
      </div>
    </div>`;
    });
    setInterval(() => {
      if (i < games.length) {
        headerSliderInit(bgImage, games[i], i, i);
        i++;
      } else {
        i = 0;
      }
    }, 5000);
    bannerBtn.on("click", function (e) {
      e.preventDefault();
      transferData(bannerBtn);
    });
    trailerBtn.on("click", function (e) {
      e.preventDefault();
      transferData(trailerBtn);
    });
    makeElement(
      `<div class='owl-carousel' id="autoplayCarousel">${carouselItems}</div>`,
      fvSlider,
      1,
      true
    );
    carouselItems = "";
    Object.values(newGames).forEach((games) => {
      carouselItems += `${produceCard(games)}`;
    });
    Object.values(newGames).forEach((games) => {
      carouselItems += `${produceCard(games)}`;
    });
    Object.values(newGames).forEach((games) => {
      carouselItems += `${produceCard(games)}`;
    });
    let item = "something";

    makeElement(
      `<div class='owl-carousel owl-theme' id="dotsCarousel">${carouselItems}</div>`,
      svSlider,
      2,
      false
    );
  }
}
function fvData1() {
  myFetch("home", "GET", initFvData);
}
fvData1();
// fetch Api
function fvData() {
  fetch(serverUrl)
    .then((response) => {
      try {
        // console.log("homePage First View data: ", await response.json());
        return response.json();
      } catch (error) {
        throw "Json was incorrect" + error;
      }
    })
    .then((data) => {
      let homepage;
      try {
        homepage = data.response.result.homepage;
      } catch (error) {
        throw "homepage response met an error" + error;
      }
      sliders = homepage.slider;
      let i = 0;
      headerSliderInit(bgImage, i, i);
      let carouselItems = "";
      sliders.forEach((slider, counter) => {
        BannerBgImg.push(slider.large_image);
        carouselItems += `<div class="owItem">
        <img src="${slider.small_image}" alt="" class="owItemImg" gameId=${counter} />
        <p class="imgTitle">بررسی بازی  ${slider.title}</p>
        <div class="layer" id='blueLayer'>
          <h6 class="layerTitle">${slider.title}</h6>
          <p class="commentsNumber">تعداد نظرات : ${slider.number_of_comments}</p>
          <span  class="layerBtn" gameTitle="${slider.title}#info" onclick="transferData(this)"> صفحه بازی</span>
        </div>
      </div>`;
      });
      setInterval(() => {
        if (i < sliders.length) {
          headerSliderInit(bgImage, i, i);
          i++;
        } else {
          i = 0;
        }
      }, 5000);
      bannerBtn.on("click", function (e) {
        e.preventDefault();
        transferData(bannerBtn);
      });
      trailerBtn.on("click", function (e) {
        e.preventDefault();
        transferData(trailerBtn);
      });
      makeElement(
        `<div class='owl-carousel' id="autoplayCarousel">${carouselItems}</div>`,
        fvSlider,
        1,
        true
      );
      carouselItems = "";
      newGames = homepage.new_games;
      newGames.forEach((games) => {
        carouselItems += `${produceCard(games)}`;
      });
      newGames.forEach((games) => {
        carouselItems += `${produceCard(games)}`;
      });
      newGames.forEach((games) => {
        carouselItems += `${produceCard(games)}`;
      });
      let item = "something";

      makeElement(
        `<div class='owl-carousel owl-theme' id="dotsCarousel">${carouselItems}</div>`,
        svSlider,
        2,
        false
      );
      // owl dots
      // owlDots = document.querySelectorAll(".owl-dots");

      // comments
      comments = homepage.comments;
      carouselItems = "";
      comments.forEach((comment) => {
        paramUrl = comment.game.title;
        carouselItems += `
        <div class="item cmItem" gameTitle="${paramUrl}#comments" onclick="transferData(this)">
          <img src="${comment.player.avatar}" alt="thumb" />
          <div class="content">
            <h5 class="cmTitle">${comment.text}</h5>
            <span>${comment.date}</span>
          </div>
        </div>
  `;
      });
      makeElement(
        `<div class="comments">${carouselItems}</div>`,
        commentsDiv,
        0,
        false
      );

      // toturials
      tutorials = homepage.tutorials;
      carouselItems = "";
      tutorials.forEach((tutorial) => {
        carouselItems += `
         <div class="item" gameTitle="${tutorial.game.title}#info" onclick="transferData(this)">
           <img src="${tutorial.game.small_image}" alt="thumb" />
           <div class="content">
             <h5>${tutorial.title}</h5>
             <span>${tutorial.date}</span>
           </div>
         </div>
 `;
      });
      makeElement(
        `<div class="tutorials">${carouselItems}</div>`,
        tutorialsDiv,
        0,
        false
      );
    })
    .catch((error) => console.log(error));
}
function initFooter() {
  htmlString = `
  <div class="top threshold">
     <span class="menu">
        <div class="right">
             <ul>
                 <li><a href="#">صفحه اصلی</a></li>
                 <li><a href="#">درباره ما</a></li>
                <li><a href="#">ارتباط با سازندگان</a></li>
                 <li><a href="#">سوالات متداول</a></li>
                 <li><a href="#"> حریم خصوصی</a></li>
             </ul>
         </div>
    <div class="left">
      <div class="title">
        <i class="fa fa-gamepad"></i>
        امیرکبیر
        <span>استودیو</span>
      </div>
    </div>
  </span>
  <span class="icons">
  <i class="fab fa-facebook-f"></i>
  <i class="fa-brands fa-twitter"></i>
  <i class="fa-brands fa-instagram"></i>
    <!-- <i class="fab fa-facebook-f"></i> -->
  </span>
</div>
<div class="bottom">
  <span> تمامی حقوق محفوظ و متعلق به دانشگاه امیر کبیر است</span>
</div>
    `;
  makeElement(htmlString, footerSection);
}
if (window.location.href === "http://localhost:5500/Public/index.html") {
  // fvData();
  // deleteAllDisabled(document.querySelectorAll(".disabled"));
  // enableDots(owlDots);
  initFooter();
}
// window.onload = function () {
//   fvData();
//   // deleteAllDisabled(document.querySelectorAll(".disabled"));
//   // enableDots(owlDots);
//   initFooter();
// };
// Public Functions
function makeElement(
  htmlElement,
  sourceElement,
  section = 0,
  autoplay = false,
  type = "append"
) {
  const element = htmlElement;
  var htmlObject = document.createElement("div");
  htmlObject.innerHTML = element;
  if (section !== 0) {
    if (section > 0 && section <= 2) {
      htmlObject.classList.add("sliderContainer");
      if (section === 1) {
        sourceElement[type](htmlObject);
        var owl1 = $("#autoplayCarousel");
        owl1.owlCarousel({
          loop: true,
          margin: 5,
          autoplay: true,
          responsive: {
            0: {
              items: 1,
              autoplay: false,
              dots: true,
            },
            600: {
              items: 5,
              margin: 15,
            },
            1000: {
              items: 10,
              margin: 25,
            },
          },
          rtl: true,
        });
      } else if (section === 2) {
        sourceElement[type](htmlObject);
        var owl2 = $("#dotsCarousel");
        owl2.owlCarousel({
          // loop: true,
          // center: true,
          rtl: true,
          // margin: 10,
          // nav: true,
          responsive: {
            0: {
              items: 1,
            },
            600: {
              items: 1,
              // nav: true,
              margin: 65,
              dots: true,
            },
            1000: {
              items: 4,
              // nav: true,
              margin: 55,
              dots: true,
            },
          },
        });
      }
    }
  }
  // else if(section===3) swiper slider must be called
  if (!htmlObject.classList.contains("sliderContainer")) {
    htmlObject.classList.add("content");
  }
  sourceElement[type](htmlObject);
}

//fixed-header Function
htmlString = "";

// console.log("header section in script.js:", headerSection);
async function initFixedHeader() {
  htmlString = `
    <header class="nThreshold">
        <div class="headerContainer">
            <div class="title">
                <i class="fa fa-gamepad"></i>
                <a href="index.html">
                امیرکبیر
                <span>استودیو</span>
                </a>
            </div>
            <div class="left">
                <div class="searchPart">
                <input type="search" id='keyword-search' placeholder="جستجو ..." />
                <i id="searchIcon" class="fa fa-search" onclick="getTextFromInput()"></i>
                </div>
                <div class="submit">
                <i class="fa fa-user"></i>
                <a href="login.html" class="btn" id="loginBtn"></a>
                <a href="profile.html" class="btn" id="profileBtn" onclick=""></a>
                <a href="adminPage.html" class="btn" id="adminBtn"></a>
                <a href="register.html" class="btn" id="signup">ثبت نام</a>
                <a href="#" class="btn" id="logout" onclick="clearSession">خروج</a>
              </div>
            </div>
        </div>
    </header>
    <div class="generalGameList nThreshold">
      <!-- auto -->
    </div>
  `;
  makeElement(htmlString, headerSection, 0, "prepend");
  if (!checkUserLogin()) {
    offDisplayLogin(signup, loginBtn, profileBtn, logout, adminBtn);
  }
}
window.onload = () => {
  offDisplayLogin(
    findElement("#signup"),
    findElement("#loginBtn"),
    findElement("#profileBtn"),
    findElement("#logout"),
    findElement("#adminBtn")
  );
  checkUserLogin();
};
// search Function
let searchItem;
let itemFound;
let searchedDataRoot;
let searchKey = "";
const generalGameList = $(".generalGameList");
$("#keyword-search").on("keyup", function () {
  searchKey = $(this).val();
});
// removing redundant nodes function
function makeEmpty(node) {
  let list = document.querySelector(node);
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}
function getTextFromInput() {
  searchKey = $("#keyword-search").val();
  if (searchKey.length > 0) {
    searchItems(searchKey);
  } else {
    location.href =
      "http://localhost/IE-F95-API-master/public/AmirKabirStudio/games_list.html";
  }
}
// seperated search function
function searchItems(item) {
  searchItem = item;
  $.ajax({
    url: `http://localhost/IE-F95-API-master/games?q=${searchItem}`,
    type: "GET",
    dataType: "json",
    success: function (searchedData) {
      searchedDataRoot = searchedData.response.result.games;
      console.log("the response is :", searchedDataRoot);
      searchedDataRoot.length > 0 ? (itemFound = true) : (itemFound = false);
      if (itemFound) {
        localStorage.setItem("searchedData", searchKey);
        location.href =
          "http://localhost/IE-F95-API-master/public/AmirKabirStudio/games_list.html";
      } else {
        console.log("not found");
      }
    },
  });
}
// Producing gameCard Function
function produceCard(item, hasHeader = false, headerText = "") {
  let large_image = correctImgAddress(item.large_image);
  let stars = 5;
  let uRate;
  let rateString = "";
  let rateStarDiff;
  // ratingPart
  let acc = 0;
  uRate = Math.trunc(item.rate);
  rateStarDiff = stars - uRate;
  if (uRate >= 1 || uRate <= 5) {
    for (let filledStar = 1; filledStar <= uRate; filledStar++) {
      rateString += `<a href="#" class="fa fa-star checked"></a>`;
      acc++;
    }
  }
  for (let emptyStar = acc; emptyStar < stars; emptyStar++) {
    rateString += `<a href="#" class="fa fa-star"></a>`;
  }
  hasHeader
    ? (htmlString = `
        <h5 class="rgHeader"> ${headerText}  </h5>
        <div class="rGames">
          <div class="gameCard" id="${item.title}" gameTitle="${item.title}#info"  onclick="transferData(this)">
          <img src="${large_image}" alt="" />
          <div class="content">
            <h5 class="title">${item.title}</h5>
            <h6 class="categories">${item.categories}</h6>
            <div class="rate">${rateString}</div>
          </div>
          </div>
        </div>
        `)
    : (htmlString = `
        <div class="gameCard" id="${item.title}"gameTitle="${item.title}#info"  onclick="transferData(this)">
        <img src="${large_image}" alt="" />
        <div class="content">
          <h5 class="title">${item.title}</h5>
          <h6 class="categories">${item.categories}</h6>
          <div class="rate">${rateString}</div>
        </div>
        </div>
      `);
  return htmlString;
}

// const logoutBtn = document.querySelector("#logout");

// checkUserLogin();
