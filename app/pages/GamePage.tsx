import React, { useState, useEffect } from 'react';
import { CardComponent } from '../components/CardComponent';
import { useToast } from "react-native-toast-notifications";
import { Card } from '../game/Card';
import { Game } from '../game/Game';
import { Player } from '../game/Player';
import { GameRouteProp, GameNavigationProp } from '../RouteProps';
import { CardUtils } from '../game/CardUtils';
import { ActionCard } from '../game/ActionCard';
import { ColoredActionCard } from '../game/ColoredActionCard';
import { Color } from '../game/Color';
import { MoveActionType } from '../game/MoveActionType';

type Props = {
    route: GameRouteProp;
    navigation: GameNavigationProp;
};

const deck = CardUtils.createDeck();

type ServerPlayer = {
  id: string;
  name: string;
}

const game = new Game();

export const GamePage = ( {route, navigation}: Props ) => {
    const toast = useToast();

    const [temporaryCard, updateTemporaryCard] = useState(null as unknown as Card | null);
    const [cards, updateCards] = useState([] as Card[]);
    const [lastCard, updateLastCard] = useState(undefined as unknown as Card);
    const [otherPlayers, updateOtherPlayers] = useState([] as Player[]);
    const [currentPlayerId, updateCurrentPlayerId] = useState(null as unknown as string);
    const [showSelectColorModal, updateShowSelectColorModal] = useState(false);
    const [matchActive, updateMatchActive] = useState(false);

    const { playerId, roomCode, socket } = route.params;

    const nextPlayer = (player: ServerPlayer) => {
      if(playerId === player.id) {
        toast.show('Now it\'s your turn', {duration: 1000});
      } else {
        toast.show('Now it\'s the turn of ' + player.name, {duration: 1000});
      }
      updateCurrentPlayerId(player.id);
    }

    useEffect(() => {
      socket.on('create-game', (serverPlayers: ServerPlayer[], cardIds: string[]) => {
        const cards = cardIds.map(id => deck.find(card => id === card.id) as Card);
        const players = serverPlayers.map(player => new Player(player.id, player.name));

        game.start(players, cards, playerId);

        updateCards(game.getMyCards());
        updateLastCard(game.getLastDiscardedCard());
        updateOtherPlayers(game.getOtherPlayers());
      });

      socket.on('new-move', (cardId: string, color: string) => {
        const moveResult = game.addMove(deck.find(card => card.id === cardId) as Card, { color });
        updateCards(game.getMyCards());
        updateLastCard(game.getLastDiscardedCard());
        updateOtherPlayers(game.getOtherPlayers());
        
        const player = game.getCurrentPlayer();

        if (moveResult.actions.indexOf(MoveActionType.WIN) >= 0) {
          if(playerId === player.id) {
            toast.show('You Win!!!', {duration: 3000});
          } else {
            toast.show(player.name + ' WIN this match!', {duration: 3000});
          }

          updateMatchActive(false);
        }

        if (color) {
          toast.show("Next color will be: " + color, {duration: 3000});
        }

        nextPlayer(player)
      });

      socket.on('set-first-player', (player: ServerPlayer) => {
        game.setFirstPlayer(player.id);
        nextPlayer(player);
      });

      socket.emit('game-ready', roomCode, playerId);

      return () => {
        socket.off('new-move');
        socket.off('create-game');
      }
    }, []);

    const handleCardClick = (card: Card) => {
      if ( playerId !== currentPlayerId ) {
        toast.show('Not now', {duration: 1000});
      } else {
        if(!game.isValidMove(card)) {
          toast.show('Not a valid move', {duration: 1000});
          return;
        }
        if (card instanceof ActionCard && !(card instanceof ColoredActionCard)) {
          updateShowSelectColorModal(true);
          updateTemporaryCard(card);
        } else {
          socket.emit('new-move', roomCode, card.id);
        }
      }
    };
  
    const selectedColorFromModal = (color: Color, card: Card) => {
      updateShowSelectColorModal(false);
      updateTemporaryCard(null);
      socket.emit('new-move', roomCode, card.id, Color[color]);
    }

    const takeCard = () => {
      if ( playerId !== currentPlayerId ) {
        toast.show('Not now', {duration: 1000});
      } else {
        socket.emit('new-move', roomCode, null);
      }
    }
  
    const cardComponents = cards?.map(card => (
      <CardComponent handleCardClick={handleCardClick} key={card.id} card={card} />
    ));

    const playersComponents = otherPlayers?.map(player => (
      <div key={player.id}>
        <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {player.name}: 
          {
            player.cards?.map(card => (
              <CardComponent key={card.id} card={card} small={true} back={true} />
            ))
          }
        </div>
      </div>
    ));

    const selectColorModal = (
      <div>
        <div onClick={() => selectedColorFromModal(Color.BLUE, temporaryCard as Card)}>Blue</div>
        <div onClick={() => selectedColorFromModal(Color.RED, temporaryCard as Card)}>Red</div>
        <div onClick={() => selectedColorFromModal(Color.YELLOW, temporaryCard as Card)}>Yellow</div>
        <div onClick={() => selectedColorFromModal(Color.GREEN, temporaryCard as Card)}>Green</div>
      </div>
    );

    return (
        <div style={styles.table}>
            <div style={styles.otherPlayers}>
                { playersComponents }
            </div>

            <div style={styles.centerTable}>
              <CardComponent back={true} handleCardClick={() => takeCard()} bigger={true} />
              <CardComponent card={lastCard} bigger={true} />
            </div>

            { showSelectColorModal ? selectColorModal : '' }

            <div style={styles.ownCards}>
              <div style={styles.cardGroup}>
                  { cardComponents }
              </div>
            </div>
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