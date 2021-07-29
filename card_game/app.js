//=====================전역변수영역============================
// //난이도-카드장수 선택

// var total;
// var levNumber;

// $easy = document.getElementById('#easy');
// $nomal = document.getElementById('#nomal');
// $hard = document.getElementById('#hard');

// $easy.addEventListener("click",() => {
//     levNumber = 1;
// });
// $nomal.addEventListener("click",() => {
//     levNumber = 10;
// });
// $hard.addEventListener("click",() => {
//     levNumber = 100;
// });



// function level(){
    
// if (levNumber === 1) {
//     total = 12;
// } else if (levNumber === 10) {
//     total = 24;
// } else {
//     total = 36;
// }
// }
// level(levNumber);

// console.log(total);






//가로세로 설정
const horizon = 4;
const vertical = 4;

const cardTotal = horizon * vertical;
// console.log(cardTotal);

//카드감싸는 cards 요소 검색
const $cardContainer = document.getElementById('card-container');
// console.log($cardContainer);

//컬러리스트
let colorArray = [
    "pink",
    "pink",
    "skyblue",
    "skyblue",
    "yellow",
    "yellow",
    "coral",
    "coral",
    "gray",
    "gray",
    "yellowgreen",
    "yellowgreen",
    "slateblue",
    "slateblue",
    "crimson",
    "crimson"
]

//재시작 할 때 사용할 색깔 배열: slice를 통해 colorArray를 복사한다. ================??왜 굳이? 섞는걸 복사해서 해야하나?
let colorSelect = colorArray.slice();

//랜덤으로 들어갈 배열
let color = [];

//정답 카드 넣는 배열
let cardFinish = [];

//버튼객체생성
const $hint = document.getElementById("hint");
const $view = document.getElementById("view");
const $replay = document.getElementById("replay");

//힌트 갯수 설정
let hintcount = 5;

//랜덤배열 만들기
const shuffle = () => {
    for (let i = 0; colorSelect.length > 0; i++) {
        color = color.concat( //concat함수는 문자열을 합쳐준다.
            colorSelect.splice(Math.floor(Math.random() * colorSelect.length), 1)
        );
    }
    // console.log(color);
}

