import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { CardComponent } from './app/components/CardComponent';
import { GameFactory } from './app/game/GameFactory';
import { OtherCards } from './app/game/OtherCards';
import { Card } from './app/game/Card';
import { useEffect } from 'react';
import { Game } from './app/game/Game';
import { Player } from './app/game/Player';

export default function App() {
  const [cards, updateCards] = useState([] as Card[]);
  const [lastCard, updateLastCard] = useState({} as Card);
  const [game, updateGame] = useState({} as Game);
  const [otherPlayers, updateOtherPlayers] = useState([] as Player[]);
  
  useEffect(() => {
    const game = GameFactory.createGame();
    updateGame(game);
    updateCards(game.getMyCards());
    updateLastCard(game.getLastDiscardedCard());
    updateOtherPlayers(game.getOtherPlayers());
  }, []);

  const handleCardClick = (card: Card) => {
    game.addMove(card, {});
    updateCards(game.getMyCards());
    updateLastCard(game.getLastDiscardedCard());
    updateOtherPlayers(game.getOtherPlayers());
  };

  const takeCard = () => {
    game.addMove(null, {});
    updateCards(game.getMyCards());
  }

  const cardComponents = cards.map((card, index) => (
    <CardComponent handleCardClick={handleCardClick} key={index} card={card} />
  ));

  const playersComponents = otherPlayers.map((player, index) => (
    <div key={index}>
      <p>{player.name}</p>
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {
          player.cards.map((card, indexCard) => (
            <CardComponent handleCardClick={handleCardClick} key={indexCard} card={card} />
          ))
        }
      </div>
    </div>
  ));

  return (
    <View style={styles.container}>
      <div>
        { playersComponents }
      </div>
      <br />
      <div onClick={() => takeCard()} style={{border: '1px solid black', padding: '10px', display: 'flex', flexFlow: 'row wrap'}}>
        Take card
      </div>
      <br />
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        Last: <CardComponent card={lastCard} />
      </div>
      <br />
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        { cardComponents }
      </div>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
