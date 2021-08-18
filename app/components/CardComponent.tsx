import React from 'react';
import { ActionCard } from "../game/ActionCard";
import { Card } from "../game/Card";
import { ColoredActionCard } from "../game/ColoredActionCard";
import { NumberCard } from "../game/NumberCard";
import { StyleSheet } from 'react-native';
import { ActionCardType } from '../game/ActionCardType';

interface CardProps {
    card: Card
    handleCardClick?: any
}

export const CardComponent = ({ card, handleCardClick } : CardProps) => {
    let cardValue;
    if(card instanceof NumberCard) {
        cardValue = card.value + " " + card.color;
    } else if(card instanceof ColoredActionCard) {
        cardValue = ActionCardType[card.type] + " " + card.color;
    } else if(card instanceof ActionCard) {
        cardValue = ActionCardType[card.type];
    }
    return (
        <div onClick={() => handleCardClick && handleCardClick(card)} style={{borderRadius: '20px', border: '1px solid black', padding: '10px'}}>
            { cardValue }
        </div>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20
    }
});