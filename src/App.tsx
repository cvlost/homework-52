import React, {useRef, useState} from 'react';
import './App.css';
import './cards.css';
import CardView from "./components/CardView/CardView";
import Card from "./lib/Card";
import CardDeck from "./lib/CardDeck";

function App() {
  const cardDeck = useRef(new CardDeck());
  const [cards, setCards] = useState<Card[]>([]);

  const getCards = () => {
    const cards = cardDeck.current.getCards(5);
    setCards(cards);
  };

  const button = <button onClick={getCards}>Cards</button>

  if (cards.length === 0) return button;

  return (
    <div className="App faceImages playingCards">
      {cards.map((card,i) =>
        <CardView
          key={i}
          suit={card.suit} rank={card.rank}
        />
      )}
      <div>{button}</div>
    </div>
  );
}

export default App;
