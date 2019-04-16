//캔버스 정의
//배경을 위한 캔버스
//canvas를 매 frame마다 업데이트할 필요없이 한 번만 그려주고 끝이다.
let wid = window.innerWidth;
console.log("width : " + wid);
if (wid > 600){
  wid = 600;
}

let canvasBg = document.getElementById("canvasBg"),
    ctxBg = canvasBg.getContext("2d");

//player, 총, 적을 위한 캔버스
//canvas를 매 frame마다 지우고 다시 그려야 한다. 그래서 배경과 물체가 있는 canvas를 나누었다.
let canvasEntities = document.getElementById("canvasEntities"),
    ctxEntities = canvasEntities.getContext("2d");

canvasBg.setAttribute('width',wid);
canvasBg.setAttribute('height',wid);
canvasEntities.setAttribute('width',wid);
canvasEntities.setAttribute('height',wid);

const canvasWidth = canvasBg.width,
      canvasHeight = canvasBg.height;

let btnUp = document.getElementById("btn-up");
let btnRight = document.getElementById("btn-right");
let btnDown = document.getElementById("btn-down");
let btnLeft = document.getElementById("btn-left");
let btnSpace = document.getElementById("btn-space");
let bulletDisplay = document.getElementById("bullet-display");
let btnReload = document.getElementById("btn-reload");


// let bgImg = new Image();
let enemyImg = new Image();
let dieImg = new Image();
let heroImg = new Image();
let heroImg1 = new Image();

// bgImg.src = "images/bg.png";
enemyImg.src = "images/enemy.png";
dieImg.src = "images/die.png";
heroImg.src = "images/hero.png";
heroImg1.src = "images/hero1.png";

//requestAnimationFrame 함수 브라우저 체크
let requestAnimFrame =  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
   event.preventDefault();
  }
 }, false);