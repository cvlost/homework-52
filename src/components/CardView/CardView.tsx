import React from 'react';

interface CardProps {
  suit: string;
  rank: string;
}

type SuitMap = { [key: string]: string }

const suitMap: SuitMap = {
  diams: '♦',
  hearts: '♥',
  clubs: '♣',
  spades: '♠',
};

const CardView: React.FC<CardProps> = ({rank, suit}) => {
  const cardClass = `card rank-${rank.toLowerCase()} ${suit}`;

  return (
    <span className={cardClass}>
      <span className="rank">{rank}</span>
      <span className="suit">{suitMap[suit]}</span>
    </span>
  );
};

export default CardView;