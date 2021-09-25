
/*
    
    <카드는 색상값으로 짝을 구분한다.>
    1. 카드 갯수 설정과 랜덤으로 배치되기
    2. 일정시간 뒷면 보여준 후 카드 앞면으로 뒤집기 
    3. 카드 두 장을 선택 
       i. 두 장이 일치 할 때: 더이상 클릭이 되지 않음
       ii. 두 장이 일치하지 않을 때: 다시 앞면으로 뒤집기.
    4. 전부 뒤집기에 성공했을 때: 게임오버, 다시 처음으로 리셋.

    + 버튼이벤트
      힌트: 랜덤으로 카드 하나를 보여주는 기능.
      정답: 남아있는 카드들 전부 보여주는 기능.
      다시하기: 새로 리셋해서 다시하는 기능


    
    <카드배열 설정>
    
    - 랜덤배열. 
    원본 색이 담긴 배열을 랜덤으로 사용 시 오염될 수 있어 colorSelect에 복사해서 사용.
    
    for문으로 배열의 길이만큼 반복, concat함수를 통해 color에 colorSelect배열의 [i]를 순서대로 옮겼다.
    **concat: 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환합니다. 
    
    - 카드변수가 네 개인 이유: 세 개를 써도 되지 않나? card/inner는 굳이 왜?
    카드의 앞 뒷면을 담기 위한 cardInner, 카드의 앞 뒷면 cardFront,Back
    



    <주요 활동 함수>

    - 뒤집히는 카드 효과와 일정시간동안 카드패를 보여주는 등의 활동을 위해 밑의 함수들을 주로 사용했다.
      forEach함수를 통해 순서대로 카드가 뒤집히는 효과를 사용,
      setTimeout을 통해 일정 시간 이후에 함수가 실행되도록 사용.
      특정요소에 flip클래스의 유무로 toggle을 사용해서 카드 뒤집기.
    

    # 자잘한 부분에서 오류가 일어나 생각보다 많이 사용했다.
        ex) 마지막 카드를 선택하고 게임이 끝난 경우 마지막 카드가 완전히 뒤집히지 않고 완료알림이 실행되어
            setTimeout을 통해 여유 시간을 만들었다.

            같은 카드를 두 번 뒤집으면 성공배열에 들어가서 오류발생
            => 클릭요소에 flip클래스가 있다면 적용이 되지 않도록 if문 조건에 첨가.





                    forEach()
                    변수.forEach(function(배열요소, 순서){
                        함수내용~~;
                    });
                    배열객체의 메서드. 객체(배열)의 요소들을 차례대로 호출.
                    for문처럼 반복적인 기능수행하지만 for처럼 조건과 증가값을 설정하지 않아 직관적이다.
                    forEach의 콜백함수에는 배열의 요소 뿐 아니라 index, 전체 배열을 인자로 사용 가능.
                    예외(throw)를 발생시키지 않으면 중간에 반복을 종료할 수 없다.
                    참고링크  -  https://aljjabaegi.tistory.com/314
                
                    SetTimeout()
                    변수 = setTimeout(일정 시간 후 실행될 함수명을 정의, 지연시간ms단위로);
                    지연시간(두번째 인자) 지난 후 함수(첫번째 인자)실행.
                    타이머가 만료된 후 함수나 코드를 실행하는 타이머 설정.
                    시간 설정 안할 시에 기본값 0초. 시간설정은 스크립트 코드가 내려가는 순이 아닌
                    코드가 동작한 이후로부터 시작
                    clearTimeout: setTimeout을 취소하는 역할
                    clearTimeout(변수);
                    1000ms = 1second
                
                    toggle
    
                    

                    
    <카드 일치여부 판단>
                    
    - 카드 뒤집히는 조건을 위해 if문과 클릭한 요소들을 선택한 요소 배열 cardArray와
      정답을 맞춘 카드들이 들어가는 배열 cardFinish를 만들었다.
                    
    true->  cardArray에 두 장의 카드가 선택되어 들어오면 [0] === [1]일 경우 cardFinish배열에 들어가며
            더 이상 클릭이 되지 않는다(if문의 전제에 설정해두었음.) 
            다음 차례를 위해 cardArray배열을 비운다.

    false-> 다시 앞면으로 뒤집기 위해 flip클래스를 삭제하고 마찬가지로 배열을 지운다.
            이 때 카드를 두 장 뒤집는 동안에도 카드 뒤집기가 활성화 되어있어 cardFlag를 잡시 false로 바꾸고
            setTimeout을 통해 카드가 뒤집히는 1초동안 움직이지 않도록 설정한다. 
    
    
    

    <카드게임 완료 >
    마지막 카드 한 쌍이 같을 경우 실행되므로 카드비교 if문 속에 들어있다.
    게임을 초기화해주는 코드가 들어있다.
*/
