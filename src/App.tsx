import React from 'react';
import './App.css';
import './cards.css';
import CardView from "./components/CardView/CardView";

function App() {
  return (
    <div className="App faceImages playingCards">
      <CardView suit={'clubs'} rank={'A'} />
    </div>
  );
}

export default App;
