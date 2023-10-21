import { renderMaze, renderExplored } from './view-functions.js';

class MazeView {
    constructor(p, model) {
        this.p = p;
        this.model = model;
    }

    display() {
        renderMaze(this.p,this.model);
    }

    displayExplored(cell) {
        renderExplored(this.p, cell, this.model);
    }
}

export { MazeView };
