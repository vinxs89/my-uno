import { MoveActionType } from "./MoveActionType";
import { Player } from "./Player";

export class MoveResult {
    private _currentPlayer;
    private _nextPlayer;
    private _actions: MoveActionType[];
    
    constructor(currentPlayer: Player, nextPlayer: Player, actions: MoveActionType[]) {
        this._currentPlayer = currentPlayer;
        this._nextPlayer = nextPlayer;
        this._actions = actions;
    }

    get actions() {
        return this._actions;
    }
}