let tryAgain = document.querySelector(".try");
let character = document.querySelector(".character");
let block = document.querySelector(".block");
let coin = document.querySelector(".coin");
let scoreDashboard = document.querySelector(".score");
let score2 = document.querySelector(".score2");
let totalCoins = document.querySelector(".totalCoins");
let finalCoin = document.querySelector(".finalCoins")
let dot = document.querySelector("[data-cursor-dot]");
let outline = document.querySelector("[data-cursor-outline]");
let scoreSound = new Audio ("jumpsound2.mp4");
let gameover = new Audio ("gameover.mp4");
let coinScore = new Audio ("coinScore.mp3");
let easy = document.querySelector(".easy");
let hard = document.querySelector(".hard");
let coinCollected = 0;
let finalCoinCollected = 0;
let score = 0;
let scoreIncrement = false;
let coinIncrement = false;

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    dot.style.top = `${posY}px`;
    dot.style.left = `${posX}px`;
    outline.animate({
        top: `${posY}px`,
        left: `${posX}px`
    }, {duration: 200, fill: "forwards"});
});

document.addEventListener("keydown", (e)=>{
    if (e.key == "ArrowLeft"){moveLeft()};
    if (e.key == "ArrowRight"){moveRight()};
});

function moveLeft(){
    let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    characterLeft-=150;
    if(characterLeft>=0){character.style.left = characterLeft + "px";};
};

function moveRight(){
    let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    characterRight+=150;
    if(characterRight<450){character.style.left = characterRight + "px";};
};

block.addEventListener("animationiteration", () => {
    var random = Math.floor(Math.random()*3)*150;
    block.style.left = random + "px";
    coin.style.left = random + "px";
    scoreIncrement = false;
    coinIncrement = false;
});

setInterval(() => {
    let coinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue("left"));
    let coinTop = parseInt(window.getComputedStyle(coin).getPropertyValue("top"));
    let cLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    let bLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let bTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
    if(cLeft == bLeft && bTop<470 && bTop>300 ){
        character.style.display = "none";
        block.style.display = "none";
        document.querySelectorAll(".border").forEach( (border) => {
           border.style.display = "none";
        });
        document.querySelector(".heading-container").style.paddingTop = "30px";
        document.querySelector(".inside-game").style.display = "inline";
        coin.style.display = "none";
        score = 0;
        gameover.play();
    } else if (cLeft !== bLeft && bTop>470 && bTop<550 && !scoreIncrement){
        score++;
        scoreDashboard.innerHTML = score;
        score2.innerHTML = score;
        scoreIncrement = true;
        scoreSound.currentTime = 0;
        scoreSound.play();
    } else if (coinLeft == cLeft && coinTop>470 && coinTop<550 && !coinIncrement){
        finalCoinCollected++;
        finalCoin.innerHTML = finalCoinCollected;
        coinCollected++;
        totalCoins.innerHTML = coinCollected;
        coinIncrement = true;
        coinScore.currentTime = 0;
        coinScore.play();
    }
}, 10);

tryAgain.addEventListener("click", () => {
    finalCoinCollected = 0;
    coinCollected = 0;
    coin.style.display = "flex";
    scoreDashboard.innerHTML = 0;
    totalCoins.innerText = 0;
    finalCoin.innerHTML = finalCoinCollected;
    score2.innerHTML = 0;
    character.style.display = "flex";
    block.style.display = "flex";
    document.querySelectorAll(".border").forEach( (border) => {
       border.style.display = "inline";
    });
    document.querySelector(".heading-container").style.paddingTop = "0px";
    document.querySelector(".inside-game").style.display = "none";
});