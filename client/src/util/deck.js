const deck = [
  ["spades", 2, "2 of spades"],
  ["spades", 3, "3 of spades"],
  ["spades", 4, "4 of spades"],
  ["spades", 5, "5 of spades"],
  ["spades", 6, "6 of spades"],
  ["spades", 7, "7 of spades"],
  ["spades", 8, "8 of spades"],
  ["spades", 9, "9 of spades"],
  ["spades", 10, "10 of spades"],
  ["spades", 10, "Jack of spades"],
  ["spades", 10, "Queen of spades"],
  ["spades", 10, "King of spades"],
  ["spades", 11, "Ace of spades"],
  ["diamonds", 2, "2 of diamond"],
  ["diamonds", 3, "3 of diamond"],
  ["diamonds", 4, "4 of diamond"],
  ["diamonds", 5, "5 of diamond"],
  ["diamonds", 6, "6 of diamond"],
  ["diamonds", 7, "7 of diamond"],
  ["diamonds", 8, "8 of diamond"],
  ["diamonds", 9, "9 of diamond"],
  ["diamonds", 10, "10 of diamond"],
  ["diamonds", 10, "Jack of diamond"],
  ["diamonds", 10, "Queen of diamond"],
  ["diamonds", 10, "King of diamond"],
  ["diamonds", 11, "Ace of diamond"],
  ["hearts", 2, "2 of hearts"],
  ["hearts", 3, "3 of hearts"],
  ["hearts", 4, "4 of hearts"],
  ["hearts", 5, "5 of hearts"],
  ["hearts", 6, "6 of hearts"],
  ["hearts", 7, "7 of hearts"],
  ["hearts", 8, "8 of hearts"],
  ["hearts", 9, "9 of hearts"],
  ["hearts", 10, "10 of hearts"],
  ["hearts", 10, "Jack of hearts"],
  ["hearts", 10, "Queen of hearts"],
  ["hearts", 10, "King of hearts"],
  ["hearts", 11, "Ace of hearts"],
  ["clubs", 2, "2 of clubs"],
  ["clubs", 3, "3 of clubs"],
  ["clubs", 4, "4 of clubs"],
  ["clubs", 5, "5 of clubs"],
  ["clubs", 6, "6 of clubs"],
  ["clubs", 7, "7 of clubs"],
  ["clubs", 8, "8 of clubs"],
  ["clubs", 9, "9 of clubs"],
  ["clubs", 10, "10 of clubs"],
  ["clubs", 10, "Jack of clubs"],
  ["clubs", 10, "Queen of clubs"],
  ["clubs", 10, "King of clubs"],
  ["clubs", 11, "Ace of clubs"],
];

class Deck {
  constructor() {
    this.deck = deck;
    this.currentDeck = [...deck];
  }

  shuffle() {
    let currentIndex = this.currentDeck.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.currentDeck[currentIndex];
      this.currentDeck[currentIndex] = this.currentDeck[randomIndex];
      this.currentDeck[randomIndex] = temporaryValue;
    }
    return this.currentDeck;
  }
  deal() {
    return this.currentDeck.pop();
  }
  reset() {
    this.currentDeck = [...this.deck];
  }
  len() {
    return this.currentDeck.length;
  }
}

export default Deck;
