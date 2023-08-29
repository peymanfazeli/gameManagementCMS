/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable quotes */

// 1- Extracting data:
const doc = new DOMParser().parseFromString(getGameXML(), "text/xml");
const title = doc.querySelector("game").getAttribute("title");
const defaultLevel = doc.querySelector("levels").getAttribute("default") - 1;
const levels = Array.from(doc.querySelectorAll("level")).map((level) => ({
  title: level.getAttribute("title"),
  id: parseInt(level.getAttribute("id")),
  rows: parseInt(level.querySelector("rows").textContent),
  cols: parseInt(level.querySelector("cols").textContent),
  mines: parseInt(level.querySelector("mines").textContent),
  time: level.querySelector("time")
    ? parseInt(level.querySelector("time").textContent)
    : null,
}));
// console.log("Title :", title);
// console.log("Default Level: ", defaultLevel);
// console.log("Levels: ", levels);
// Handlers
const counterBox = document.querySelector(".counter");
const timer = document.querySelector("#timer");
// Loading defaults
let countedArr = [];
let isTimer = false;
let allRows;
let allCols;
let allMines = levels[defaultLevel].mines;
let topRightBox;
let time;
let flagNumber;
let clickNumber = 0;
let gridResponse;
let basis;
let gridXsl;
counterBox.innerHTML = allMines;
const bottomRight =
  '<div class="bottomRight" style="pointer-events: all;cursor: nwse-resize;z-index:200;position:absolute;right:-40px;bottom:-30px;width:55px;height:55px"></div>';
