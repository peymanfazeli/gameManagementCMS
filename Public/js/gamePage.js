// let keysValues = window.location.search;

// const urlParams = new URLSearchParams(keysValues);
// const param = urlParams.get("game");
// // console.log("*******");
// let gameTitle = param;
// // console.log("Recieved gameTitle:", gameTitle);
// let tail;
// let homepage;
// let gameName;
// // let sliders;
// let gameInfoTab;
// let commentItems;
// let commentTabElement;
// let ratingTab;
// let relatedGamesTab;
// let galleryTab;
// let tableSection;
// let leaderbordMembers;
// let gameGallery;
// // let htmlString = "";
// //
// // newComment Section handlers
// const commentModal = document.querySelector(".newCmModal");
// const cmCloseBtn = document.querySelector(".closeBtn");
// const cmSubmitBtn = document.querySelector(".btnCmSubmit");
// const cmBtn = document.querySelector(".cmHeader");
// const blackCover = document.querySelector(".blackCover");

// // Initailization
// //fixed header
// htmlString = "";

// // game init part
// let tab;
// let header;
// let relatedGames;
// let galleryFlag = 0;
// let commentsFlag = 0;
// let gameInfoFlag = 0;
// initFixedHeader();
// const bannerElement = document.querySelector(".banner");
// gameInfoTab = $("#info");
// ratingTab = $("#leaderboard");
// commentTab = $("#comments");
// relatedGamesTab = $("#related_games");
// galleryTab = $("#gallery");

// // init game data
// // Load Header
// // $(function () {
// //   $.ajax({
// //     url: `http://localhost/IE-F95-API-master/games/${gameTitle}/header`,
// //     type: "GET",
// //     dataType: "json",
// //     success: function (data) {
// //       renderHeader(data);
// //       if (getTabFromUrl()) {
// //         loadTabDataFromUrl();
// //       }
// //       // getTabFromUrl() ? loadTabDataFromUrl() : console.log("no tab in url");
// //     },
// //     error: function () {
// //       setTimeout(() => {
// //         alert("Error loading header data");
// //       }, 1000);
// //     },
// //   });
// //   // loading tab data
// //   $(".topic").one("click", function () {
// //     hashTab = $(this).children().attr("href").replace("#", "");
// //     tab = hashTab;
// //     if (tab === "comments" && commentsFlag) {
// //       // console.log("tab");
// //       return;
// //     }
// //     if (tab === "gallery" && galleryFlag) {
// //       // console.log("tab");
// //       return;
// //     }
// //     if (tab === "info" && gameInfoFlag) {
// //       // console.log("tab: ", tab);
// //       return;
// //     }
// //     $.ajax({
// //       url: `http://localhost/IE-F95-API-master/games/${gameTitle}/${hashTab}`,
// //       type: "GET",
// //       dataType: "json",
// //       success: function (tabInfo) {
// //         const mainObject = tabInfo.response.result;
// //         if (tab === "leaderboard") {
// //           renderLeaderboardTab(tabInfo);
// //         } else if (tab === "comments") {
// //           renderCommentTab(tabInfo);
// //           // commentsFlag = 1;
// //         } else if (tab === "related_games") {
// //           renderRelatedGamesTab(tabInfo);
// //         } else if (tab === "gallery") {
// //           console.log(tabInfo);
// //           renderGallery(tabInfo);
// //           // galleryFlag = 1;
// //         } else if (tab === "info") {
// //           // $(".information").append(header.info);
// //           console.log("game info: ", tabInfo);
// //           renderInfoTab(tabInfo);
// //           // gameInfoFlag = 1;
// //         }
// //       },
// //     });
// //   });
// // });
// $(document).on({
//   ajaxStart: function () {
//     $(".spinner").css("display", "block");
//   },
//   ajaxStop: function () {
//     $(".spinner").css("display", "none");
//   },
// });

// let tb;
// function selectTab(tabId) {
//   const tabs = document.querySelectorAll(".tab");
//   tabs.forEach((tab) => (tab.style.display = "none"));
//   tb = document.querySelector(`#${tabId}`);
//   tb.style.display = "block";
//   // loadTabData(tb);
// }

