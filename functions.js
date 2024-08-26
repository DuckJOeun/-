let ready_sec = 4;
const readyCountdown = document.getElementById("대기_카운트다운");
var timer;

/* 대기 */
window.onload = function() {
    console.log("잠시 후 게임이 시작됩니다");
    // 게임 시작 타이머 설정
    // timer = setInterval(readyHandler, 1000);
    timer = setInterval(gameCountHandler, 1000);
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

/* 게임 */
let countdown_sec = 5;
const gameCountdown = document.getElementById("게임_text");
const gameCountHandler = () => {
    countdown_sec = countdown_sec - 1;
    
    if (countdown_sec === 0) {
        gameCountdown.innerText = "같은 그림의 카드를 한 쌍씩 찾아주세요";
        console.log("카드를 뒤집습니다!");
        clearInterval(timer);

        // 카드 뒤집기
    }
    else {
        gameCountdown.innerText = countdown_sec + "초 후에 카드가 뒤집힙니다";
        console.log(countdown_sec + "초 후에 카드를 뒤집습니다");
    }
}

/* 카드 앞면 보이기 */
function card_front(index) {

}
/* 카드 뒷면 보이기 */
function card_back(index) {

}