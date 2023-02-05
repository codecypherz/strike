/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

    protected name: string;
    protected imageUrl: string;

    getName(): string {
        return this.name;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }
}