// window.onload = () => {
//   // initFixedHeader();
//   tail = window.location.href.slice(-7);
//   if (tail === "gallery") {
//     // console.log(tail);
//     selectTab("gallery");
//   } else if (tail === "omments") {
//     // console.log(tail);
//     selectTab("comments");
//   } else {
//     // console.log(tail);
//     selectTab("info");
//   }
// };
// // Rendering
// function renderHeader(data) {
//   header = data.response.result.game;
//   htmlString = `
//   <img
//    id="bannerImg"
//    alt="game banner"
//    src="${header.large_image}"
//  />
//  <div class="nThreshold">
//  <div class="gameTextData ">
//  <img
//    id="gameImg"
//    alt="game image"
//    src="${header.small_image}"
//  />
//      <div class="textContent">
//        <h3 class="topic" id="bannerTitle">${param.replace("بازی ", "")}</h3>
//        <h6 class="category">${header.categories}</h6>
//        <div class="rate"></div>
//      </div>
//      <span class="btn">شروع بازی</span>
//  </div>
//  </div>
// `;
//   makeElement(htmlString, bannerElement);
//   // $(".information").append(header.info);
//   // renderInfoTab("info");
//   // gameInfoFlag = 1;
//   initFooter();
// }
// const informationDiv = $(".information");
// let infoItems;
// function renderInfoTab(tabInfo) {
//   if (gameInfoFlag === 0) {
//     gameInfoFlag = 1;
//     infoItems = tabInfo.response.result.game;
//     console.log("info tab is rendered", infoItems);
//     htmlString = `<div>${infoItems.info}</div>`;
//     makeElement(htmlString, informationDiv);
//   }
// }
// function renderLeaderboardTab(tabInfo) {
//   console.log(tabInfo);
//   htmlString = "";
//   // rating section of game
//   let tableUserString = "";
//   let topThreeUsers = "";
//   const userTable = $(".table");
//   let userNUm = 0;
//   let maxScore;
//   let scorePosition;
//   leaderbordMembers = tabInfo.response.result.leaderboard;
//   let userScoreTemp = leaderbordMembers;
//   if (leaderbordMembers.length < 1) {
//     $(".noRate").css("display", "block");
//   }
//   userScoreTemp.forEach((player) => {
//     userNUm++;
//     if (userNUm <= 3) {
//       if (userNUm === 1) {
//         scorePosition = " highest";
//       } else if (userNUm === 2) {
//         scorePosition = " second";
//       } else {
//         scorePosition = " third";
//       }
//       topThreeUsers += `
//           <div class="person ${scorePosition}Score">
//           <span class="id">${userNUm}</span>
//           <div class="profile-pic">
//             <img src="${player.player.avatar}" alt="" />
//             <span class="poly"><a>${player.level}</a></span>
//           </div>
//           <div class="profile-desc">
//             <a class="profile-name">${player.player.name}</a>
//             <a class="profile-score">${player.score}</a>
//           </div>
//           <div class="rating">
//             <input type="radio" name="rating" value="5" id="5" /><label
//               for="5"
//               >☆</label
//             >
//             <input type="radio" name="rating" value="4" id="4" /><label
//               for="4"
//               >☆</label
//             >
//             <input type="radio" name="rating" value="3" id="3" /><label
//               for="3"
//               >☆</label
//             >
//             <input type="radio" name="rating" value="2" id="2" /><label
//               for="2"
//               >☆</label
//             >
//             <input type="radio" name="rating" value="1" id="1" /><label
//               for="1"
//               >☆</label
//             >
//           </div>
//         </div>`;
//     }
//     htmlString = `
//     <h5 class="rgHeader">رتبه بندی </h5>
//       <!-- bg and centeralization -->
//       <div class="body-container">
//         <!-- card -->
//         <div class="container">
//           <!-- Top 3 -->
//           <section class="top">
//           ${topThreeUsers}
//           </section>
//           <!-- tabel section -->
//           <section class="table">
//           ${(tableUserString += `<div class="person">
//           <!-- field1 -->
//           <div class="div1">
//             <span class="id">${userNUm}</span>
//             <div class="profile-pic">
//               <span class="poly"><a>${player.level}</a></span>
//               <img src="${player.player.avatar}" alt="">
//           </div>
//           </div>
//           <!-- field2 -->
//           <div class="div2">
//           <div class="profile-desc">
//             <a class="profile-name">${player.player.name}</a>
//             <a class="profile-score">${player.score}</a>
//           </div>
//           </div>
//           <!-- lastfield -->
//           <div class="div3">
//             <div class="rating">
//               <input type="radio" name="rating" value="5" id="5"><label for="5">☆</label>
//               <input type="radio" name="rating" value="4" id="4"><label for="4">☆</label>
//               <input type="radio" name="rating" value="3" id="3"><label for="3">☆</label>
//               <input type="radio" name="rating" value="2" id="2"><label for="2">☆</label>
//               <input type="radio" name="rating" value="1" id="1"><label for="1">☆</label>
//             </div>
//           </div>
//       </div>`)}
//           </section>
//           <!-- @todo more -->
//           <section class="more">...</section>`;
//   });
//   makeElement(htmlString, ratingTab);
// }
// function cmRating(data) {
//   // ratingPart
//   let cmStars = 5;
//   let cmRate;
//   let userRateString = "";
//   let userRateStarDiff;
//   let acc = 0;
//   cmRate = Math.trunc(data.rate);
//   userRateStarDiff = cmStars - cmRate;
//   if (cmRate >= 1 || cmRate <= 5) {
//     for (let filledStar = 1; filledStar <= cmRate; filledStar++) {
//       userRateString += `<a href="#" class="fa fa-star checked"></a>`;
//       acc++;
//     }
//   }
//   for (let emptyStar = acc; emptyStar < cmStars; emptyStar++) {
//     userRateString += `<a href="#" class="fa fa-star"></a>`;
//   }
//   return userRateString;
// }
// let cmHeaderString = "";
// function renderCommentTab(tabInfo) {
//   console.log("cmFlag in rendering tab", commentsFlag);
//   console.log(tabInfo);
//   // comment section of game
//   if (commentsFlag === 0) {
//     commentsFlag = 1;
//     htmlString = "";
//     commentTabElement = $("#comments");
//     let offset = 0;
//     commentItems = tabInfo.response.result.comments;
//     offset = commentItems.length;
//     console.log("offset in first loading:", offset);
//     // unloadedComments = commentItems.game.number_of_comments - offset;
//     commentItems.forEach((comment) => {
//       if (comment.game.title === gameTitle) {
//         gameCommentNumber = comment.game.number_of_comments;
//         // unloadedComments = gameCommentNumber - offset;
//         cmRating(comment);
//         // renderCmHeader(comment, offset);
//         cmHeaderString = `
//           <div class="cmHeader nThreshold">
//                 <h5>نظرات کاربران</h5>
//                 <span id="cmNumber">( ${gameCommentNumber} نظر )</span>
//                 <span class="btn cmBtn">نظر دهید</span>
//           </div>
//           ${renderCmBody(comment, offset)}
//             `;
//       } else {
//         return;
//       }
//     });
//     makeElement(cmHeaderString, commentTabElement);
//     htmlString = "";
//     // newComment section
//     $(".cmBtn").on("click", function () {
//       blackCover.style.filter = "blur(10px)";
//       commentModal.style.display = "block";
//     });
//     $(".closeBtn").on("click", function () {
//       blackCover.style.filter = "none";
//       commentModal.style.display = "none";
//     });
//     // loadMore
//     $(".cmLoadMoreBtn").on("click", function () {
//       $(this).css("display", "none");
//       // console.log("offset:", offset, "unloadedCms: ", unloadedComments);
//       let cmBody = $(".cmBody");
//       $.ajax({
//         url: `http://localhost/IE-F95-API-master/games/${gameTitle}/comments?offset=${offset}`,
//         type: "GET",
//         dataType: "json",
//         success: function (serverCommetns) {
//           let serverCms = serverCommetns.response.result.comments;
//           htmlString = "";
//           offset += serverCms.length;
//           unloadedComments = gameCommentNumber - offset;
//           serverCms.forEach((cm) => {
//             renderCmBody(cm, offset);
//           });
//           makeElement(cmBodyString, cmBody);
//         },
//       });
//     });
//   }
// }
// let gameCommentNumber = 0;
// let unloadedComments = 0;
// let cmBodyString = "";
// function renderCmBody(comment, offset) {
//   cmBodyString = `
//                ${(htmlString += `<li class="cmItem">
//                <img src="${comment.player.avatar}" alt="user-image" />
//                <div class="cmTextContent">
//                  <span class="cmDate">${comment.date}</span>
//                  <p class="cmText">${comment.player.name}: ${comment.text}</p>
//                </div>
//                <div class="rate">${cmRating(comment)}</div>
//              </li>`)}
// `;
//   console.log("offset in cmBody is:", offset);
//   unloadedComments = gameCommentNumber - offset;
//   return `<ul class="cmBody">${cmBodyString}</ul><button class="btn ${
//     unloadedComments > 0 ? "cmLoadMoreBtn" : "hideBtn"
//   }">بارگذاری نظرات بیشتر</button>`;
// }

