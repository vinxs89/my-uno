import { ActionCard } from "./ActionCard";
import { ActionCardType } from "./ActionCardType";
import { Color } from "./Color";

export class ColoredActionCard extends ActionCard {
    private _color: Color;
    
    constructor(type: ActionCardType, color: Color) {
        super(type);
        this._color = color;
    }

    get color() {
        return this._color;
    }
}