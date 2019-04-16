let player1 = new Player();
let enemies = [];
let numEnemies = 8;

//bgImg 이미지가 load 되면 init함수가 시작할 수 있도록 event listener 추가
// bgImg.addEventListener('load', init, false);
init();

//entry point
function init() {

  //[1-1] keydown, keyup 이벤트 리스너를 추가했습니다. 소스코드 아래쪽에 checkKey 함수를 구현해주세요.
  document.addEventListener('keydown', function(e) {checkKey(e, true);});
  document.addEventListener('keyup', function(e) {checkKey(e, false);});

  btnUp.addEventListener('touchstart', function(e) {checkKey(38, true);});
  btnUp.addEventListener('touchend', function(e) {checkKey(38, false);});
  btnRight.addEventListener('touchstart', function(e) {checkKey(39, true);});
  btnRight.addEventListener('touchend', function(e) {checkKey(39, false);});
  btnDown.addEventListener('touchstart', function(e) {checkKey(40, true);});
  btnDown.addEventListener('touchend', function(e) {checkKey(40, false);});
  btnLeft.addEventListener('touchstart', function(e) {checkKey(37, true);});
  btnLeft.addEventListener('touchend', function(e) {checkKey(37, false);});
  btnSpace.addEventListener('touchstart', function(e) {checkKey(32, true);});
  btnSpace.addEventListener('touchend', function(e) {checkKey(32, false);});
  btnReload.addEventListener('touchstart', function(e) {checkKey(82, true);});
  btnReload.addEventListener('touchend', function(e) {checkKey(82, false);});

  btnUp.addEventListener('mousedown', function(e) {checkKey(38, true);});
  btnUp.addEventListener('mouseup', function(e) {checkKey(38, false);});
  btnRight.addEventListener('mousedown', function(e) {checkKey(39, true);});
  btnRight.addEventListener('mouseup', function(e) {checkKey(39, false);});
  btnDown.addEventListener('mousedown', function(e) {checkKey(40, true);});
  btnDown.addEventListener('mouseup', function(e) {checkKey(40, false);});
  btnLeft.addEventListener('mousedown', function(e) {checkKey(37, true);});
  btnLeft.addEventListener('mouseup', function(e) {checkKey(37, false);});
  btnSpace.addEventListener('mousedown', function(e) {checkKey(32, true);});
  btnSpace.addEventListener('mouseup', function(e) {checkKey(32, false);});
  btnReload.addEventListener('mousedown', function(e) {checkKey(82, true);});
  btnReload.addEventListener('mouseup', function(e) {checkKey(82, false);});
  
  //canvas에 배경이미지 그려주기
  // ctxBg.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);

  initEnemies();

  //매 frame 마다 사용할 함수를 호출합니다.
  requestAnimFrame(loop);
}

function update() {
  //각 물체의 상태가 update되기 전에 모든 물체를 포함한 canvas를 싹 지워줍니다.
  clearCtx(ctxEntities);

  //적 상태 업데이트
  updateAllEnemies();

  //용사 상태 업데이트
  player1.update();
}

function draw() {
  //업데이트 된 적 그리기
  drawAllEnemies();

  //업데이트 된 용사 그리기
  player1.draw();
}

function loop() {
  //상태값 업데이트하고 그 이후에 그려준다
  update();
  draw();

  //재귀함수
  //loop함수 안에서 또 다시 frame마다 사용할 함수인 loop를 호출하였습니다.
  //끝임없이(frame 마다) loop함수가 호출됩니다.
  requestAnimFrame(loop);
}

function clearCtx(ctx) {
  //새로운 canvas를 그려주기 전에 every frame 마다 지워줘야한다.
  //그렇지 않으면 이전 잔상이 남고 쌓이게 된다.
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
 * min, max 사이의 random 숫자를 반환하는 함수
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function randomRange (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * 최초 한 번 호출
 * 적 수 대로 적을 그려줌
 */
function initEnemies() {
  for (let i = 0; i < numEnemies; i++) {
    enemies[enemies.length] = new Enemy();
  }
}

/**
 * 매 frame마다 호출
 */
function updateAllEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
  }
}

/**
 * 매 frame마다 호출
 */
function drawAllEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}

/**
 * keydown하면 value가 true
 * keyup하면 value가 false
 */
function checkKey(e, value) {
  //[1-2] 키코드에 맞게 기능을 추가해주세요.
  let input = (typeof e === 'number') ? e : e.keyCode;
  switch (input){
    case 38: 
      if (value === true){
        player1.direction = "up";
      }
      player1.isUpKey = value;
      break;
    case 39:
      if (value === true){
        player1.direction = "right";
        player1.heroLook = heroImg;
      }
      player1.isRightKey = value;
      break; 
    case 40:
      if (value === true){
        player1.direction = "down";
      }
      player1.isDownKey = value;
      break;
    case 37:
      if (value === true){
        player1.heroLook = heroImg1;
        player1.direction = "left";
      }
      player1.isLeftKey = value;
      break;
    case 32:
      player1.isSpacebar = value;
      break;
    case 82:
      if (value === true){
        player1.reload();
      }
      break;
  }

  //지우지 마세요
  //preventDefault는 브라우저의 이벤트를 막아준다. 예를들면 스크롤이 있다면, 아래키를 눌렀을 때 스크롤이 아래로 내려가는 것을 막아줌
  if (typeof e !== 'number'){e.preventDefault();}
  
}

/**
 * outOfBounds(a, x, y) 함수는
 * 알고 싶은 객체(player나 enemy)가 화면 밖으로 나가는지 체크하고 boolean을 return
 * a: 알고 싶은 객체
 * x: 이동할 x 위치
 * y: 이동할 y 위치
 */
function outOfBounds(a, x, y) {
  // [1-4] 구현
  if ( (x < 10) || (x > canvasWidth - a.width -10) || (y < 10) || (y > canvasWidth - a.height -10)){
    return true;
  } else {
    return false;
  }
}

// bullet랑 enemy랑 충돌했나 확인
// enemy랑 영역안에 bullet랑가 들어가면 true
function collision(bullet, enemy) {
  // [2-2] 구현
  let enemyXS = enemy.drawX;
  let enemyXE = enemyXS + enemy.width;
  let enemyYS = enemy.drawY;
  let enemyYE = enemyYS + enemy.height;

  if ( (bullet.drawX > enemyXS)&&(bullet.drawX < enemyXE)&&(bullet.drawY > enemyYS)&&(bullet.drawY < enemyYE) ){
    return true;
  } 
}