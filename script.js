const dinosaur = document.querySelector(".dinosaur");
const background = document.querySelector(".background");

let isDumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isDumping) {
            jump();
        }
    }
}

function jump() {
    isDumping = true;

    let upInterval = setInterval(() => {

        if (position >= 200) {
            clearInterval(upInterval);

            // going down
            let downInterval = setInterval(() => {

                if (position == 0) {
                    clearInterval(downInterval);
                    isDumping = false;
                } else {
                    position -= 20;
                    dinosaur.style.bottom = position + "px";
                }
            }, 20);
        } else {
            // going up
            position += 20;
            dinosaur.style.bottom = position + "px";
        }

    }, 20);
}

function createCactus() {
    const cactus = document.createElement("div");
    let cactusPosition = 800;
    let randomTime = Math.random() * 6000;

    cactus.classList.add("cactus");
    cactus.style.left = 800 + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {

        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 75 && position < 60) {
            // game over
            clearInterval(leftInterval);
            document.querySelector(".container").innerHTML = "<h1 class='game-over'>Game Over</h1>";
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener("keyup", handleKeyUp);