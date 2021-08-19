import React from 'react';
import { Card } from "../game/Card";
import { Image, StyleSheet } from 'react-native';

interface CardProps {
    card?: Card
    back?: boolean
    handleCardClick?: any
    bigger?: boolean,
    small?: boolean,
    last?: boolean
}

const imageWrapperStyle = {
    overflow: 'hidden'
}

export const CardComponent = ({ card, small, bigger, back, last, handleCardClick } : CardProps) => {
    const cardImage = back || !card ? 
        require('../images/cards/back.png') :
        require('../images/cards/' + card?.image);
        
    const cardImageStyle = small ? styles.cardImageSmall : bigger ? styles.cardImageBig : styles.cardImage;
    return (
        <div style={!last ? imageWrapperStyle : {}} onClick={() => handleCardClick && handleCardClick(card)}>
            <Image style={cardImageStyle} source={cardImage} />
        </div>
    );
}

const styles = StyleSheet.create({
    cardImageSmall: {
        width: 30,
        height: 45
    },
    cardImage: {
        width: 50,
        height: 75
    },
    cardImageBig: {
        width: 60,
        height: 90
    }
});
