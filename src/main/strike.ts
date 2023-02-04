import { Board } from './board.js';

function start() {
    console.log('Starting!');

    let board = new Board();
    board.render();
}

window.onload = () => {
    start();
}