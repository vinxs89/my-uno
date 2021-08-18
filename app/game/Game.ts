import { ActionCard } from "./ActionCard";
import { ActionCardType } from "./ActionCardType";
import { Card } from "./Card";
import { CardUtils } from "./CardUtils";
import { Color } from "./Color";
import { MoveActionType } from "./MoveActionType";
import { MoveResult } from "./MoveResult";
import { MoveUtils } from "./MoveUtils";
import { OtherCards } from "./OtherCards";
import { Player } from "./Player";

export class Game {

    private players: Player[] = [];
    private ahead: boolean = true;
    private currentPlayer: number;
    private discardDeck: Card[] = [];
    private cardDeck: Card[] = [];
    private gamePlayer: number;

    private currentColor: Color;
    private currentNumber?: number;

    constructor(players: Player[], originalCards: Card[], firstPlayer: number, gamePlayer: number) {
        this.players = players;
        this.currentPlayer = firstPlayer;
        this.gamePlayer = gamePlayer;

        const cards = originalCards.slice();

        for ( let i=0; i<7; i++ ) {
            for ( let player of players ) {
                player.receiveCard(cards.shift() as Card);
            }
        }

        this.discardDeck.push(cards.shift() as Card);
        this.cardDeck = cards;

        const {color, number, nextPlayer} = this.getCardValues(this.discardDeck[0]);
        this.currentColor = color;
        this.currentNumber = number;
    }

    public addMove(card: Card | null, optionals: any): MoveResult {
        console.log(card);

        const player = this.players[this.currentPlayer];

        if (card === null) {
            console.log("take card");
            player.receiveCard(this.cardDeck.shift() as Card);
            this.nextPlayer();
            return new MoveResult(player, player, [MoveActionType.TAKE_CARD]);
        }
        if (!MoveUtils.isValidMove(card, this.currentColor, this.currentNumber)) {
            console.log("not valid");
            return new MoveResult(player, player, [MoveActionType.NOT_VALID_MOVE]);
        }

        player.discardCard(card);
        this.discardDeck.push(card);

        const actions: MoveActionType[] = [MoveActionType.VALID_MOVE];
        if (CardUtils.isNumberedCard(card)) {
            this.nextPlayer();
            const { color, number } = this.getCardValues(card);
            this.currentColor = color;
            this.currentNumber = number;  
        } else if (card instanceof ActionCard) { 
            if (card.type === ActionCardType.SWITCH_COLOR) {
                this.nextPlayer();
                const { color, number } = this.getCardValues(card);
                this.currentNumber = number;  
                this.currentColor = optionals.color;
                actions.push(MoveActionType.SWITCH_COLOR);
            } else if (card.type === ActionCardType.ROTATE) {
                const { color, number } = this.getCardValues(card);
                this.currentColor = color;
                this.currentNumber = number;  
                this.ahead = !this.ahead;
                this.rotatePlayer();
                actions.push(MoveActionType.CHANGE_DIRECTION);
            } else if (card.type === ActionCardType.STOP) {
                const { color, number } = this.getCardValues(card);
                this.currentColor = color;
                this.currentNumber = number;  
                this.skipPlayer();
                actions.push(MoveActionType.STOP);
            } else if (card.type === ActionCardType.MORE4) {
                const { color, number } = this.getCardValues(card);
                this.currentNumber = number;  
                this.currentColor = optionals.color;
                this.nextPlayer();
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                actions.push(MoveActionType.ADD_4_CARDS);
            } else if (card.type === ActionCardType.MORE2) {
                const { color, number } = this.getCardValues(card);
                this.currentColor = color;
                this.currentNumber = number;  
                this.nextPlayer();
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                this.players[this.currentPlayer].receiveCard(this.cardDeck.shift() as Card);
                actions.push(MoveActionType.ADD_2_CARDS);
            }
        }

        return new MoveResult(player, this.players[this.currentPlayer], actions);
    }
    
    getOtherPlayers(): Player[] {
        return this.players.filter((p, i) => i !== this.gamePlayer);
    }

    public getLastDiscardedCard(): Card {
        return this.discardDeck[this.discardDeck.length - 1];
    }

    public getMyCards(): Card[] {
        return this.players[this.gamePlayer].cards;
    }

    private nextPlayer() {
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        console.log("Next player: " + this.players[this.currentPlayer].name);
    }

    private rotatePlayer() {
        this.currentPlayer = (this.currentPlayer - 1) % this.players.length;
        console.log("Next player: " + this.players[this.currentPlayer].name);
    }

    private skipPlayer() {
        this.currentPlayer = (this.currentPlayer + 2) % this.players.length;
        console.log("Next player: " + this.players[this.currentPlayer].name);
    }

    private getCardValues(card: Card): any {
        return {
            color: CardUtils.getCardColor(card),
            number: CardUtils.getCardNumber(card),
        };
    }
}

