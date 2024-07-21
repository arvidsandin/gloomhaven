export default class Card {
    constructor(value, triggerShuffle = false, inStartingDeck = false) {
        this.value = value;
        this.triggerShuffle = triggerShuffle;
        this.inStartingDeck = inStartingDeck;
    }
}