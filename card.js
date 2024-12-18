export default class Card {
    constructor(value, imgSrc, triggerShuffle = false, inStartingDeck = false) {
        this.value = value;
        this.imgSrc = imgSrc;
        this.triggerShuffle = triggerShuffle;
        this.inStartingDeck = inStartingDeck;
    }
}