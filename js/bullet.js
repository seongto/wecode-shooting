class Bullet {
  constructor() {
    this.radius = 4;
    this.drawX = 0;
    this.drawY = 0;
    this.isFlying = false;

    this.width = this.radius;
    this.height = this.radius;

    //속도
    this.xVel = 0;
    this.yVel = 0;
    this.speed = 6;

    this.isCritical = false;
    this.displayReady = "●";
    this.displayUsed = "○";
    let ranNum = randomRange(1,9);
    if (ranNum === 9){
      this.speed = 12;
      this.isCritical = true;
      this.displayReady = "★";
      this.displayUsed = "☆";
      this.radius = 20;
    }
  }

  /**
   * 매 프레임마다 실행되는 함수, 총알을 (this.drawX, this.drawY) 위치에 그려준다.
   */
  draw() {

    // 캔버스 위에 하얀 원의 총알을 그리는 작업입니다.
    // canvas 영역이니 다음에 함께 다루도록 하겠습니다.
    (this.isCritical)? ctxEntities.fillStyle = '#ff6f61' : ctxEntities.fillStyle = 'black';
    ctxEntities.beginPath();
    ctxEntities.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2, false);
    ctxEntities.closePath();
    ctxEntities.fill();
  };

  /**
   * (this.drawX, this.drawY) 갱신하는 함수
   */
  update() {

    // [1-4] 구현해주세요.
    
    this.bulletFlying();
    this.checkHitEnemy();
  };


  /**
   *  Player 클래스에서 스페이스 눌렀을 때 호출함.
   *  (startX, startY) 위치에서 총알이 시작된다.
   *  player1의 direction에 따라 this.xVel, this.yVel 이 갱신된다.
   */
  fire(startX, startY) {
    const soundEffect = new Audio('audio/shooting.wav');
    soundEffect.play();
    this.xVel = 0;
    this.yVel = 0;

    this.drawX = startX;
    this.drawY = startY;
    // [1-5] 구현해주세요.
    switch (player1.direction){
      case "up":
        this.yVel = -this.speed;
        this.xVel = 0;
        this.isFlying = true;
        break;
      case "right":
        this.xVel = this.speed;
        this.isFlying = true;
        break;
      case "down":
        this.yVel = this.speed;
        this.isFlying = true;
        break;
      case "left":
        this.xVel = -this.speed;
        this.isFlying = true;
        break;
    }
  };

  /**
   *  isflying인 동안, 매 frame마다 돌아감
   */
  checkHitEnemy() {
    for ( let i = 0; i < enemies.length; i++){
      if (collision(this, enemies[i])){
        this.isFlying = false;
        enemies[i].die();
      }
      
    };
    // [2-3] 구현해 주세요.

  };

  bulletFlying(){
    let newX = this.drawX;
    let newY = this.drawY;
    
    newX += this.xVel;
    newY += this.yVel;

    if ( !this.isBulletOut(this, newX, newY )) {
      this.drawX = newX;
      this.drawY = newY;
    }
  }

  isBulletOut(a, x, y){
    let outRange = this.radius + 10
    if ( (x < -outRange ) || (x > canvasWidth + outRange) || (y < -outRange) || (y > canvasWidth + outRange)){
      return true;
    } else {
      return false;
    }
  }
}