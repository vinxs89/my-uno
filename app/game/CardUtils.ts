import { ActionCard } from "./ActionCard";
import { ActionCardType } from "./ActionCardType";
import { Card } from "./Card";
import { Color } from "./Color";
import { ColoredActionCard } from "./ColoredActionCard";
import { NumberCard } from "./NumberCard";

export class CardUtils {

    static createDeck(): Card[] {
        const cards: Card[] = [];
        Object.values(Color).forEach(color => {
            if (isNaN(Number(color))) {
                cards.push(new NumberCard(0 + '-' + color, 0, color as Color));

                for(let i=1; i<10; i++) {
                    cards.push(new NumberCard(i + '-' + color + '-1', i, color as Color));
                    cards.push(new NumberCard(i + '-' + color + '-2', i, color as Color));
                }

                cards.push(new ColoredActionCard('action-2-' + color + '-1', ActionCardType.MORE2, color as Color));
                cards.push(new ColoredActionCard('action-2-' + color + '-2', ActionCardType.MORE2, color as Color));
                cards.push(new ColoredActionCard('action-rotate-' + color + '-1', ActionCardType.ROTATE, color as Color));
                cards.push(new ColoredActionCard('action-rotate-' + color + '-2', ActionCardType.ROTATE, color as Color));
                cards.push(new ColoredActionCard('action-stop-' + color + '-1', ActionCardType.STOP, color as Color));
                cards.push(new ColoredActionCard('action-stop-' + color + '-2', ActionCardType.STOP, color as Color));
            }
        });

        cards.push(new ActionCard('action-4-1', ActionCardType.MORE4));
        cards.push(new ActionCard('action-4-2', ActionCardType.MORE4));
        cards.push(new ActionCard('action-4-3', ActionCardType.MORE4));
        cards.push(new ActionCard('action-4-4', ActionCardType.MORE4));

        cards.push(new ActionCard('action-switch-1', ActionCardType.SWITCH_COLOR));
        cards.push(new ActionCard('action-switch-2', ActionCardType.SWITCH_COLOR));
        cards.push(new ActionCard('action-switch-3', ActionCardType.SWITCH_COLOR));
        cards.push(new ActionCard('action-switch-4', ActionCardType.SWITCH_COLOR));

        return cards;
    }

    static getCards(cardsIds: string[]): Card[] {
        const cards = CardUtils.createDeck();
        return cardsIds.map(id => cards.find(card => id === card.id) as Card);
    }

    static getCardColor(card: Card): Color | null {
        if (card instanceof NumberCard) {
            return card.color;
        }
        if (card instanceof ColoredActionCard) {
            return card.color;
        }
        return null;
    }
    static getCardNumber(card: Card): number | null {
        if (card instanceof NumberCard) {
            return card.value;
        }
        return null;
    }

    static getCardType(card: Card) {
        if (card instanceof ActionCard) {
            return card.type;
        }
        return null;
    }

    static isNumberedCard(card: Card): boolean {
        return card instanceof NumberCard;
    }
}