// function renderRelatedGamesTab(tabInfo) {
//   htmlString = "";
//   relatedGames = tabInfo.response.result.games;
//   let stars = 5;
//   let uRate;
//   let rateString = "";
//   let rateStarDiff;
//   relatedGames.forEach((game) => {
//     produceCard(game, true, "بازی های مشابه");
//   });
//   makeElement(htmlString, relatedGamesTab);
// }
// function renderGallery(tabInfo) {
//   if (galleryFlag === 0) {
//     galleryFlag = 1;
//     let galleryImgs;
//     let galleryVideos;
//     let galleryImgsString = "";
//     htmlString = "";
//     gameGallery = tabInfo.response.result.gallery;
//     console.log("game gallery: ", gameGallery);
//     galleryImgs = gameGallery.images;
//     galleryVideos = gameGallery.videos;
//     // console.log("gallery vid:", galleryVideos);
//     galleryImgs.forEach((img) => {
//       galleryImgsString += `
//           <div class="swiper-slide card">
//             <div class="image">
//               <img src="${img.url}" alt="" />
//                   <div class="sliderImageCover">
//                     <div class="playBtn">
//                       <i class="fa fa-play"></i>
//                     </div>
//                     <span>${img.title}</span>
//                   </div>
//               </div>
//             </div>
//           `;
//     });
//     galleryVideos.forEach((video) => {
//       htmlString = `
//             <h5 class="gHeader">عکس ها و ویدیو ها</h5>
//               <div class="gGame">
//                 <div class="topPic">
//                     <img
//                       src="${video.url}"
//                       alt="trailer-Pic"
//                     />
//                     <div class="playBtn">
//                       <i class="fa fa-play"></i>
//                     </div>
//                     <div class="gTextContent">
//                       <span class="gName">${video.title}</span>
//                       <span class="gViews">بازدید${video.views}</span>
//                     </div>
//                 </div>
//                 <div class="bottomSlider">
//                   <div class="swiper mySwiper container">
//                       <div class="swiper-wrapper content">
//                             <!-- card 1 -->
//                               ${galleryImgsString}
//                       </div>
//                       <div class="swiper-button-next"></div>
//                       <div class="swiper-button-prev"></div>
//                     </div>
//                   </div>
//               </div>
//               `;
//     });
//     makeElement(htmlString, galleryTab, 3, false, "html");
//     produceSwiperSlider();
//     // (htmlString, galleryTab, 3)
//   }
// }
// // getting url params
// function getTabFromUrl() {
//   const pageUrl = window.location.href;
//   let tabPart = pageUrl.split("#");
//   // console.log("tab part: ", tabPart[1]);
//   // loadTabData(`${tabPart}`);
//   return tabPart[1];
// }
// function loadTabDataFromUrl(tabName) {
//   tabName = getTabFromUrl();
//   $.ajax({
//     url: `http://localhost/IE-F95-API-master/games/${gameTitle}/${tabName}`,
//     type: "GET",
//     dataType: "json",
//     success: function (tabInfo) {
//       if (tabName === "comments") {
//         renderCommentTab(tabInfo);
//       } else if (tabName === "gallery") {
//         renderGallery(tabInfo);
//         // galleryFlag = 1;
//       } else if (tabName === "info") {
//         renderInfoTab(tabInfo);
//       }
//     },
//   });
// }
// function produceSwiperSlider() {
//   console.log("swiper is called");
//   // swiper slider
//   // let mSwiper = $(".mySwiper");
//   var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 2,
//     spaceBetween: 2,
//     slidersPerGroup: 3,
//     loop: true,
//     loopFillGroupWithBlank: true,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//   });
// }
//
// console.log("game Page js file");
// initFixedHeader();
// // let signup = document.querySelector("#signup");
// // let loginBtn = document.querySelector("#loginBtn");
// // let profileBtn = document.querySelector("#profileBtn");
// // let userNameBtn = document.querySelector("#userNameBtn");
// // let logout = document.querySelector("#logout");
// // let adminBtn = document.querySelector("#adminBtn");
// if (!checkUserLogin("gamePage")) {
//   console.log("user not logged in");
// } else {
//   //   window.location = "http://localhost:5500/Public/index.html";
//   console.log("user has logged in");
//   console.log(document.querySelector(".fa-user"));
// }
window.onload = () => {
  initFixedHeader();
};
