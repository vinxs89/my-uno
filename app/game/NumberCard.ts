import { Card } from "./Card";
import { Color } from "./Color";

export class NumberCard extends Card {
    private _value: number;
    private _color: Color;
    
    constructor(value: number, color: Color) {
        super(value);
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