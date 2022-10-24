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

  const getCards = () => {
    const cards = cardDeck.current.getCards(5);
    setCards(cards);
  };

  const pokerHand = new PokerHand(cards);
  const button = <button onClick={getCards} disabled={(()=>cardDeck.current.deck.length === 0)()}>Cards</button>

  if (cards.length === 0) return button;

  return (
    <div className="App faceImages playingCards">
      {cards.map((card,i) =>
        <CardView
          key={i}
          suit={card.suit} rank={card.rank}
        />
      )}
      <div>Combination: {pokerHand.getOutcome()}</div>
      <div>{button}</div>
    </div>
  );
}

export default App;
