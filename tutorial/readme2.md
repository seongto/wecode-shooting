# 용사가 캔버스 밖으로 나가지 않도록 막기

## game.js

`[1-4]` outOfBounds 함수를 구현해봅시다. player나 enemy가 화면 밖으로 넘어가는지 확인하는 함수입니다.

Player나 Enemy class에서 this.drawX, this.drawY 값을 업데이트 할 때 outOfBounds 함수로 확인해서 넘어가지 않았을 때(false)만 this.drawX, this.drawY를 갱신할 것입니다.


## player.js
`[1-5]` checkDirection 에서 outOfBounds 확인해서 this.drawX, this.drawY를 갱신해봅시다.
