let ready_sec = 4;
const readyCountdown = document.getElementById("대기_카운트다운");
var timer;

let Cards = [ 0, ];
// 카드 초기화
function initCards() {
    let numbers = [1, 2, 3, 4, 5, 6];
    // 1번부터 6번 이미지 중 4개의 이미지를 랜덤으로 고르기
    shuffle(numbers);

    let temp = [];
    for (let i=0; i<4; i++) {
        temp.push(numbers[i]);
        temp.push(numbers[i]);
    }
    shuffle(temp);

    // 무작위로 섞은 4쌍의 카드를 Cards 배열에 추가
    for (let i=0; i<8; i++) {
        Cards.push(temp[i]);
    }
    console.log(Cards);
}
// 배열 무작위 섞기
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        // 무작위 i 값을 만듦 (0 이상의 배열 길이 값)
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
}

/* 대기 카운트다운*/
window.onload = function() {
    console.log("잠시 후 게임이 시작됩니다");
    // 카드 초기화
    initCards();
    for (let i=1; i<=8; i++) {
        card_front(i);
    }
    // 게임 시작 타이머 설정
    timer = setInterval(readyHandler, 1000);
    // timer = setInterval(gameCountHandler, 1000);
}

const readyHandler = () => {
    ready_sec = ready_sec - 1;
    readyCountdown.innerText = ready_sec;
    if (ready_sec === 0) {
        console.log("게임 시작!");
        clearInterval(timer);

        document.getElementById("대기화면").style.display = 'none';
        document.getElementById("게임화면").style.display = '';
        
        // 카드 뒤집는 타이머 설정
        timer = setInterval(gameCountHandler, 1000);
    }
    else {
        console.log(ready_sec + "초 남았습니다");
    }
};

/* 게임 카운트다운*/
let countdown_sec = 5;
const gameCountdown = document.getElementById("게임_text");
const gameCountHandler = () => {
    countdown_sec = countdown_sec - 1;
    
    if (countdown_sec === 0) {
        gameCountdown.innerText = "같은 그림의 카드를 한 쌍씩 찾아주세요";
        console.log("카드를 뒤집습니다!");
        clearInterval(timer);

        // 카드 뒤집기
        for (let idx = 1; idx <= 8; idx++) {
            card_back(idx);
        }
        // 카드에 이벤트 등록
        for (let idx = 1; idx <= 8; idx++) {
            document.getElementById(idx + "번").addEventListener('click', () => cardClick(idx));
        }
    }
    else {
        gameCountdown.innerText = countdown_sec + "초 후에 카드가 뒤집힙니다";
        console.log(countdown_sec + "초 후에 카드를 뒤집습니다");
    }
}

/* 카드 앞면 보이기 */
function card_front(index) {
    console.log(index + "번 카드를 확인합니다");

    let frontURL = 'url(img/' + Cards[index] + '.png) no-repeat center / cover';
    document.getElementById(index +"번").style.background = frontURL;
}
/* 카드 뒷면 보이기 */
const backURL = 'url(img/back.png) no-repeat center / cover';
function card_back(index) {
    console.log(index + "번 카드를 뒤집었습니다");

    document.getElementById(index +"번").style.background = backURL;
}

let card_opened = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 카드의 앞면이 보이는지 (0이면 뒷면, 1이면 앞면)
let card_cleared = [1, 0, 0, 0, 0, 0, 0, 0, 0]; // 카드의 짝이 맞춰져 있는지 (0이면 NO, 1이면 Yes)
let clickPair = 0; // 두 번의 클릭마다 카드 일치 여부를 확인하기 위함
let card1 = 0;
let card2 = 0;
let card1_element;
let card2_element;

let clearPair = 0; // 맞춘 카드 쌍의 개수 (4개가 되면 게임 종료)

/* 카드 이벤트 */
function cardClick(index) {
    // 카드가 아직 짝이 맞춰지지 않은 경우에만 클릭 이벤트 적용
    if (card_cleared[index] == 0)
    {
        clickPair += 1;
        switch (clickPair) {
            case 1:
                card1 = index;
                console.log("첫번째 카드(" + card1 + ") = " + Cards[card1] + "번 그림");
                card_front(card1);
                break;
            case 2:
                card2 = index;
                console.log("두번째 카드(" + card2 + ") = " + Cards[card2] + "번 그림");
                card_front(card2);
                break;
        }

        // 두 번의 클릭마다 카드 일치 여부를 확인
        if (clickPair == 2)
        {
            if (Cards[card1] == Cards[card2]) // 짝 맞추기 성공
            {
                clearPair += 1;
                console.log("짝 맞추기 성공! (현재 성공 카드쌍=" + clearPair + ")");

                card_cleared[card1] = 1;
                card_cleared[card2] = 1;

                // 4쌍의 카드를 다 맞춘 경우, 게임 종료
                if (clearPair == 4)
                {
                    return gameClear();
                }
                else {
                    card1 = 0;
                    card2 = 0;
                    clickPair = 0;
                }
            }
            else // 짝 맞추기 실패
            {
                console.log("짝 맞추기 실패...");
                
                setTimeout(function(){
                    card_back(card1);
                    card_back(card2);

                    card1 = 0;
                    card2 = 0;
                    clickPair = 0;
                }, 1000);
            }   
        }
    }
}

/* 게임 완료 */
function gameClear() {
    console.log("게임 완료!");
}