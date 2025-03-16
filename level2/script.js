let cross = true;
let score = 0;
let gameLoop;
let gameActive = false;

let gameTheme = new Audio("assets/audio/thememusic.mp3");
let gameOverSound = new Audio("assets/audio/gameover.mp3");
let pressSound = new Audio("assets/audio/press.mp3");
let winSound = new Audio("assets/audio/victorymale-version-230553.mp3");

function startGame() {
    score = 0;
    cross = true;
    gameActive = true;
    document.getElementById("score").innerHTML = "0";

    document.querySelector(".gameover").style.visibility = "hidden";
    document.querySelector(".gameover").innerHTML = "Game Over";
    document.querySelector(".gameover").style.color = "red";

    document.querySelector(".start-button").style.display = "none";
    document.querySelector(".retry-button").style.display = "none";
    document.querySelector(".gameover-gif").style.display = "none";

    let dragon = document.querySelector(".dragon");
    dragon.style.left = "50px";

    let obstacle = document.querySelector(".obstacle");
    obstacle.style.display = "block";
    obstacle.classList.remove("animateobstacle");

    void obstacle.offsetWidth;

    obstacle.classList.add("animateobstacle");

    gameTheme.loop = true;
    gameTheme.play().catch(error => console.log("Audio play blocked:", error));

    gameLoop = setInterval(checkCollision, 10);
}

document.onkeydown = function (e) {
    let dragon = document.querySelector(".dragon");

    if (e.keyCode == 13 && !gameActive) {
        startGame();
        return;
    }

    if (!gameActive) return;

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
        if (dragonx < 1200) {
            dragon.style.left = dragonx + 50 + "px";
        }
    }
};

function checkCollision() {
    let dragon = document.querySelector(".dragon");
    let gameover = document.querySelector(".gameover");
    let obstacle = document.querySelector(".obstacle");
    let finishLine = document.querySelector(".finish-line");
    let gameoverGif = document.querySelector(".gameover-gif");

    let dx = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"));
    let dy = parseInt(window.getComputedStyle(dragon).getPropertyValue("bottom"));

    let ox = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    let oy = parseInt(window.getComputedStyle(obstacle).getPropertyValue("bottom"));

    let fx = parseInt(window.getComputedStyle(finishLine).getPropertyValue("left"));

    let offsetx = Math.abs(dx - ox);
    let offsety = Math.abs(dy - oy);

    if (offsetx < 80 && offsety < 80) {
        gameover.style.visibility = "visible";
        obstacle.classList.remove("animateobstacle");
        gameActive = false;
        clearInterval(gameLoop);

        gameTheme.pause();
        gameOverSound.play();

        document.querySelector(".retry-button").style.display = "block";
    } else if (dx >= fx - 50) {
        gameActive = false;
        clearInterval(gameLoop);
        gameTheme.pause();
        winSound.play();

        gameover.innerHTML = "You Won!";
        gameover.style.color = "green";
        gameover.style.visibility = "visible";

        document.querySelector(".retry-button").style.display = "block";
        gameoverGif.style.display = "block";
    }
}

document.querySelector(".start-button").addEventListener("click", startGame);
document.querySelector(".retry-button").addEventListener("click", startGame);
