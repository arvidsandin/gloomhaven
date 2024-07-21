import Deck from "./deck.js";

let deck = new Deck();
let currentCard = null;
let previousCard = null;
let theDiv;
let secondDiv;
let reminder;
let blessCounter;
let curseCounter;
addEventListener("DOMContentLoaded", (event) => { 
    theDiv = document.getElementById('theDiv');
    secondDiv = document.getElementById('secondDiv');
    reminder = document.getElementById('reminder');
    blessCounter = document.getElementById('blessCounter');
    curseCounter = document.getElementById('curseCounter');
    theDiv.addEventListener("click", e => {
        drawNewCard();
    });
    document.getElementById('reshuffleButton').addEventListener("click", e => {
        reshuffle();
    });
    document.getElementById('blessButton').addEventListener("click", e => {
        deck.addCard('x2');
        blessCounter.innerText = deck.countBlesses();
    });
    document.getElementById('curseButton').addEventListener("click", e => {
        deck.addCard('∅');
        curseCounter.innerText = deck.countCurses();
    });
});

function drawNewCard() {
    previousCard = currentCard;
    currentCard = deck.drawCard();
    if (currentCard === null){
        theDiv.innerText = 'Deck empty'
        return;
    }

    secondDiv.innerText = previousCard?.value ?? '';
    theDiv.innerText = currentCard?.value ?? '';

    if (currentCard.triggerShuffle){
        reminder.innerText = 'Deck should be reshuffled'
    }
}

function reshuffle(){
    deck.reshuffleDeck();
    secondDiv.innerText = '';
    theDiv.innerText = '';
    reminder.innerText = '';
    blessCounter.innerText = deck.countBlesses();
    curseCounter.innerText = deck.countCurses();
    currentCard = null;
    previousCard = null;
}