let allRevealedSpans;
let allGcells;
// timer variables
var gameTimer;
var timeleft;
let timerSet = false;
function gameTimerFunction(timeleft) {
  clearInterval(gameTimer);
  console.log("game timer is: ", gameTimer);
  gameTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(gameTimer);
      smile.dataset.value = "ok";
      $(".grid").children().off("mousedown contextmenu");
      setTimeout(() => {
        alert("Time Out");
      }, 1000);
    } else {
      timer.innerHTML = timeleft;
    }
    timeleft -= 1;
  }, 1000);
}
// Getting row of Index
function updateGridResponse(selectedLevel, update = false) {
  document.getElementById("timer").innerHTML = "";
  if (selectedLevel) {
    gridResponse = getNewGame(`
    <request>
        <rows>${selectedLevel.rows}</rows>
        <cols>${selectedLevel.cols}</cols>
        <mines>${selectedLevel.mines}</mines>
    </request>
  `);
    // recognition of timer
    if (selectedLevel.time) {
      isTimer = true;
      timerSet = true;
      timeleft = selectedLevel.time;
      timer.innerHTML = timeleft;
      $("#reloadGame").attr("level", "timer");
    } else {
      isTimer = false;
      timerSet = false;
      clickNumber = 0;
      timer.innerHTML = clickNumber;
      $("#reloadGame").attr("level", "click");
      clearInterval(gameTimer);
    }

    allRows = selectedLevel.rows;
    allCols = selectedLevel.cols;
    allMines = selectedLevel.mines;
    flagNumber = 0;
  }
  // definition of basis
  basis = 100 / selectedLevel.cols + "%";
  allGcells = selectedLevel.cols * selectedLevel.rows;
  var gridXml = new DOMParser().parseFromString(gridResponse, "text/xml");
  var xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(gridXsl);
  var gridContent = xsltProcessor.transformToFragment(gridXml, document);
  if (update === false) {
    $(".window").append(gridContent);
    $(".window").append(bottomRight);
  } else {
    $(".grid").replaceWith(gridContent);
    diffrenceBetweenFlagsAndMines();
  }

  $(".gCell").css("flex-basis", basis);
  $(".gCell").on("contextmenu", function (r) {
    r.preventDefault();
  });
  $(".gCell").on("mousedown", function (event) {
    event.preventDefault();
    // console.log("grid type:", levels);
    if (event.which === 3) {
      const flaggedSpan = $(this);
      if (!flaggedSpan.hasClass("flag") && flaggedSpan.hasClass("revealed")) {
        checkWinStatus(true, flaggedSpan.index());
      }
      if (!flaggedSpan.hasClass("flag") && !flaggedSpan.hasClass("revealed")) {
        checkWinStatus(true, flaggedSpan.index());
      } else {
        flagNumber--;
        flaggedSpan.removeClass("flag");
        diffrenceBetweenFlagsAndMines();
      }
    }
    if (event.which === 1) {
      const noneFlaggedSpan = $(this);
      if (
        !noneFlaggedSpan.hasClass("revealed") &&
        !noneFlaggedSpan.hasClass("flag")
      ) {
        checkWinStatus(false, noneFlaggedSpan.index());
        if (noneFlaggedSpan.data("value") === "mine") {
          mineClicked(noneFlaggedSpan.index());
        } else {
          if (isTimer === false) {
            if (!countedArr.includes(noneFlaggedSpan.index())) {
              increaseCounter(noneFlaggedSpan.index());
            }
          } else if (timerSet === true) {
            gameTimerFunction(timeleft);
            winningBy = "timer";
            timerSet = false;
          }
          revealNeighbors(noneFlaggedSpan.index());
        }
      } else if (noneFlaggedSpan.hasClass("revealed")) {
        revealAndCheck(noneFlaggedSpan.index());
      }
    }
  });
  $(".smile").on("mouseenter", function (r) {
    $(this).hover(
      function () {
        $(this).attr("data-value", "hover");
      },
      function () {
        $(this).attr("data-value", "normal");
      }
    );
  });
  // Dragging start
  let windowNode = document.querySelector(".window");
  let gameTitleNode = document.querySelector(".title-bar");
  gameTitleNode.onmousedown = function (event) {
    if (event.target === smile || event.target === bottomRightNode) {
      return false;
    }
    if (event.which === 1) {
      let shiftX = event.clientX - windowNode.getBoundingClientRect().left;
      let shiftY = event.clientY - windowNode.getBoundingClientRect().top;

      windowNode.style.position = "absolute";
      windowNode.style.zIndex = 1000;
      document.body.append(windowNode);
      moveAt(event.pageX, event.pageY);
      function moveAt(pageX, pageY) {
        windowNode.style.left = pageX - shiftX + "px";
        windowNode.style.top = pageY - shiftY + "px";
      }
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
      document.addEventListener("mousemove", onMouseMove);
      document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        gameTitleNode.onmouseup = null;
      };
    }
  };
  // Resize Start
  const bottomRightNode = document.querySelector(".bottomRight");
  const gridNode = document.querySelector(".grid");
  let gridWidth = parseInt(
    getComputedStyle(gridNode).getPropertyValue("width")
  );
  let gridHeight = parseInt(
    getComputedStyle(gridNode).getPropertyValue("height")
  );
  bottomRightNode.onmousedown = function (event) {
    if (event.which === 1) {
      let startX = event.clientX;
      let startY = event.clientY;
      let windowStartWidth = parseInt(
        document.defaultView.getComputedStyle(windowNode).width,
        10
      );
      let windowStartHeight = parseInt(
        document.defaultView.getComputedStyle(windowNode).height,
        10
      );
      function onResizeMouseMove(event) {
        let newWidth = windowStartWidth + event.clientX - startX;
        let newHeight = windowStartHeight + event.clientY - startY;
        if (newWidth >= gridWidth) {
          windowNode.style.width = newWidth + "px";
        }
        if (newHeight >= gridHeight + 110) {
          windowNode.style.height = newHeight + "px";
        }
      }
      document.addEventListener("mousemove", onResizeMouseMove);
      document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", onResizeMouseMove);
        bottomRightNode.onmouseup = null;
      });
    }
  };
}
// 3- making xsl for xslt Processor
$(document).ready(function () {
  $.ajax({
    url: "grid.xsl",
    type: "GET",
    dataType: "xml",
    success: function (gXsl) {
      var selectedLevel = levels[defaultLevel];
      gridXsl = gXsl;
      // Initialize grid with default level
      updateGridResponse(selectedLevel);
    },
    error: function () {
      console.log("An error occurred while requesting the XSL file.");
    },
  });
});

// Game Logic based On Events:

