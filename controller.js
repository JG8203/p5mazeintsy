import { Maze } from './model.js';
import { renderMaze } from './view-functions.js';
import { BFS } from './algorithms.js';

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

    traverseMaze() {
        const algorithm = document.getElementById("algorithm").value;
        let path;
        switch (algorithm) {
            case "bfs":
                path = BFS(this.model);
                break;
            // ... (other algorithms)
        }
        
        // Animate the bot movement
        let pathIndex = 0;
        const moveBot = () => {
            if (pathIndex < path.length) {
                let cell = path[pathIndex++];
                this.model.bot.move(cell.i, cell.j);
                setTimeout(moveBot, 100);  // Delay to animate movement
            }
        }
        moveBot();
    }
}

export { MazeController };
