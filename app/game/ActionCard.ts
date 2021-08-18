import { ActionCardType } from "./ActionCardType";
import { Card } from "./Card";

export class ActionCard extends Card {
    private _type: ActionCardType;
    
    constructor(type: ActionCardType) {
        super(0);
        this._type = type;
    }

    get type() {
        return this._type;
    }
}