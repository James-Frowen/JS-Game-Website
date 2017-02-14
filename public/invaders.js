var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var width = 510; // make sure canvas is this size
var height = 510;
var size = 5;
var player = {
    x: 0,
    y: 0,
    damage: 1,
    speed: 1,
    moveSpeed: function () {
        return this.speed * size;
    },
    draw: function () {
        ctx.fillStyle = "#008000";
        ctx.beginPath();
        ctx.moveTo(this.x               , this.y - size);
        ctx.lineTo(this.x + size * 2    , this.y - size);
        ctx.lineTo(this.x + size * 3    , this.y + size);
        ctx.lineTo(this.x - size * 3    , this.y + size);
        ctx.lineTo(this.x - size * 2    , this.y - size);
        ctx.lineTo(this.x               , this.y - size);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#800000";
        ctx.beginPath();
        ctx.moveTo(this.x               , this.y - size);
        ctx.lineTo(this.x + size        , this.y - size);
        ctx.lineTo(this.x + size        , this.y - size * 3);
        ctx.lineTo(this.x - size        , this.y - size * 3);
        ctx.lineTo(this.x - size        , this.y - size);
        ctx.lineTo(this.x               , this.y - size);
        ctx.closePath();
        ctx.fill();
    }
};

function move() {
    if (moveLeft) {
        moveLeft = false;
        if (player.x - player.moveSpeed() > 0) {
            player.x -= player.moveSpeed();
        }
    }
    if (moveRight) {
        moveRight = false;
        if (player.x + player.moveSpeed() < width) {
            player.x += player.moveSpeed();
        }
    }
}

function shoot() {
    
}

function restart() {

}
function lose() {

}
function init() {
    player.x = width / 2;
    player.y = height / 2 + size * 25;
    player.speed = 1;
    player.damage = 1;
}
function loop() {
    move();

    draw();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();

}
var moveLeft = false;
var moveRight = false;
function keyDownHandler(e) {
    if (e.keyCode == 65 && e.keyCode == 68) {
        moveLeft = false;
        moveRight = false;
    }
    else if (e.keyCode == 65) {
        moveLeft = true;
        moveRight = false;
    }
    else if (e.keyCode == 68) {
        moveLeft = false;
        moveRight = true;
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
var tickmax = 10; // tick every 10*10 ms
function ticker() {
    tickcounter++;
    if (tickcounter >= tickmax) {
        tickcounter = 0;
        loop();
    }
}
setInterval(ticker, 10);