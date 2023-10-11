import { Maze } from './model.js';
import { renderMaze } from './view-functions.js';

class MazeController {
    constructor(model, view) {
        this.model = model; // Changed from this.maze to this.model
        this.view = view;
    }

    update() {
        this.stepGeneration();
        this.view.display();
    }

    stepGeneration() {
        this.model.generateStep();
    }
}

export { MazeController };
