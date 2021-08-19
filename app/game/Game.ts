import { ActionCard } from "./ActionCard";
import { ActionCardType } from "./ActionCardType";
import { Card } from "./Card";
import { CardUtils } from "./CardUtils";
import { Color } from "./Color";
import { MoveActionType } from "./MoveActionType";
import { MoveResult } from "./MoveResult";
import { MoveUtils } from "./MoveUtils";
import { Player } from "./Player";

export class Game {

    private players: Player[] = [];
    private ahead: boolean = true;
    private currentPlayer: number = -1;
    private discardDeck: Card[] = [];
    private cardDeck: Card[] = [];
    private gamePlayerId: string = '';
    private currentColor?: Color;
    private currentNumber?: number;
    private currentType?: ActionCardType;

    start(players: Player[], originalCards: Card[], gamePlayerId: string) {
        this.players = players;
        this.gamePlayerId = gamePlayerId;

        const cards = originalCards.slice();

        for ( let i=0; i<7; i++ ) {
            for ( let player of players ) {
                player.receiveCard(cards.shift() as Card);
            }
        }

        this.discardDeck.push(cards.shift() as Card);
        this.cardDeck = cards;

        const {color, number, type } = this.getCardValues(this.getLastDiscardedCard());

        this.currentColor = color;
        this.currentNumber = number;
        this.currentType = type;
    }

    public addMove(card?: Card, optionals?: any): MoveResult {
        const player = this.players[this.currentPlayer];

        if (!card) {
            player.receiveCard(this.cardDeck.shift() as Card);
            this.nextPlayer();
            return new MoveResult(player, player, [MoveActionType.TAKE_CARD]);
        }
        if(!this.isValidMove(card)) {
            return new MoveResult(player, player, [MoveActionType.NOT_VALID_MOVE]);
        }
        
        player.discardCard(card);
        this.discardDeck.push(card);

        if(player.cards.length === 0) {
            return new MoveResult(player, player, [MoveActionType.WIN]);
        }

        const actions: MoveActionType[] = [MoveActionType.VALID_MOVE];
        if (CardUtils.isNumberedCard(card)) {
            this.nextPlayer();
            const { color, number } = this.getCardValues(card);
            this.currentColor = color;
            this.currentNumber = number;  
        } else if (card instanceof ActionCard) { 
            if (card.type === ActionCardType.SWITCH_COLOR) {
                this.nextPlayer();
                const { number, type } = this.getCardValues(card);
                this.currentNumber = number;
                this.currentColor = optionals.color;
                this.currentType = type;
                actions.push(MoveActionType.SWITCH_COLOR);
            } else if (card.type === ActionCardType.ROTATE) {
                const { color, number, type } = this.getCardValues(card);
                this.currentColor = color;
                this.currentNumber = number; 
                this.currentType = type; 
                this.ahead = !this.ahead;
                this.rotatePlayer();
                actions.push(MoveActionType.CHANGE_DIRECTION);
            } else if (card.type === ActionCardType.STOP) {
                const { color, number, type } = this.getCardValues(card);
                this.currentColor = color;
                this.currentNumber = number;  
                this.currentType = type;
                this.skipPlayer();
                actions.push(MoveActionType.STOP);
            } else if (card.type === ActionCardType.MORE4) {
                const { number, type } = this.getCardValues(card);
                this.currentNumber = number;  
                this.currentColor = optionals.color;
                this.currentType = type;
                this.nextPlayer();
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                actions.push(MoveActionType.ADD_4_CARDS);
            } else if (card.type === ActionCardType.MORE2) {
                const { color, number, type } = this.getCardValues(card);
                this.currentColor = color;
                this.currentNumber = number;  
                this.currentType = type;
                this.nextPlayer();
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                actions.push(MoveActionType.ADD_2_CARDS);
            }
        }

        return new MoveResult(player, this.players[this.currentPlayer], actions);
    }

    isValidMove(card: Card): boolean {
        return MoveUtils.isValidMove(card, this.currentColor, this.currentNumber, this.currentType);
    }
  
    setFirstPlayer(playerId: string) {
        this.currentPlayer = this.players.map(p => p.id).indexOf(playerId);
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }
  
    public getOtherPlayers(): Player[] {
        return this.players.filter((p) => p.id !== this.gamePlayerId);
    }

    public getLastDiscardedCard(): Card {
        return this.discardDeck[this.discardDeck.length - 1];
    }

    public getMyCards(): Card[] {
        return (this.players.find(p => p.id === this.gamePlayerId) as Player).cards;
    }

    private nextPlayer() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    }

    private rotatePlayer() {
        this.currentPlayer = (this.currentPlayer + this.players.length - 1) % this.players.length;
    }

    private skipPlayer() {
        this.currentPlayer = (this.currentPlayer + 2) % this.players.length;
    }

    private getCardValues(card: Card): any {
        return {
            color: CardUtils.getCardColor(card),
            number: CardUtils.getCardNumber(card),
            type: CardUtils.getCardType(card),
        };
    }
}

