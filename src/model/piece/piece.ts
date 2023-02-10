import { Position } from "../position";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

    readonly name: string;
    readonly imageUrl: string;
    private position: Position;

    constructor(name: string, imageUrl: string) {
        this.name = name;
        this.imageUrl = imageUrl;
    }
    
    setPosition(position: Position): void {
        this.position = position;
    }

    getPosition(): Position {
        return this.position;
    }
}
