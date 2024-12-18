import Card from './card.js';
export default class Deck {
    version = 1;
    constructor(savedDeck) {
        if (savedDeck && savedDeck.version >= this.version) {
            this.deck = savedDeck.deck ?? [];
            this.discardPile = savedDeck.discardPile ?? [];
            this.shouldReshuffle = savedDeck.shouldReshuffle;
        }
        else{
            this.deck = [];
            this.discardPile = [];
            this.addCards('+0', './GH_0.png', 6);
            this.addCards('+1', './GH_+1.png', 5);
            this.addCards('-1', './GH_-1.png', 5);
            this.addCards('+2', './GH_+2.png', 1);
            this.addCards('-2', './GH_-2.png', 1);
            this.addCards('x2', './GH_x2.png', 1, true);
            this.addCards('∅', './GH_Null.png', 1, true);
            this.shouldReshuffle = false;
        }
    }


    drawCard() {
        if (this.deck.length === 0) {
            return null;
        }
        const index = (Math.floor(Math.random() * this.deck.length));

        const nextCard = this.deck.splice(index, 1)[0];
        if (nextCard.triggerShuffle) {
            this.shouldReshuffle = true;
        }
        this.discardPile.push(nextCard);
        return nextCard;
    }

    reshuffleDeck() {
        this.discardPile.forEach(card => {
            if (card.inStartingDeck) {
                this.deck.push(card);
            }
        });
        this.discardPile = [];
        this.shouldReshuffle = false;
    }

    addCard(value, imgSrc){
        this.deck.push(new Card(value, imgSrc, false, false));
    }

    addCards(value, imgSrc,  amount, triggerShuffle = false){
        for (let index = 0; index < amount; index++) {
            this.deck.push(new Card(value, imgSrc, triggerShuffle, true));
        }
    }

    countBlesses(){
        return this.deck.concat(this.discardPile).filter(card => card.value === 'x2' && !card.inStartingDeck).length;
    }

    countCurses() {
        return this.deck.concat(this.discardPile).filter(card => card.value === '∅' && !card.inStartingDeck).length;
    }
}