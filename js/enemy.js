const enemyOriginImgWidth = 654;
const enemyOriginImgHeight = 534;

class Enemy {
  constructor() {

    //enemy이미지 크기
    this.width = Math.floor(canvasWidth/10);
    this.height = Math.floor(canvasWidth/10);

    //적의 x, y 좌표
    //최초에 있을 곳 랜덤하게
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);

    //적의 중심점. player와 같은 방식의 계산
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

    //제일 첨에 어디로 이동할지 목표지점 잡음
    this.targetX;
    this.targetY;
    this.dif; 

    //얼마나 자주 이동할 것인지
    this.randomMoveTime = randomRange(1000, 2000);

    //frame마다 1초씩 움직임
    this.speed = randomRange(4,10);

    //현재 인스턴스가 죽었는지 살았는지.
    this.isDead = false;

    //[1-1] 랜덤하게 정한 randomMoveTime 시간마다 setTargetLocation 실행됨
    //randomMoveTime에 정해진 초마다 목표좌표(target X,Y)가 수정된다.
    this.moveInterval = setInterval(() => {
        this.setTargetLocation();
      }, this.randomMoveTime);
  }

  update() {
    this.checkDirection();
  };

  draw() {
    //drawX, drawY 값은 매 frame마다 바뀌는 property 입니다.
    //매 frame마다 새로운 drawX, drawY값으로 적을 그려줍니다.
    if (this.isDead) {
      ctxEntities.drawImage(dieImg, 0, 100, 858, 605, this.drawX, this.drawY, this.width, this.height);
    } else {
      ctxEntities.drawImage(enemyImg, 0, 0, enemyOriginImgWidth, enemyOriginImgHeight, this.drawX, this.drawY, this.width, this.height);
    }
  };

  //어디로 이동할지 좌표 정함
  //정해진 때마다 한 번 호출
  setTargetLocation() {
    let ranNum = randomRange(0,1);
    //새로운 목표할당시 기존 목표 초기화
    this.targetX = this.drawX;
    this.targetY = this.drawY;
    if (ranNum === 0) {
      this.targetX = randomRange(this.drawX-200, this.drawX+200);
      this.dif = this.drawX - this.targetX;
    } else {
      this.targetY = randomRange(this.drawY-200, this.drawY+200);
      this.dif = this.drawY - this.targetY;
    }
  };

  //매 frame 계속 호출. target X,Y로 갈 때까지 움직인다.
  checkDirection() {
    let sp = this.speed;
    let newTo;
    if (this.targetX !== this.drawX){
      newTo = this.drawX;
    } else {
      newTo = this.drawY;
    }
    
    if ( this.dif < 0 ){
      newTo += sp;
      if ( this.dif <= -sp ) {
        this.dif += sp;
      } else {
        this.dif = 0;
      }
    } else if (this.dif > 0){
      newTo -= sp;
      if ( this.dif >= sp ) {
        this.dif -= sp;
      } else {
        this.dif = 0;
      }
    }

    if (this.targetX !== this.drawX){
      if (!outOfBounds( this, newTo, this.drawY)) {
        this.drawX = newTo;
      }
    } else {
      if (!outOfBounds( this, this.drawX, newTo)) {
        this.drawY = newTo;
      }
    }
  };

  die() {
    const soundEffect = new Audio('audio/dying.wav');
    soundEffect.play();
    
    // [2-1] 구현
    clearInterval(this.moveInterval);
    this.isDead = true;
  };
}