# 용사 움직이기

## game.js

* `[1-1]` init 함수에 키 이벤트를 추가했습니다.
* `[1-2]` 키 이벤트가 발생될 때 실행될 함수를 구현해주세요. 키 이벤트가 발생될 때, player1의 상태가 변화해야합니다.
    * isUpKey(화살표위), isRightKey(화살표오른쪽), isDownKey(화살표아래), isLeftKey(화살표왼), isSpacebar(스페이스바) 값이 눌린 상태인지 아닌지를 boolean 형으로 할당해주세요.
    * player의 이 프로퍼티를 확인해서 방향이동이 있을 예정입니다.


## player.js
`[1-3]` checkDirection 함수를 구현해주세요.
* isUpKey, isDownKey, isRightKey, isLeftKey 값 확인해서
    * this.direction 값 업데이트 시키고
    * 방향에 맞게 drawX나 drawY의 값에 this.speed를 더하거나 빼줍니다.

*참고: 브라우저에서 오른쪽, 아래 방향이 플러스 입니다. tutorial/xy.png 참고*



