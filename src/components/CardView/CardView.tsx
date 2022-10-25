import React from 'react';
import './CardView.css';
import Checkbox from "../Checkbox/Checkbox";

type SelectCard = (index: number) => void;

interface CardProps {
  suit: string;
  rank: string;
  isSelected: boolean;
  selectCard: SelectCard;
  index: number;
  isPartOfCombo: boolean;
}

type SuitMap = { [key: string]: string }

const suitMap: SuitMap = {
  diams: '♦',
  hearts: '♥',
  clubs: '♣',
  spades: '♠',
};

const CardView: React.FC<CardProps> = ({rank, suit, index, selectCard, isSelected, isPartOfCombo}) => {
  const cardClass = `card rank-${rank.toLowerCase()} ${suit} ${isPartOfCombo ? 'card-highlighted' : ''} ${isSelected ? 'card-selected' : ''}`;

  return (
    <div className="card-wrapper">
      <span className={cardClass} onClick={() => selectCard(index)}>
        <span className="rank">{rank}</span>
        <span className="suit">{suitMap[suit]}</span>
      </span>
      <div className="checkbox-wrapper">
        <Checkbox isChecked={isSelected} changeCheckbox={selectCard} index={index}/>
      </div>
    </div>
  );
};

export default CardView;