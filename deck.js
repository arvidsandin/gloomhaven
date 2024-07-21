import Card from './card.js';
export default class Deck {
    constructor() {
        this.deck = [];
        this.discardPile = [];
        this.addCards('+0', 6);
        this.addCards('+1', 5);
        this.addCards('-1', 5);
        this.addCards('+2', 1);
        this.addCards('-2', 1);
        this.addCards('x2', 1, true);
        this.addCards('∅', 1, true);
    }


    drawCard() {
        if (this.deck.length === 0) {
            return null;
        }
        const index = (Math.floor(Math.random() * this.deck.length));

        return this.deck.splice(index, 1)[0];
    }

    reshuffleDeck() {
        this.discardPile.forEach(card => {
            if (card.inthis.deck) {
                this.deck.push(card);
            }
        });
        this.discardPile = [];
    }

    addCard(value){
        this.deck.push(new Card(value, false, false));
    }

    addCards(value, amount, triggerShuffle = false){
        for (let index = 0; index < amount; index++) {
            this.deck.push(new Card(value, triggerShuffle, true));
        }
    }

    countBlesses(){
        return this.deck.concat(this.discardPile).filter(card => card.value === 'x2' && !card.inStartingDeck).length;
    }

    countCurses() {
        return this.deck.concat(this.discardPile).filter(card => card.value === '∅' && !card.inStartingDeck).length;
    }
}