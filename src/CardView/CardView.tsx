import React from 'react';
import './CardView.css';

interface CardProps {
  suit: string;
  rank: string;
  isSelected: boolean;
  onCardSelect: React.ChangeEventHandler;
  isPartOfCombo: boolean;
}

type SuitMap = { [key: string]: string }

const suitMap: SuitMap = {
  diams: '♦',
  hearts: '♥',
  clubs: '♣',
  spades: '♠',
};

const CardView: React.FC<CardProps> = ({rank, suit, onCardSelect, isSelected, isPartOfCombo}) => {
  const cardClass = `card rank-${rank.toLowerCase()} ${suit} ${isPartOfCombo ? 'card-highlighted' : ''} ${isSelected ? 'card-selected' : ''}`;

  return (
    <div className="card-wrapper">
      <span className={cardClass}>
        <span className="rank">{rank}</span>
        <span className="suit">{suitMap[suit]}</span>
      </span>
      <div className="checkbox-wrapper">
        <label className="replace-label">
          <input
            className="replace-input"
            type="checkbox"
            checked={isSelected}
            onChange={onCardSelect}
          />
          <span>Replace</span>
        </label>
      </div>
    </div>
  );
};

export default CardView;