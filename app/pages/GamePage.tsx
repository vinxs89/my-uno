import React, { useState, useEffect } from 'react';
import { CardComponent } from '../components/CardComponent';
import { GameFactory } from '../game/GameFactory';
import { Card } from '../game/Card';
import { Game } from '../game/Game';
import { Player } from '../game/Player';
import { GameRouteProp, GameNavigationProp } from '../RouteProps';
import io from 'socket.io-client';
import { CardUtils } from '../game/CardUtils';

type Props = {
    route: GameRouteProp;
    navigation: GameNavigationProp;
};

const deck = CardUtils.createDeck();

export const GamePage = ( {route, navigation}: Props ) => {
    const [cards, updateCards] = useState([] as Card[]);
    const [lastCard, updateLastCard] = useState(undefined as unknown as Card);
    const [game, updateGame] = useState(undefined as unknown as Game);
    const [otherPlayers, updateOtherPlayers] = useState([] as Player[]);
    const [gameStarted, updateGameStarted] = useState(false);
    const [socket, setSocket]: [any, any] = useState(null);

    
    useEffect(() => {
      const newSocket = io("http://localhost:3005", { transports: ["websocket"] });
      setSocket(newSocket);

      newSocket.io.on("reconnect_attempt", () => {
        console.log("reconnect_attemp");
      });
      
      newSocket.io.on("reconnect", () => {
        console.log("reconnect");
      });

      newSocket.io.on("error", (e) => {
        console.log(e);
      });

      newSocket.io.on("reconnect_error", (e) => {
        console.log(e);
      });

      newSocket.io.on("reconnect_failed", () => {
        console.log("failed reconnect");
      });

      newSocket.on('create-game', (playersIds: string[], cardIds: string[]) => {
        const cards = cardIds.map(id => deck.find(card => id === card.id) as Card);
        const players = playersIds.map(id => new Player(id));
        const game = GameFactory.createGame(players, cards)
        updateGame(game);
        updateCards(game.getMyCards());
        updateLastCard(game.getLastDiscardedCard());
        updateOtherPlayers(game.getOtherPlayers());
        updateGameStarted(true);

        
        newSocket.on('new-move', (cardId: string) => {
          game.addMove(deck.find(card => card.id === cardId) as Card, {});
          updateCards(game.getMyCards());
          updateLastCard(game.getLastDiscardedCard());
          updateOtherPlayers(game.getOtherPlayers());
        });
      });

      return () => {
        newSocket.off('new-move');
        newSocket.off('create-game');
        newSocket.close();
      }
    }, []);

    const handleCardClick = (card: Card) => {
      socket.emit('new-move', card);
    };
  
    const takeCard = () => {
      socket.emit('new-move', null);
    }
  
    const cardComponents = cards?.map((card, index) => (
      <CardComponent handleCardClick={handleCardClick} key={index} card={card} />
    ));
  
    const startGame = () => {
      socket.emit('start-game');
    };

    const playersComponents = otherPlayers?.map((player, index) => (
      <div key={index}>
        <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {player.name}: 
          {
            player.cards?.map((card, indexCard) => (
              <CardComponent handleCardClick={handleCardClick} key={indexCard} card={card} small={true} back={false} />
            ))
          }
        </div>
      </div>
    ));

    return (
        <div style={styles.table}>
            <div style={styles.otherPlayers}>
                { playersComponents }
            </div>

            <div style={styles.centerTable}>
              <CardComponent back={true} handleCardClick={() => takeCard()} bigger={true} />
              <CardComponent card={lastCard} bigger={true} />
            </div>

            <div style={styles.ownCards}>
              <div style={styles.cardGroup}>
                  { cardComponents }
              </div>
            </div>

            {
              !gameStarted && <div onClick={() => startGame()}>Start Game</div>
            }
            
        </div>
    )
}

const styles = {
  table: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    height: '100%'
  },
  otherPlayers: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignContent: 'center'
  },
  centerTable: {
    display: 'flex',
    justifyContent: 'center',
  },
  ownCards: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  cardGroup: {
    display: 'flex',
    alignContent: 'center',
    maxWidth: '90%'
  }
}