function diffrenceBetweenFlagsAndMines() {
  counterBox.innerHTML = allMines - flagNumber;
  console.log(
    "counterBox in difference between flags and mines:",
    counterBox.innerText
  );
}
// checking has user won or not yet
function checkWinStatus(isRightClick, index) {
  allRevealedSpans = $(".revealed").length;
  if (!isRightClick) {
    $(".grid").children().eq(index).addClass("revealed");
  } else {
    $(".grid").children().eq(index).addClass("flag");
    flagNumber++;
    diffrenceBetweenFlagsAndMines();
  }

  if (allRevealedSpans === allGcells - allMines && flagNumber === allMines) {
    setTimeout(() => {
      winner = true;
      postUserGameData(timer.innerText);
    }, 300);
    $(".smile").attr("data-value", "win");
    $(".grid").children().off("mousedown contextmenu");
    clearTimeout(gameTimer);
  }
}
let levelToPost;
let winningBy = "click";
let winner = true;
let smile = document.querySelector(".smile");
// Add event listener to smile button
smile.onmousedown = function (e) {
  e.preventDefault();
  const levelNames = levels.map((level) => level.title);
  const selectedLevelName = prompt(
    `☺لطفا مرحله رو انتخاب کنید: ${levelNames.join(", ")}`
  );
  const selectedLevel = levels.find(
    (level) => level.title === selectedLevelName
  );
  if (selectedLevel) {
    levelToPost = selectedLevel.title;
    updateGridResponse(selectedLevel, true);
  }
};
function mineClicked(index) {
  smile.dataset.value = "ok";
  $(".grid").children().eq(index).addClass("revealed");
  $(".grid").children().off("mousedown contextmenu");
  clearTimeout(gameTimer);
  setTimeout(() => {
    winner = false;
    postUserGameData(timer.innerText);
  }, 300);
}

// checking if the cell that is sent is in the grid border to send matrix or no
function validator(cellIndex) {
  let i = cellIndex[0];
  let j = cellIndex[1];
  if (0 <= i && i <= allRows - 1 && 0 <= j && j <= allCols - 1) {
    return [i, j];
  }
  return false;
}
function getCellIndex(matrix) {
  let i = matrix[0];
  let j = matrix[1];
  return i * allRows + j;
}
function getRowOfIndex(index) {
  return Math.trunc(index / allRows);
}
function getColOfIndex(index) {
  return Math.trunc(index % allCols);
}
// finding neighbour span's indexes
function neighborIndexes(index) {
  let iIndex = getRowOfIndex(index);
  let jIndex = getColOfIndex(index);
  let resultArray = [];
  const cell = [iIndex, jIndex];
  const cells = [
    [iIndex - 1, jIndex - 1],
    [iIndex - 1, jIndex],
    [iIndex - 1, jIndex + 1],
    [iIndex, jIndex - 1],
    [iIndex, jIndex + 1],
    [iIndex + 1, jIndex - 1],
    [iIndex + 1, jIndex],
    [iIndex + 1, jIndex + 1],
  ];
  cells.forEach((el) => {
    if (validator(el)) {
      resultArray.push(getCellIndex(el));
    }
  });
  return resultArray;
}
// 4-2 Calculation of Adjacent mines
function calculateAdjacentMines(index) {
  let adjacentMines = 0;
  let neighbors = neighborIndexes(index);
  for (let i = 0; i < neighbors.length; i++) {
    let neighborIndex = neighbors[i];
    if (neighborIndex >= 0 && neighborIndex <= allRows * allCols - 1) {
      const $neighborSpan = $(".grid").children().eq(neighborIndex);
      if ($neighborSpan.data("value") === "mine") {
        adjacentMines++;
      }
    }
  }
  return adjacentMines;
}
function getAdjacentMines(index) {
  return calculateAdjacentMines(index);
}
function revealNeighbors(index) {
  const minesNumber = getAdjacentMines(index);
  if (minesNumber > 0) {
    $(".grid").children().eq(index).attr("data-value", minesNumber);
    checkWinStatus(false, index);
  } else {
    const cells = neighborIndexes(index);
    cells.forEach(function (cell) {
      const $cell = $(".grid").children().eq(cell);
      if (!$cell.hasClass("revealed") && !$cell.hasClass("flag")) {
        checkWinStatus(false, cell);
        revealNeighbors(cell);
      }
    });
  }
}

