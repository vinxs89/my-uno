import { Card } from "./Card";
import { CardUtils } from "./CardUtils";
import { Color } from "./Color";

export class MoveUtils {

    public static isValidMove(card: Card, currentColor: Color, currentNumber?: number): boolean {
        return MoveUtils.isSameNumber(card, currentNumber) ||
        MoveUtils.isSameColor( card, currentColor) ||
        MoveUtils.isValidActionCard(card, currentColor);
    }

    static isSameNumber(card: Card, currentNumber?: number): boolean {
        return currentNumber != null && CardUtils.getCardNumber(card) === currentNumber;
    }

    static isSameColor(card: Card, currentColor: Color): boolean {
        return CardUtils.getCardColor(card) === currentColor;
    }
    
    static isValidActionCard(card: Card, currentColor: Color): boolean {
        const color = CardUtils.getCardColor(card);
        if(color === null) {
            return true;
        }
        return color === currentColor;
    }
    
}