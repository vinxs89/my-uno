import { Card } from "./Card";
import { Color } from "./Color";
import { ColoredActionCard } from "./ColoredActionCard";
import { NumberCard } from "./NumberCard";

export class CardUtils {

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

    static isNumberedCard(card: Card): boolean {
        return card instanceof NumberCard;
    }
}