//전역변수영역

//같은 수의 카드 두 장씩 생성
let cardOriginArray = [1,1,2,2,3,3,4,4];
let cardOriginCopy = cardOriginArray.slice();
let cardRandom = [];


//함수정의부

//카드 랜덤생성함수
function randomShuffle() {
    while (cardOriginCopy.length < 9) {
        let cardArray = Math.floor(Math.random() * cardOriginCopy.length);
        let randomArray = cardOriginCopy.splice(cardArray, 1)[0];
        cardRandom.push(randomArray);
    }
    console.log(cardRandom);
}
//메인실행부

// (function () {

//     //카드 랜덤생성
//     // randomShuffle();
// })