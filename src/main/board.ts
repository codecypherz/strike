import { Piece } from '../piece/piece.js';
import { Burrower } from '../piece/burrower.js';

export class Board {

    width: number = 8;
    height: number = 8;

    pieces: Array<Piece> = [];

    clickedPiece: Piece|null = null;

    constructor() {
        this.pieces.push(new Burrower(3, 0));
        this.pieces.push(new Burrower(4, 7));
    }

    render(): void {
        console.log('Rendering!');
        document.body.innerHTML = '';
        for (let y = 0; y < this.height; y++) {
            let row = document.createElement('div');
            row.className = 'row';
            document.body.appendChild(row);

            for (let x = 0; x < this.width; x++) {
                let cell = document.createElement('div');
                cell.className = 'cell';
                row.appendChild(cell);

                let foundPiece;
                for (let piece of this.pieces) {
                    if (x == piece.x && y == piece.y) {
                        foundPiece = piece;
                        
                    }
                }
                if (foundPiece != null) {
                    foundPiece.render(cell);
                }

                cell.addEventListener('click', this.handleCellClick.bind(this, x, y, foundPiece), false);
            }
        }


    }

    handleCellClick(x: number, y: number, piece: Piece, e: Event): void {
        console.log('Clicked: ', x, y, piece, this.clickedPiece, e);
        if (piece != null) {
            if (this.clickedPiece == null) {
                this.clickedPiece = piece;
                this.clickedPiece.selected = true;
            } else {
                this.clickedPiece.selected = false;
                this.clickedPiece = null;
            }
        } else {
            if (this.clickedPiece != null) {
                this.clickedPiece.x = x;
                this.clickedPiece.y = y;
                this.clickedPiece.selected = false;
                this.clickedPiece = null;
            }
        }
        this.render();
    }
}