function revealAndCheck(index) {
  let neighFlagNumber = 0;
  const parent = $(".grid").children();
  let selectedCell = parent.eq(index).data("value");
  let newArr = [];
  let neighbors = neighborIndexes(index);
  let isIndexCounted;
  neighbors.forEach((neighbor) => {
    if (parent.eq(neighbor).hasClass("flag")) {
      neighFlagNumber++;
    } else if (!parent.eq(neighbor).hasClass("revealed")) {
      newArr.push(neighbor);
    }
  });

  if (selectedCell <= neighFlagNumber) {
    newArr.forEach((element) => {
      if (parent.eq(element).data("value") === "mine") {
        mineClicked(element);
      } else {
        checkWinStatus(false, element);
        if (timerSet === false) {
          if (!isIndexCounted) {
            increaseCounter(index);
            isIndexCounted = true;
          }
        }
        revealNeighbors(element);
      }
    });
  }
}
// Modal
const btn = document.querySelector(".modal-btn");
const input = document.querySelector(".field");
// const levelName = document.querySelector("#levelName");
const lastRecord = document.querySelector("#lastRecord");
const playerClass = document.querySelector("#playerClass");
const modal = document.querySelector(".modal-content");
function letters(inputText) {
  let letter = /^[A-Za-z\u0600-\u06FF\s]+$/;
  if (inputText.value.match(letter)) {
    modal.style.display = "none";
    return true;
  } else {
    setTimeout(() => {
      alert("برای نام کاربری از حروف استفاده کنید...");
    }, 500);
    return false;
  }
}

btn.addEventListener("click", function () {
  letters(input);
});
//  increase clickNumber
function increaseCounter(index) {
  clickNumber++;
  timer.innerHTML = clickNumber;
  countedArr.push(index);
}

// testPart
const reloadGame = document.querySelector("#reloadGame");
function getPlayerDataResponse(response, error) {
  if (error) {
    console.log("Error in getting user name response: ", error);
    return;
  } else {
    console.log("Response in Getting user name response", response);
    const user = response.user;
    input.value = user.userName;
    input.disabled = true;
    btn.disabled = true;
    // levelName.innerText = user.minesweeper[0].level;
    lastRecord.innerText = user.cup;
    playerClass.innerHTML = user.score;
  }
}

function postUserGameDataResponse(response, error) {
  if (error) {
    console.log("Error in sending users game data: ", error);
    return;
  } else {
    console.log("Response in sending users game data: ", response);
    if (response.addedCup) {
      setTimeout(() => {
        alert(`${response.addedCup}کاپ بهتون اضافه شد`);
        location.reload();
      }, 500);
    } else if (response.lostGame) {
      setTimeout(() => {
        alert("سه تا کاپ ازدست دادی");
        location.reload();
      }, 500);
    } else if (response.msg) {
      setTimeout(() => {
        alert("بازیو بردی ولی رکوردی نزدی کاپات عوض نمیشه");
      }, 500);
    }
  }
}
function getPlayerData() {
  myFetch(
    "mineseweeper",
    "GET",
    getPlayerDataResponse,
    "",
    "getPlayerDataResponse"
  );
}
function postUserGameData(timer_counter) {
  let remainedMineNum = Number(counterBox.innerText);
  let winIndex = Number(timer_counter);

  // if (!timerHandler) {
  //   winIndex = countedArr.length;
  // } else {
  //   winIndex = Number(timer.innerText);
  // }
  const data = {
    remainedMineNum,
    winIndex,
    winningBy,
    levelToPost,
    winner,
  };
  console.log("user game condition: ", data);
  myFetch(
    "mineseweeper",
    "POST",
    postUserGameDataResponse,
    data,
    "postUserGameDataResponse"
  );
}

let levelToReload = "";
$("#reloadGame").click(function () {
  let gridType = $(this).attr("level");
  console.log("rG", gridType);
  if (gridType === "click") {
    levelToReload = "Beginner";
  } else {
    levelToReload = "Harder";
  }
  const resetLevel = levels.find((level) => level.title === levelToReload);
  console.log(resetLevel);
  if (resetLevel) {
    levelToPost = resetLevel.title;
    updateGridResponse(resetLevel, true);
  }
});
window.onload = () => {
  getPlayerData();
};
// end of test Part
