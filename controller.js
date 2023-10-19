import { Maze } from './model.js';
import { renderMaze } from './view-functions.js';
import { BFS, UCS, DFS, randomWalk, trueRandomWalk, astar } from './algorithms.js';


class MazeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.isTraversalRunning = false;
        this.isGenerating = true;
        this.animateGeneration = true;
    }

    update() {
        if (this.isGenerating) {
            this.stepGeneration();
        }
        this.view.display();
    }

    stepGeneration() {
        if (!this.model.isMazeCompleted()) {
            this.model.generateStep();
        } else {
            this.isGenerating = false;
        }
    }

    traverseMaze() {
        if (this.isTraversalRunning) return;
        this.isTraversalRunning = true;

        const playButton = document.getElementById('play');
        playButton.disabled = true;

        const algorithm = document.getElementById("algorithm").value;
        let path;
        switch (algorithm) {
            case "bfs":
                path = BFS(this.model);
                break;
            case "ucs":
                path = UCS(this.model);
                break;
            case "dfs":
                path = DFS(this.model);
                break;
            case "randomWalk":
                path = randomWalk(this.model);
                break;
            case "trueRandomWalk":
                path = trueRandomWalk(this.model);
                break;
            case "astar":
                path = astar(this.model);
                break;
        }
        
        // Animate the bot movement
        let pathIndex = 0;
        const moveBot = () => {
            if (pathIndex < path.length) {
                let cell = path[pathIndex++];
                this.model.bot.move(cell.i, cell.j);
                setTimeout(moveBot, 100);  // Delay to animate movement
            } else {
                this.isTraversalRunning = false; // Reset the flag
                playButton.disabled = false; // Re-enable the button
            }
        }
        moveBot();
    }
    
    punchHoles() {
        this.model.createRandomHoles();
        this.view.display();
    }

/*     generateMazeInstantly() {
        while (!this.model.isMazeCompleted()) {
            this.model.generateStep();
        }
        this.view.renderMaze();
    } */

    toggleAnimation(value) {
        this.animateGeneration = value;
    }

}

export { MazeController };
