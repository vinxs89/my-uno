import { ActionCard } from "./ActionCard";
import { ActionCardType } from "./ActionCardType";
import { CardImageName } from "./CardImageName";
import { Color } from "./Color";

export class ColoredActionCard extends ActionCard {
    private _color: Color;
    
    constructor(id: string, type: ActionCardType, color: Color) {
        super(id, type, CardImageName.getCardImageName(undefined, color, type));
        this._color = color;
    }

    get color() {
        return this._color;
    }
}