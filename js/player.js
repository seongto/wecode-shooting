const heroOriginImgWidth = 560;
const heroOriginImgHeight = 600;

class Player {
  constructor() {
    //용사의 x, y 좌표
    this.drawX = wid/2-wid/20;
    this.drawY = wid/2-wid/20;

    //용사 이미지의 크기
    this.width = Math.floor(canvasWidth/10);
    this.height = Math.floor(canvasWidth/10);

    //용사이미지의 가운데 점의 좌표(x,y) - 총알 나가는 위치로 사용됨
    //tutorial/heroXY.png 참고

    //한 번의 frame에 몇 픽셀씩 이동할지 speed를 할당합니다.
    this.speed = 2;

    //현재 용사가 무슨 방향으로 이동하고 있는지 할당합니다.
    this.direction = 'left';
    this.heroLook = heroImg1;

    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    this.isShooting = false;

    // [1-1] Bullet 추가
    this.bullets= [];
    this.ammo = 6;
    this.reload();

    // 현재 총알
    this.currentBullet = 0;
  }

  update() {
    this.checkDirection();
    // 새로 추가된 함수입니다!
    this.checkShooting();
    this.updateAllBullets();
  }

  draw() {
    //drawX, drawY 값은 매 frame마다 바뀌는 property 입니다.
    //매 frame마다 새로운 drawX, drawY값으로 hero를 그려줍니다.
    ctxEntities.drawImage(this.heroLook, 0, 0, heroOriginImgWidth, heroOriginImgHeight, this.drawX, this.drawY, this.width, this.height);
  }

  /**
   * 현재 방향을 확인해서 위치를 이동
   */
  checkDirection() {
    //[1-3] 구현
    let newX = this.drawX;
    let newY = this.drawY;
    //[1-5] 구현
    switch (this.direction){
      case "up" :
        if (this.isUpKey){ 
          newY -= this.speed; 
          }
        break;
      case "down" :
        if (this.isDownKey){ 
          newY += this.speed; 
          }
        break;
      case "right" :
        if (this.isRightKey){ 
          newX += this.speed; 
          }
        break;
      case "left" :
        if (this.isLeftKey){ 
          newX -= this.speed; 
          }
        break;
    }

    if (!outOfBounds( this, newX, newY)) {
      this.drawX = newX;
      this.drawY = newY;
    }
  }

  checkShooting() {
    if (this.isSpacebar && !this.isShooting) {
      this.isShooting = true;
      // [1-2] 구현해주세요.
      let centerX = this.drawX + (this.width / 2);
      let centerY = this.drawY + (this.height / 2);

      if (this.currentBullet < this.ammo ){
        this.bullets[this.currentBullet].fire(centerX, centerY);
        document.getElementsByClassName('bullet-now')[this.currentBullet].innerHTML = this.bullets[this.currentBullet].displayUsed;
        this.currentBullet += 1;
      } else {

      }
      

    } else if (!this.isSpacebar) {
      this.isShooting = false;
    }
  }

  reload() {
    this.bullets = [];
    bulletDisplay.innerHTML = "";
    for ( let i = 0; i < this.ammo; i++){
      let newBullet = new Bullet();
      this.bullets.push(newBullet);
      let bulletGraphic = document.createElement("li");
      bulletGraphic.innerHTML = `
        <p class="bullet-now">${this.bullets[i].displayReady}</p>
      `;
      bulletDisplay.appendChild(bulletGraphic);
    }
    console.log("리로드후 : "+this.bullets);
    this.currentBullet = 0;
  }

  updateAllBullets() {

    // [1-3] 구현해주세요.
    for ( let i = 0; i < this.bullets.length; i++){
      if (this.bullets[i].isFlying) {
        this.bullets[i].draw();
        this.bullets[i].update();
      }
    }
  }
}