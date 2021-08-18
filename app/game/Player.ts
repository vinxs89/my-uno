import { Card } from "./Card";

export class Player {
    _name: string;
    _cards: Card[] = [];
    
    constructor(name: string) {
        this._name = name;
    }

    receiveCard(card: Card) {
        this._cards.push(card);
    }

    discardCard(card: Card) {
        const index = this._cards.indexOf(card);
        this._cards.splice(index, 1);
    }

    get cards() {
        return this._cards.slice();
    }

    get name() {
        return this._name;
    }
}