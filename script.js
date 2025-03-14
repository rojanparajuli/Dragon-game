let cross = true;
let score = 0;
let gameLoop;
let gameActive = false;

let gameTheme = new Audio("assets/audio/gameTheme.mp3");
let gameOverSound = new Audio("assets/audio/gameover.mp3");
let pressSound = new Audio("assets/audio/press.mp3");

function startGame() {
    score = 0;
    cross = true;
    gameActive = true;
    document.getElementById("scorecount").innerHTML = "Your Score: 0";

    document.querySelector(".gameover").style.visibility = "hidden";
    document.querySelector(".start-button").style.display = "none";

    let obstacle = document.querySelector(".obstacle");
    obstacle.classList.add("animateobstacle");
    obstacle.style.display = "block";

    gameTheme.loop = true; 
    gameTheme.play();

    gameLoop = setInterval(checkCollision, 10);
}

document.onkeydown = function (e) {
    if (!gameActive) return;

    let dragon = document.querySelector(".dragon");

    if (e.keyCode == 38) {
        pressSound.play();

        if (!dragon.classList.contains("animatedragon")) {
            dragon.classList.add("animatedragon");
            setTimeout(() => {
                dragon.classList.remove("animatedragon");
            }, 700);
        }
    }

    if (e.keyCode == 37) {
        pressSound.play();

        let dragonx = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"));
        if (dragonx > 0) {
            dragon.style.left = dragonx - 50 + "px";
        }
    }

    if (e.keyCode == 39) {
        pressSound.play();

        let dragonx = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"));
        if (dragonx < 700) {
            dragon.style.left = dragonx + 50 + "px";
        }
    }
};

function checkCollision() {
    let dragon = document.querySelector(".dragon");
    let gameover = document.querySelector(".gameover");
    let obstacle = document.querySelector(".obstacle");

    let dx = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"));
    let dy = parseInt(window.getComputedStyle(dragon).getPropertyValue("bottom"));

    let ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    let oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue("bottom"));

    let offsetx = Math.abs(dx - ox);
    let offsety = Math.abs(dy - oy);

    if (offsetx < 70 && offsety < 50) {
        gameover.style.visibility = "visible";
        obstacle.classList.remove("animateobstacle");
        gameActive = false;

        clearInterval(gameLoop);
        document.querySelector(".start-button").style.display = "block";

        gameTheme.pause();
        gameOverSound.play();
    } else if (offsetx < 125 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
    }
}

function updateScore(score) {
    document.getElementById("scorecount").innerHTML = "Your Score: " + score;
}
