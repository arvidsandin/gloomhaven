import Deck from "./deck.js";
let deck = new Deck(JSON.parse(localStorage.getItem("deck")));
let currentCard = null;
let previousCard = null;
let mostRecentCardDiv;
let mostRecentCardImg;
let secondMostRecentCardDiv;
let secondMostRecentCardImg;
let backsideDiv;
let backsideImg;
let reminder;
let blessCounter;
let curseCounter;
let emptyCardImage = "GH_Trans.png";
let backsideImage = "GH_Backside.png";

addEventListener("DOMContentLoaded", (event) => {
  mostRecentCardDiv = document.getElementById("mostRecentCard");
  mostRecentCardImg = document.getElementById("mostRecentCardImg");
  secondMostRecentCardDiv = document.getElementById("secondMostRecentCard");
  secondMostRecentCardImg = document.getElementById("secondMostRecentCardImg");
  backsideDiv = document.getElementById("backsideDiv");
  backsideImg = document.getElementById("backsideImg");
  reminder = document.getElementById("reminderIcon");
  blessCounter = document.getElementById("blessCounter");
  curseCounter = document.getElementById("curseCounter");
  [backsideDiv, mostRecentCardDiv, secondMostRecentCardDiv].forEach((div) =>
    div.addEventListener("click", (e) => {
      drawNewCard();
    })
  );
  document.getElementById("reshuffleButton").addEventListener("click", (e) => {
    reshuffle();
    updateTexts();
  });
  document.getElementById("blessButton").addEventListener("click", (e) => {
    deck.addCard("x2", "GH_Bless.png");
    updateTexts();
    saveDeck();
  });
  document.getElementById("curseButton").addEventListener("click", (e) => {
    deck.addCard("∅", "GH_Curse.png");
    updateTexts();
    saveDeck();
  });
  currentCard = deck.discardPile[deck.discardPile.length - 1];
  previousCard = deck.discardPile[deck.discardPile.length - 2];
  updateTexts();
});

function drawNewCard() {
  if (currentCard) {
    previousCard = currentCard;
  }
  currentCard = deck.drawCard();
  updateTexts();
  saveDeck();
}

function updateTexts() {
  secondMostRecentCardImg.src = previousCard?.imgSrc ?? emptyCardImage;
  if (currentCard === null) {
    mostRecentCardImg.innerText = "Deck empty";
    mostRecentCardImg.src = emptyCardImage;
  } else {
    mostRecentCardImg.src = currentCard?.imgSrc ?? emptyCardImage;
  }
  backsideImg.src = deck.deck.length > 0 ? backsideImage : emptyCardImage;
  blessCounter.innerText = deck.countBlesses();
  curseCounter.innerText = deck.countCurses();

  if (deck.shouldReshuffle) {
    reminder.classList.remove("inactive");
  }
}

function reshuffle() {
  deck.reshuffleDeck();
  secondMostRecentCardImg.src = emptyCardImage;
  mostRecentCardImg.src = emptyCardImage;
  reminder.classList.add("inactive");
  blessCounter.innerText = deck.countBlesses();
  curseCounter.innerText = deck.countCurses();
  currentCard = null;
  previousCard = null;
  saveDeck();
}

function saveDeck() {
  localStorage.setItem("deck", JSON.stringify(deck));
}
