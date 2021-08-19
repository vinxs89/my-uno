import { Card } from "./Card";
import { CardImageName } from "./CardImageName";
import { Color } from "./Color";

export class NumberCard extends Card {
    private _value: number;
    private _color: Color;
    
    constructor(id: string, value: number, color: Color) {
        super(id, value, CardImageName.getCardImageName(value, color, undefined));
        this._value = value;
        this._color = color;
    }

    get color() {
        return this._color;
    }

    get value() {
        return this._value;
    }
}