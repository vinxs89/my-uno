import { ActionCard } from "./ActionCard";
import { ActionCardType } from "./ActionCardType";
import { Card } from "./Card";
import { Color } from "./Color";
import { ColoredActionCard } from "./ColoredActionCard";
import { Game } from "./Game";
import { NumberCard } from "./NumberCard";
import { Player } from "./Player";

export class GameFactory {

    public static createGame(): Game {
        console.log("create game");

        const cards = this.createDeck();
        this.shuffleArray(cards);
        const players = [new Player("P1"), new Player("P2"), new Player("P3"), new Player("P4")];
        return new Game(players, cards, 0, 0);
    }   

    static createDeck(): Card[] {
        const cards: Card[] = [];
        Object.values(Color).forEach(color => {
            if (isNaN(Number(color))) {
                cards.push(new NumberCard(0, color as Color));

                for(let i=1; i<10; i++) {
                    cards.push(new NumberCard(i, color as Color));
                    cards.push(new NumberCard(i, color as Color));
                }

                cards.push(new ColoredActionCard(ActionCardType.MORE2, color as Color));
                cards.push(new ColoredActionCard(ActionCardType.MORE2, color as Color));
                cards.push(new ColoredActionCard(ActionCardType.ROTATE, color as Color));
                cards.push(new ColoredActionCard(ActionCardType.ROTATE, color as Color));
                cards.push(new ColoredActionCard(ActionCardType.STOP, color as Color));
                cards.push(new ColoredActionCard(ActionCardType.STOP, color as Color));
            }
        });

        cards.push(new ActionCard(ActionCardType.MORE4));
        cards.push(new ActionCard(ActionCardType.MORE4));
        cards.push(new ActionCard(ActionCardType.MORE4));
        cards.push(new ActionCard(ActionCardType.MORE4));

        cards.push(new ActionCard(ActionCardType.SWITCH_COLOR));
        cards.push(new ActionCard(ActionCardType.SWITCH_COLOR));
        cards.push(new ActionCard(ActionCardType.SWITCH_COLOR));
        cards.push(new ActionCard(ActionCardType.SWITCH_COLOR));

        return cards;
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