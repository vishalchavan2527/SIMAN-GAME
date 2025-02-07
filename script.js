
let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "purple", "green"];

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game was started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function() {
        btn.classList.remove("gameflash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    // random Btn
    let randIndx = Math.floor(Math.random() * 4); // Corrected range to 4
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);

    // Reset user sequence for the new level
    userSeq = [];
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game is over! Your Score was <b>${level}</b> <br> Press any key to start the game.`;
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (let btn of allBtn) { // Added 'let' to declare variable
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
