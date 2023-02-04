export abstract class Piece {

    x: number;
    y: number;
    selected: boolean = false;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    render(element: HTMLElement): void {
        let piece = document.createElement('div');
        piece.className = 'piece';
        if (this.selected) {
            piece.classList.add('selected');
        }
        let imageUrl = this.getImage();
        if (imageUrl != null) {
            let image = document.createElement('img');
            image.src = imageUrl;
            piece.appendChild(image);
        }
        element.appendChild(piece);
    }

    abstract getImage(): string
}
