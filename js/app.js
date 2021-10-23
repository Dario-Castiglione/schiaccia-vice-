// ottieni tutti gli elementi con classe hole //ritorna una specie di array
const holes = document.querySelectorAll('.hole'); 
// ottengo lo score
const scoreBoard = document.querySelector('.score');
//ottengo la talpa "vice'"
const moles = document.querySelectorAll('.mole'); 
//ottengo il countdown
const countdownBoard = document.querySelector('.countdown'); 
//ottengo il pulsante start
const startButton = document.querySelector('.startButton') 
//ho importato su js tutti gli elementi tramite la classe


// ricordati lo scope
let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

//creo una funzione che sceglie un hole random diverso da quello precedente
function pickRandomHole(holes){
    const randomHole = Math.floor(Math.random() * holes.length); // questo mi da un numero random da 0 a 5
    const hole = holes[randomHole]; //e qui scelgo l'hole random
    if (hole === lastHole){
        return pickRandomHole(holes);  //questo lo sai bene
    }
    lastHole = hole;
    return hole;
}
//ricordati lo scope, questo hole è indipendente
function popOut(){
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if (!timeUp) {popOut()};     //check se il gioco non e' gia finito
    }, time);
}



function startGame(){
    countdown = timeLimit/1000; //dinamico cosi se cmbio time limit non devo fare niente
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0){
            countdown = 0;
            clearInterval(startCountdown);
            countdownBoard.textContent = "Ne hai presi"
        }
    }, 1000);
}
startButton.addEventListener('click',startGame);


//on click element
function whack(e){
    score++;
    this.style.backgroundImage = 'url("js/vice1.png")';
    this.style.pointerEvents = 'none'
    setTimeout(() => {
     this.style.backgroundImage = 'url("js/vice.png")'
     this.style.pointerEvents = 'all';
    }, 1200);
    scoreBoard.textContent = score;
}
moles.forEach(mole => mole.addEventListener('click', whack));
