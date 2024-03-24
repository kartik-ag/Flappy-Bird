//board
let board;
let boardwidth = 840;
let boardheight = 640;
let context;
let score = -1;
let time = 2001;

//bird
let birdwidth = 34;
let birdheight = 24;
let birdX = 45;
let birdY = 320;

let bird = {
    x: birdX,
    y: birdY,

    width: birdwidth,
    height: birdheight
}

//pipes
let pipeArray = [];
let pipewidth = 64;
let pipeheight = 512;
let pipeX = boardwidth;
let pipeY = 0;
let velocityX = -2;
let velocityY = 0;
let gravity = 0.05;

let topPipeImg;
let botyomPipeImg;

let gameover = false;
let welcome;





window.onload = function () {
    board = document.getElementById("board");
    container = document.getElementsByClassName("container");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");// used for drawing on the board

    //pipes
    topPipeImg = new Image();
    topPipeImg.src = "./toppipe.png";

    botyomPipeImg = new Image();
    botyomPipeImg.src = "./bottompipe.png";

    // draw bird
    birdImage = new Image();
    birdImage.src = "./flappybird.jpg";
    birdImage.onload = function () {
        context.drawImage(birdImage, bird.x, bird.y, bird.height, bird.width);
    }

    requestAnimationFrame(update);
    setInterval(placePipes, time);
    setInterval(speedchanger, 10000);

    document.addEventListener("keydown", movebird);
}

function update() {
    if (gameover) {
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImage, bird.x, bird.y, bird.height, bird.width);
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x = pipe.x + velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (detectCollision(bird, pipe, 0) || bird.y > board.height) {
            gameover = true;

        }
    }
}


function placePipes() {
    if (gameover) {
        gravity = 0;
        velocityX = 0;
        velocityY = 0;
        context.font = "50px Algerian";
        context.fillText("GAME OVER", 300, 320);
        return;
    }

    let randomPipeY = pipeY - 160 - Math.random() * (300);
    let openingspace = 160;
    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: botyomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeheight + openingspace,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    pipeArray.push(bottomPipe);
    score += 1;
    console.log(score)
    if (score <= 3) {
        let text = document.getElementById("score");
        text.innerHTML = 0;
    }
    else if (score > 3) {
        let text = document.getElementById("score");
        text.innerHTML = score - 3;
    }


}

function movebird(e) {
    if (gameover) {
        return;
    }
    else if (e.code == "ArrowUp") {
        velocityY = -2;
    }
}

function detectCollision(a, b, c) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function speedchanger() {
    if (time > 500) {
        time -= 500;
    }
}

