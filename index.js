import Deck from "./deck.js";
let deck = new Deck(JSON.parse(localStorage.getItem('deck')));
let currentCard = null;
let previousCard = null;
let theDiv;
let secondDiv;
let reminder;
let blessCounter;
let curseCounter;
addEventListener("DOMContentLoaded", (event) => {
    theDiv = document.getElementById('mostRecentCard');
    secondDiv = document.getElementById('secondMostRecentCard');
    reminder = document.getElementById('reminderIcon');
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
    currentCard = deck.discardPile[deck.discardPile.length - 1];
    previousCard = deck.discardPile[deck.discardPile.length - 2];
    updateTexts();
});

function drawNewCard() {
    previousCard = currentCard;
    currentCard = deck.drawCard();
    updateTexts();
    saveDeck();
}

function updateTexts(){
    secondDiv.innerText = previousCard?.value ?? '';
    if (currentCard === null) {
        theDiv.innerText = 'Deck empty';
    }
    else{
        theDiv.innerText = currentCard?.value ?? '';
    }
    blessCounter.innerText = deck.countBlesses();
    curseCounter.innerText = deck.countCurses();

    if (deck.shouldReshuffle) {
        reminder.classList.remove('inactive');
    }
}

function reshuffle(){
    deck.reshuffleDeck();
    secondDiv.innerText = '';
    theDiv.innerText = '';
    reminder.classList.add('inactive');
    blessCounter.innerText = deck.countBlesses();
    curseCounter.innerText = deck.countCurses();
    currentCard = null;
    previousCard = null;
    saveDeck();
}

function saveDeck() {
    localStorage.setItem('deck', JSON.stringify(deck));
}