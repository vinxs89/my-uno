import { MoveActionType } from "./MoveActionType";
import { Player } from "./Player";

export class MoveResult {
    private currentPlayer;
    private nextPlayer;
    private actions: MoveActionType[];
    
    constructor(currentPlayer: Player, nextPlayer: Player, actions: MoveActionType[]) {
    this.currentPlayer = currentPlayer;
    this.nextPlayer = nextPlayer;
    this.actions = actions;
    }
}