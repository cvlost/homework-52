import Card from "./Card";

class CardDeck {
  constructor(public deck: Card[] = []) {
    const suits = ['diams', 'hearts', 'clubs', 'spades'];
    const ranks = [
      '2', '3', '4', '5', '6', '7', '8',
      '9', '10', 'J', 'Q', 'K', 'A',
    ];

    suits.forEach(suit => {
      ranks.forEach(rank => {
        this.deck.push(new Card(suit, rank));
      });
    });
  }

  getCard() {
    if (this.deck.length === 0) return null;
    const randIndex = Math.floor(Math.random() * this.deck.length);
    return this.deck.splice(randIndex, 1)[0];
  }

  getCards(cardNumber: number) {
    if (cardNumber > this.deck.length) cardNumber = this.deck.length;
    const cards: Card[] = [];
    for (let i = 0; i < cardNumber; i++) {
      const card = this.getCard();
      if (card) cards.push(card);
    }
    return cards;
  }
}

export default CardDeck;