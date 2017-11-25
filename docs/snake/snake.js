var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = 510; // make sure canvas is this size
var height = 510;
var size = 5;
class SnakeBody {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
    follow(bodyInFront) {
        this.dx = bodyInFront.dx;
        this.dy = bodyInFront.dy;
    }
    followHead(dx, dy) {
    
        this.dx = dx;
        this.dy = dy;
    }
}
var snakebodies = [];
var snakeHead = function () { return snakebodies[0]; }
var dx = 0;
var dy = 0;
var speed = 10;
var xFood = 0;
var yFood = 0;
var addToBody = false;

var lost = false;
var score = 0;
var highscore = 0;

function init() {
    dx = 0;
    dy = -10;
    addToBody = false;
    lost = false;
    score = 0;

    snakebodies = [];
    snakebodies.push(new SnakeBody(width / 2, height / 2, dx, dy));
    snakebodies.push(new SnakeBody(width / 2 - dx, height / 2 - dy, dx, dy));
    snakebodies.push(new SnakeBody(width / 2 - dx * 2, height / 2 - dy * 2, dx, dy));

    spawnFood();
}
function restart() {
    if (lost) {
        if (highscore < score) {
            highscore = score;
        }
        init();
    }
}
function lose() {
    lost = true;
    ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("YOU LOSE!", width / 2, height / 2);
        ctx.font = "15px Arial";
        ctx.fillText("Score: " + score, width / 2, 5 * height / 8);
        ctx.fillText("Hight Score: " + highscore, width / 2, 5.8 * height / 8);
        ctx.fillText("Press Enter to restart", width / 2, 7 * height / 8);
}
function loop() {
    if (!lost) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        addToSnakeBody();
        moveSnake();
        checkWall();
        checkSelf();
        checkFood();

        drawSnake();
        drawFood();
    }
}
function drawSnake() {
    snakebodies.forEach(function (snakebody) {
        drawBall(snakebody.x, snakebody.y)
    })
}
function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawFood() {
    ctx.beginPath();
    ctx.arc(xFood, yFood, size, 0, Math.PI * 2);
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.closePath();
}

function moveSnake() {
    snakeHead().followHead(dx, dy);
    snakeHead().move();
    var i;
    for (i = snakebodies.length - 1; i >= 1; i--) {
        if (addToBody) {
            addToBody = false
        }
        else {
            snakebodies[i].move();
            snakebodies[i].follow(snakebodies[i - 1]);
        }
    }

}
function addToSnakeBody() {
    if (addToBody) {
        var lastBody = snakebodies[snakebodies.length - 1];
        snakebodies.push(new SnakeBody(
            lastBody.x,
            lastBody.y,
            lastBody.dx,
            lastBody.dy
        ));
    }
}
function checkWall() {
    var xHead = snakeHead().x;
    var yHead = snakeHead().y;
    if (
        xHead < speed || // less than 0
        xHead > width - speed || // greater than width
        yHead < speed || //less than 0
        yHead > height - speed  // greater than height
    ) {
        lose();
    }
}
function checkFood() {
    var xHead = snakeHead().x;
    var yHead = snakeHead().y;
    if (xHead == xFood && yHead == yFood) {
        addToBody = true;
        spawnFood();
        score++;
        console.log(score);
    }
}
function checkSelf() {
    var xHead = snakeHead().x;
    var yHead = snakeHead().y;
    var i;
    for (i = snakebodies.length - 1; i >= 1; i--) {
        if (xHead == snakebodies[i].x &&
            yHead == snakebodies[i].y) {
            console.log("LOST");
            lose();
        }
    }
}
function spawnFood() {
    var randx = randomX()
    var randy = randomY()

    xFood = width / 2 + speed * randx;
    yFood = height / 2 + speed * randy;
}
function randomX() {
    var range = (width / speed) - 2;
    return Math.round((Math.random() - 0.5) * range);
}
function randomY() {
    var range = (height / speed) - 2;
    return Math.round((Math.random() - 0.5) * range);
}

function keyDownHandler(e) {
    var xHead = snakeHead().dx;
    var yHead = snakeHead().dy;
    //if key pressed and not moving in oposite direction
    if (e.keyCode == 87 && yHead != speed) { //w
        dx = 0;
        dy = -speed;
    }
    else if (e.keyCode == 83 && yHead != -speed) { //s
        dx = 0;
        dy = speed;
    }
    else if (e.keyCode == 65 && xHead != speed) { //a
        dx = -speed;
        dy = 0;
    }
    else if (e.keyCode == 68 && xHead != -speed) { //d
        dx = speed;
        dy = 0;
    }

    if (e.keyCode == 13) {
        restart();
    }
}
function keyUpHandler(e) {
    //
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
init();


var tickcounter = 0
var tickmax = 15;
function ticker() {
    tickcounter++;
    if (tickcounter >= tickmax) {
        tickcounter = 0;
        loop();
    }
}
setInterval(ticker, 10);