//카드세팅
const setting = (hori, verti) => {

    for (let i = 0; i < hori * verti; i++) {

        
        //문서객체 생성
        const $card = document.createElement("div");
        const $cardInner = document.createElement("div");
        //카드 앞면(공통)
        const $cardFront = document.createElement("div");
        //카드 안쪽(답)
        const $cardBack = document.createElement("div");
        
        
        //문서객체에 클래스 부여
        $card.classList.add("card");
        $cardInner.classList.add("card-inner");
        $cardFront.classList.add("card-front")
        $cardBack.classList.add("card-back");

        //**힌트가능 카드 선정 클래스 부여
        $card.classList.add("get-hint");
        

        //문서객체를 추가하기
        $cardContainer.appendChild($card);
        $card.appendChild($cardInner);
        $cardInner.appendChild($cardFront);
        $cardInner.appendChild($cardBack);

        $cardFront.style.backgroundColor = "#313131";
        $cardBack.style.backgroundColor = color[i];

        // //toggle기능 부여 =>>미리보기 시간에 클릭 방지하기 위해 지금 사용 안한다.
        // $card.addEventListener("click", () => {
        //     $card.classList.toggle("flip");
        // });
    }

    //card 검색
    const $Cards = document.querySelectorAll(".card");
    
    // 세팅 중 클릭 방지
    let clickFlag = false;

    //카드가 두 장 뒤집어 질 때 담길 클릭요소 배열
    let cardArray = [];

    //카드 열기
    $Cards.forEach((aCard, index) => {

        setTimeout(() => {
            aCard.classList.add("flip");
        }, 1000 + 100 * index);
        //+100 * index: 순차적으로 펼쳐지게끔 한다. 공식이 뭘까..
    });

    //카드 닫기
    $Cards.forEach((aCard, _) => { // _는 뭐지?? 인덱스가 필요없을 때??
        setTimeout(() => {
            aCard.classList.remove("flip");
        }, 4000);
    });

    //카드가 다 뒤집어진 후 true로 바꿔서 클릭 가능으로 변경
    setTimeout(() => {
        clickFlag = true;
    }, 4000);


    //==========================짝맞추기 구현================================

    /* 
    clickFlag가 true 일 때만 작동하도록 
    조건이 맞을 때 toggle"flip"기능으로 카드 뒤집기
    클릭한 요소를 클릭요소 배열에 옮기고 참거짓 실행 후 클릭요소 배열에서 다시 지우기.
     1.참:완료 배열에 넣기. 2.거짓:다시 뒤집기 
    */


    $Cards.forEach((card, _) => { 
        
        card.addEventListener("click",() => {

            if (clickFlag && !cardFinish.includes(card) && !card.classList.contains('flip')) { //card??? ()가 비어서 대상 이름이 들어가는건가? 
                
                // 오류 발견!: 같은 카드를 두 번 누르면 같은 카드로 인식->뒤집힌 채로 고정되버린다!
                //if e.target에 class flip이 있을 때 cardFlag:false            

                // 정답을 맞춘 카드도 다시 클릭이 가능하다. cardFinish에 없는 요소만 클릭이 가능하도록 해야한다! 
                // => 맨 처음조건에 조건 추가: cardFinish에 포함되지 않은 요소일 때(!cardFinish.include(card)) 
                
                card.classList.toggle("flip");

                cardArray.push(card); //클릭이벤트가 진행된 card를 배열에 넣기??


                if (cardArray.length === 2) {

                    //카드 색상값 추출
                    let cardA =
                        cardArray[0].querySelector(".card-back").style.backgroundColor;
                    let cardB =
                        cardArray[1].querySelector(".card-back").style.backgroundColor;


                    //카드비교 시작
                    if (cardA === cardB) {
                        cardFinish.push(cardArray[0]);
                        cardFinish.push(cardArray[1]);
                        console.log('성공한 카드');
                        console.log(cardFinish);

                        cardArray = [];

                        //삭제한 요소와 같은 짝을 찾아서 삭제해야한다. => 너무 어렵다..
                        //정답일 시에는 get-hint클래스 삭제: 마지막 클릭한것만 삭제된다..
                        //결론: flip을 가지고 있으며 get-hint가 없는 요소를 찾자..
                        
                        // 실패 원인들 기록...
                        // $Cards.querySelectorAll => 여기서 Cards는 클릭한 요소이기 때문..
                        // $flipcard.classList.remove('get-hint') => 배열이라 안되고 [i]번째마다 지우기를 반복.
                        
                        //for문이 안되는 이유는 모르겠다. for-of문으로 돌리니 된다..
                        // for(i = 0; i<2; i++) {
                        //     $flipcard[i].classList.remove('get-hint');
                        // }

                        const $flipcard = document.querySelectorAll(".flip");
                        
                        for(let i of [...$flipcard]) {
                            i.classList.remove('get-hint');
                        }


                        //카드 초기화
                        if (cardFinish.length === cardTotal) {
                            /*
                            문제발생!: 그냥 setting만 다시 돌리면 종료된 카드 밑에 새 카드들이 같은 배열로 나열되고 두 배로 뒤집힌다! => 랜덤배열, 완료배열 비우기
                                    => 새로 생긴 카드들이 지워진다: color [] 를 비운다
                                    또한 마지막 카드가 펼쳐지지 않은 채로 게임이 종료메시지가 뜬다! => setTimeout 
                            */
                            setTimeout(() => {
                                alert('게임 끝!');

                                $cardContainer.innerHTML = "";
                                cardFinish = [];
                                color = [];
                                colorSelect = colorArray.slice();

                                shuffle();
                                setting(horizon, vertical);
                            }, 500);
                        }

                    } else {
                        //카드 두 장을 뒤집는 도중에도 클릭이 가능! -> clickFlag를 false로 줘서 잠시 중단시키자!
                        clickFlag = false;

                        //카드 다시 뒤집기 - 시간을 넣어두지 않으면 두번째 카드가 펼쳐지지 않은 채로 flip이 제거된다.
                        setTimeout(() => {
                            cardArray[0].classList.remove("flip");
                            cardArray[1].classList.remove("flip");

                            cardArray = [];
                            clickFlag = true;
                        }, 1000);
                    }
                }
            }
        });
    });



    //버튼이벤트
    /*
        1. 랜덤값인데 계속 두번쨰 카드만 선택이 된다. => 랜덤값 수정
        2. 정답을 맞췄음에도 계속 실행이 된다 => if문에서 !cardFinish.include(card)

    */
    

    $hint.addEventListener('click', e => {
    
        hintcount--;
        if(hintcount > 0) {
            //힌트 카운트 기능 + 몇 회 남았는지 event로 설정
            //성공한 카드는 제외하고 돌리기
            //if i가 cardFinish의 배열에 없는 요소일 때 :cardHintList의 배열에서 뽑기? ->실패
            //flip이 있는 요소들(성공한 카드들)의 get-hint 제거 후 get-hint클래스가 있는 요소를 뽑아서 힌트 돌리기
            // 조건 : cardcolor === cardHintList[i]
            //       !cardFlip.classList.contains('flip')
                
            clickFlag = false;

            //힌트 조건 맞는 카드들과 랜덤으로 선택하기
            const $card = document.getElementsByClassName("get-hint");
            const i = Math.floor(Math.random() * $card.length);
            
            let cardFlip = $card[i];
            console.log('gethint카드 i번째');
            console.log(cardFlip);
            
            //힌트 카운트 이벤트
            $hint.addEventListener('mouseenter', () => {
                $hint.textContent = `${hintcount}회 남음`;
            })
            $hint.addEventListener('mouseleave', () => {
                $hint.textContent = '힌트 보기';
            })
            
            //힌트 실행 함수
            if (!cardFlip.classList.contains('flip')){
                    
                $card[i].classList.add("flip");
                
                setTimeout(() => {
                    $card[i].classList.remove("flip");
                    clickFlag = true;
                }, 1000);
            }
        }

    })

    //정답 이벤트
    $view.addEventListener('click', e => {
        $Cards.forEach((aCard, index) => {
            setTimeout(() => {
                aCard.classList.add("flip");
            }, 1000 + 100 * index);
            //+100 * index: 순차적으로 펼쳐지게끔 한다. 공식이 뭘까..
        });
        alert('다음엔 성공할 거에요!');
    })

    //다시하기 이벤트
    $replay.addEventListener('click', e => {
        setTimeout(() => {
            alert('게임을 다시합니다!');

            $cardContainer.innerHTML = "";
            cardFinish = [];
            color = [];
            colorSelect = colorArray.slice(); 

            shuffle();
            setting(horizon, vertical);
        }, 500);
    })
};

shuffle();
setting(horizon, vertical);


               //랜덤 카드의 생상값
                // let cardcolor = cardFlip.querySelector(".card-back").style.backgroundColor
    
                // console.log('힌트리스트');
                // console.log(cardHintList);
    
                // console.log('힌트리스트에서 i번째');
                // console.log(cardHintList[i]);
    
                // console.log('힌트카드');
                // console.log(cardFlip);