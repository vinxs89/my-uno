import { ActionCard } from "./ActionCard";
import { ActionCardType } from "./ActionCardType";
import { Card } from "./Card";
import { CardUtils } from "./CardUtils";
import { Color } from "./Color";

export class MoveUtils {

    public static isValidMove(card: Card, currentColor?: Color, currentNumber?: number, currentType?: ActionCardType): boolean {
        return MoveUtils.isSameNumber(card, currentNumber) ||
        MoveUtils.isSameColor( card, currentColor) ||
        MoveUtils.isValidActionCard(card, currentColor, currentType);
    }

    static isSameNumber(card: Card, currentNumber?: number): boolean {
        return currentNumber != null && CardUtils.getCardNumber(card) === currentNumber;
    }

    static isSameColor(card: Card, currentColor?: Color): boolean {
        return CardUtils.getCardColor(card) === currentColor;
    }
    
    static isValidActionCard(card: Card, currentColor?: Color, currentType?: ActionCardType): boolean {
        const color = CardUtils.getCardColor(card);
        if(color === null) {
            return true;
        }
        if(card instanceof ActionCard) {
            if (card.type === currentType) {
                return true;
            }
        }
        return color === currentColor;
    }
    
}