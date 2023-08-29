const bcrypt = require("bcrypt");
const User = require("../DB/schemas/user");
const categories = require("../DB/schemas/categories");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

function comparePass(rawPass, hashedPass) {
  return bcrypt.compareSync(rawPass, hashedPass);
}
function validateEmail(email) {
  if (!email.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    return false;
  } else {
    return true;
  }
}
function validatePassword(password) {
  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/)) {
    return false;
  } else {
    return true;
  }
}
function validateCredentials(item) {
  let regEx;
  item === email
    ? (regEx = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
    : (regEx = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{2}$/);
  if (!item.match(regEx)) {
    return false;
  } else {
    return true;
  }
}
function randomCodeGenerator() {
  return Math.floor(Math.random() * 1000);
}
function producePhotoName(image, name) {
  image.name = name;
}

function userToken(rawToken) {
  const regex = /(?<=(s:)).*(?=\.)/;
  let token = rawToken.match(regex);
  // const userProfile =  User.findOne({ token });
  return token[0];
}
function getCategories(collection, isAllGame) {
  let entityCtgs = [];
  collection.forEach((entity) => {
    isAllGame
      ? entityCtgs.push(entity.categories)
      : entityCtgs.push(entity.name);
  });
  return entityCtgs;
}
function findCommonElements(firstCollection, secondCollection) {
  // return firstCollection.some((item) => secondCollection.includes(item));
  let sameCtg = [];
  for (let i = 0; i < firstCollection.length; i++) {
    for (let j = 0; j < secondCollection.length; j++) {
      if (firstCollection[i] === secondCollection[j]) {
        sameCtg.push(secondCollection[j]);
      }
    }
  }
  return sameCtg;
}
let ans = 0;
function decreaseCup(
  user,
  winIndex,
  prevTime,
  prevCup,
  prevClickNum,
  cupIndex = 3
) {
  ans = prevCup - cupIndex;
  console.log("ans :", ans);
  if (ans <= 0) {
    ans = 0;
  } else {
    ans = prevCup - cupIndex;
  }
  return User.updateOne(
    { _id: user._id },
    {
      $set: {
        minesweeper: [
          {
            level: "Beginner",
            widCondition: "click",
            clickNumber: prevClickNum,
            clickNumberToLose: winIndex,
            timer: prevTime,
            // cup: ans,
          },
        ],
        cup: ans,
        score: calculateUserScore(prevCup, cupIndex),
      },
    }
  );
}
function cupHandler(player) {
  if (player.cup > 0 && player.cup <= 10) {
    return "bronze";
  } else if (player.cup > 10 && player.cup <= 20) {
    return "silver";
  } else if (player.cup > 20 && player.cup <= 30) {
    return "gold";
  } else if (player.cup === 0) {
    return "metal";
  }
}
function calculateUserScore(prevCup, cupIndex) {
  let totalCups = prevCup + cupIndex;
  // let scoreClass = "";
  if (totalCups > 0 && totalCups < 10) {
    return "J";
  } else if (totalCups > 10 && totalCups < 20) {
    return "I";
  } else if (totalCups > 20 && totalCups < 30) {
    return "H";
  } else if (totalCups > 30 && totalCups < 40) {
    return "G";
  } else if (totalCups > 40 && totalCups < 50) {
    return "F";
  } else if (totalCups > 50 && totalCups < 60) {
    return "E";
  } else if (totalCups > 60 && totalCups < 70) {
    return "D";
  } else if (totalCups > 70 && totalCups < 80) {
    return "C";
  } else if (totalCups > 80 && totalCups < 90) {
    return "B";
  } else if (totalCups > 90) {
    return "A";
  }
}
module.exports = {
  hashPassword,
  comparePass,
  validateEmail,
  validatePassword,
  randomCodeGenerator,
  userToken,
  getCategories,
  findCommonElements,
  decreaseCup,
  calculateUserScore,
  cupHandler,
};
