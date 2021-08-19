import { Card } from "./Card";
import { CardUtils } from "./CardUtils";
import { Game } from "./Game";
import { Player } from "./Player";

export class GameFactory {

    public static createGame(players?: Player[], cards?: Card[]): Game {
        if (!players) {
            players = [new Player("P1"), new Player("P2"), new Player("P3")];
        }
        if (!cards) {
            cards = CardUtils.createDeck();
            this.shuffleArray(cards);
        }
        return new Game(players, cards, 0, 0);
    }

    static shuffleArray(array: Card[]) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}