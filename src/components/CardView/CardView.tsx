import React from 'react';
import {findAllByDisplayValue} from "@testing-library/react";
import Checkbox from "../Checkbox/Checkbox";

type SelectCard = (index: number) => void;

interface CardProps {
  suit: string;
  rank: string;
  isSelected: boolean;
  selectCard: SelectCard;
  index: number;
}

type SuitMap = { [key: string]: string }

const suitMap: SuitMap = {
  diams: '♦',
  hearts: '♥',
  clubs: '♣',
  spades: '♠',
};

const CardView: React.FC<CardProps> = ({rank, suit, index, selectCard, isSelected}) => {
  const cardClass = `card rank-${rank.toLowerCase()} ${suit}`;

  return (
    <div className="card-container">
      <span className={cardClass}>
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