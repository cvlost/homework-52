import React, {useRef, useState} from 'react';
import './App.css';
import './cards.css';
import CardView from "./components/CardView/CardView";
import Card from "./lib/Card";
import CardDeck from "./lib/CardDeck";
import PokerHand from "./lib/PokerHand";

function App() {
  const cardDeck = useRef(new CardDeck());
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const pokerHand = new PokerHand(cards);
  const pokerHandCombo = pokerHand.getOutcome();

  const getCards = () => {
    const cards = cardDeck.current.getCards(5);
    setCards(cards);
    setSelectedCards([]);
  };

  const selectCard = (index: number) => {
    const card = cards[index];
    const newState: Card[] = selectedCards.slice();

    if (selectedCards.indexOf(card) < 0) newState.push(card);
    else newState.splice(newState.indexOf(card), 1);

    setSelectedCards(newState);
  };

  const isCardSelected = (card: Card) => {
    return selectedCards.indexOf(card) >= 0;
  };

  const isReplaceAvailable = () => {
    return selectedCards.length === 0 || cardDeck.current.deck.length === 0;
  };

  const replaceCards = () => {
    if (selectedCards.length === 0) return;
    const newState = cards.slice();

    selectedCards.forEach(card => {
      const newCard = cardDeck.current.getCard();
      if (newCard) newState[newState.indexOf(card)] = newCard;
    });

    setSelectedCards([]);
    setCards(newState);

    console.log(selectedCards);
  };

  const isPartOfCombo = (card: Card) => {
    return pokerHand.comboCards.indexOf(card) >= 0;
  };

  const sortCards = () => {
    setCards(pokerHand.sortedCards);
  };

  const button = (<button onClick={getCards} disabled={(() => cardDeck.current.deck.length === 0)()}>
    Deal Cards
  </button>);

  if (cards.length === 0) return button;

  console.log(pokerHand.comboCards);

  return (
    <div className="App faceImages playingCards">
      {cards.map((card, i) =>
        <CardView
          key={i}
          suit={card.suit} rank={card.rank}
          index={i}
          isSelected={isCardSelected(card)}
          selectCard={selectCard}
          isPartOfCombo={isPartOfCombo(card)}
        />
      )}
      <div>Combination: {pokerHandCombo}</div>
      <button onClick={() => sortCards()}>Sort Cards</button>
      {button}
      <button disabled={isReplaceAvailable()} onClick={() => replaceCards()}>Replace Cards</button>
    </div>
  );
}

export default App;
