import React, {useRef, useState} from 'react';
import './cards.css';
import './App.css';
import CardView from "./CardView/CardView";
import Card from "./lib/Card";
import CardDeck from "./lib/CardDeck";
import PokerHand from "./lib/PokerHand";

function App() {
  const cardDeck = useRef<CardDeck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const pokerHand = new PokerHand(cards);
  const pokerHandCombo = pokerHand.getOutcome();

  const getCards = () => {
    cardDeck.current = new CardDeck();
    const cards = cardDeck.current.getCards(5);
    setCards(cards);
    setSelectedCards([]);
  };

  const onCardSelect = (index: number) => {
    const card = cards[index];
    const newState: Card[] = selectedCards.slice();

    if (!selectedCards.includes(card)) newState.push(card);
    else newState.splice(newState.indexOf(card), 1);

    setSelectedCards(newState);
  };

  const isCardSelected = (card: Card) => {
    return selectedCards.includes(card);
  };

  const isReplaceAvailable = () => {
    return selectedCards.length === 0 || cardDeck.current!.deck.length === 0;
  };

  const replaceCards = () => {
    if (selectedCards.length === 0) return;
    const newState = cards.slice();

    selectedCards.forEach(card => {
      const newCard = cardDeck.current!.getCard();
      if (newCard) newState[newState.indexOf(card)] = newCard;
    });

    setSelectedCards([]);
    setCards(newState);
  };

  const isPartOfCombo = (card: Card) => {
    return pokerHand.comboCards.includes(card);
  };

  const sortCards = () => {
    setCards(pokerHand.sortedCards);
  };

  const button = (
    <button
      className="btn"
      onClick={getCards}
    >
      Deal Cards
    </button>);

  if (cards.length === 0) return <div className="App">{button}</div>;

  return (
    <div className="App faceImages playingCards">
      <div className="cards-container">
        {cards.map((card, i) =>
          <CardView
            key={i}
            suit={card.suit} rank={card.rank}
            isSelected={isCardSelected(card)}
            onCardSelect={() => {
              onCardSelect(i)
            }}
            isPartOfCombo={isPartOfCombo(card)}
          />
        )}
      </div>
      <div className="info">
        <div className="info-deck">
          Cards in the deck: <span>{cardDeck.current!.deck.length}</span> left
        </div>
        <div className="info-combo">
          Combination: <span>{pokerHandCombo}</span>
        </div>
      </div>
      <div className="controls">
        <button className="btn" onClick={() => sortCards()}>Sort Cards</button>
        {button}
        <button className="btn" disabled={isReplaceAvailable()} onClick={() => replaceCards()}>Replace Cards</button>
      </div>
    </div>
  );
}

export default App;
