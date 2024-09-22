let userSelection = document.querySelectorAll(".icon");
let computer = document.querySelectorAll(".computer");
let lines = document.querySelector(".lines");
let user = document.querySelector(".user");
let pc = document.querySelector(".pc");
let result_Container = document.querySelector(".result-container");
let result = document.querySelector(".result");
let text = document.querySelector(".text");
let play_Again = document.querySelector(".play-again");
let pc_Score = document.querySelector(".pc-score");
let user_Score = document.querySelector(".user-score");
let next = document.querySelector(".next-btn");
let rules = document.querySelector(".rules-btn");
let rules_1 = document.querySelector(".rules-1");
let play_Next = document.querySelector(".play-next");

let pcScore = parseInt(localStorage.getItem("pcScore")) || 0;
let userScore = parseInt(localStorage.getItem("userScore")) || 0;

pc_Score.innerText = pcScore;
user_Score.innerText = userScore;

function update_Scores(pcValue, userValue) {
  pcScore += pcValue;
  userScore += userValue;
  pc_Score.innerText = pcScore;
  user_Score.innerText = userScore;
  localStorage.setItem("pcScore", pcScore);
  localStorage.setItem("userScore", userScore);
}

let gameActive = true;

userSelection.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    if (!gameActive) return;
    // console.log(elem);
    let random = Math.floor(Math.random() * 3);
    // console.log(random);
    lines.style.display = "none";

    userSelection.forEach((item) => {
      item.style.display = "none";
    });
    elem.style.display = "block";
    elem.classList.add("left");
    user.style.display = "block";

    userSelection.forEach((item) => item.classList.remove("winner-pulse"));
    computer.forEach((item) => item.classList.remove("winner-pulse"));

    setTimeout(() => {
      computer.forEach((elem) => {
        elem.style.display = "none";
      });
      pc.style.display = "block";

      computer[random].style.display = "block";
      computer[random].classList.add("right");

      setTimeout(() => {
        if (index === random) {
          result_Container.style.display = "block";
          result.textContent = "tie up";
          text.style.display = "none";
          play_Again.innerText = "replay";
        } else if (
          (index === 0 && random === 1) ||
          (index === 1 && random === 2) ||
          (index == 2 && random === 0)
        ) {
          result_Container.style.display = "block";
          result.textContent = "you win";
          next.style.display = "block";
          update_Scores(0, 1);
          elem.classList.add("winner-pulse");
        } else {
          result_Container.style.display = "block";
          result.textContent = "you lost";
          update_Scores(1, 0);
          computer[random].classList.add("winner-pulse");
        }
        gameActive = false;
      }, 1000);
    }, 500);
  });
});

play_Again.addEventListener("click", () => {
  window.location.reload();
  gameActive = true;
});

next.addEventListener("click", () => {
  document.querySelector(".page-1").style.display = "none";
  document.querySelector(".page-2").style.display = "flex";
});

rules_1.addEventListener("click", () => {
  document.querySelector(".box-1").style.display = "flex";
});

rules.addEventListener("click", () => {
  document.querySelector(".box").style.display = "flex";
});

document.querySelector(".remove").addEventListener("click", () => {
  document.querySelector(".box-1").style.display = "none";
});

document.querySelector(".delete").addEventListener("click", () => {
  document.querySelector(".box").style.display = "none";
});
play_Next.addEventListener("click", () => {
  document.querySelector(".page-1").style.display = "flex";
  //   rules_1.style.display = "none";
  document.querySelector(".page-2").style.display = "none";
  window.location.reload();
});
