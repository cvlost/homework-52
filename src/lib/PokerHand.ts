import Card from "./Card";

type Value = {[key: string]: number};

const value: Value = {
  diams: 0,
  hearts: 1,
  clubs: 2,
  spades: 3,
  '2': 0,
  '3': 1,
  '4': 2,
  '5': 3,
  '6': 4,
  '7': 5,
  '8': 6,
  '9': 7,
  '10': 8,
  'J': 9,
  'Q': 10,
  'K': 11,
  'A': 12,
};

class PokerHand {
  constructor(public cards: Card[]) {
  }

  static sortCards(cards: Card[]) {
    cards.sort((a, b) => value[a.rank] - value[b.rank]);
    cards.sort((a, b) => {
      if (value[a.rank] !== value[b.rank] || value[a.suit] === value[b.suit]) return 0;
      if (value[a.suit] > value[b.suit]) return 1;
      return -1;
    });
  }

  isRoyalFlush(cards: Card[]) {
    if (
      this.isFlush(cards) &&
      this.isStraight(cards) &&
      cards[0].rank === '10'
    ) return 'Royal Flush';

    return false;
  }

  isStraightFlush(cards: Card[]) {
    const suit = cards[0].suit;
    if (
      cards.every((card) => card.suit === suit) &&
      this.isStraight(cards)
    ) return 'Straight Flush';

    return false;
  }

  isFourOfaKind(cards: Card[]) {
    if (this.isThreeOfaKind(cards) &&
      (cards[0].rank === cards[3].rank ||
        cards[4].rank === cards[1].rank)
    ) return 'Four Of a Kind';

    return false;
  }

  isFullHouse(cards: Card[]) {
    const assumption1 = {
      three: cards.slice(0, 3),
      pair: cards.slice(3),
    };

    const assumption2 = {
      three: cards.slice(2),
      pair: cards.slice(0, 2),
    };

    if (
      (this.isThreeOfaKind(assumption1.three) && this.isOnePair(assumption1.pair)) ||
      (this.isThreeOfaKind(assumption2.three) && this.isOnePair(assumption2.pair))
    ) return 'Full House';

    return false;
  }

  isFlush(cards: Card[]) {
    const suit = cards[0].suit;
    if (cards.every((card) => card.suit === suit)) return 'Flush';
    return false;
  }

  isStraight(cards: Card[]) {
    if (cards[4].rank === 'A') {
      if (
        (cards[3].rank === 'K' && cards[2].rank === 'Q' && cards[1].rank === 'J' && cards[0].rank === '10') ||
        (cards[3].rank === '5' && cards[2].rank === '4' && cards[1].rank === '3' && cards[0].rank === '2')
      ) return 'Straight';

    } else if (
      value[cards[0].rank] + 1 === value[cards[1].rank] && value[cards[1].rank] + 1 === value[cards[2].rank] &&
      value[cards[2].rank] + 1 === value[cards[3].rank] && value[cards[3].rank] + 1 === value[cards[4].rank]
    ) return 'Straight';

    return false;
  }

  isThreeOfaKind(cards: Card[]) {
    for (let i = 0; i < cards.length - 2; i++) {
      if (cards[i].rank === cards[i + 1].rank && cards[i].rank === cards[i + 2].rank) {
        return 'Three Of a Kind';
      }
    }
    return false;
  }

  isTwoPairs(cards: Card[]) {
    for (let i = 0; i < cards.length - 1; i++) {
      if (cards[i].rank === cards[i + 1].rank) {
        if (i === 3) return false;

        for (let j = i + 2; j < cards.length - 1; j++) {
          if (cards[j].rank === cards[j + 1].rank) {
            return 'Two Pairs';
          }
        }
      }
    }
    return false;
  }

  isOnePair(cards: Card[]) {
    for (let i = 0; i < cards.length - 1; i++) {
      if (cards[i].rank === cards[i + 1].rank) {
        return 'One Pair';
      }
    }
    return false;
  }

  getOutcome() {
    if (this.cards.length === 2) {
      const pairCombo = this.isOnePair(this.cards);
      return pairCombo ? pairCombo : 'No combination found';
    }

    PokerHand.sortCards(this.cards);

    const combo =
      this.isRoyalFlush(this.cards) ||
      this.isStraightFlush(this.cards) ||
      this.isFourOfaKind(this.cards) ||
      this.isFullHouse(this.cards) ||
      this.isFlush(this.cards) ||
      this.isStraight(this.cards) ||
      this.isThreeOfaKind(this.cards) ||
      this.isTwoPairs(this.cards) ||
      this.isOnePair(this.cards);

    if (combo) return combo;
    return 'No combination found';
  }
}

export default PokerHand;