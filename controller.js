import { Maze } from './model.js';
import { renderMaze, highlightExplored } from './view-functions.js';
import { BFS, UCS, DFS, trueRandomWalk, astar } from './algorithms.js';

class MazeController {
    constructor(model, view) {
        this.model = model;
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
        let result;  // to store path and explored cells
    
        switch (algorithm) {
            case "bfs":
                result = BFS(this.model);
                break;
            case "ucs":
                result = UCS(this.model);
                break;
            case "dfs":
                result = DFS(this.model);
                break;
            case "randomWalk":
                result = randomWalk(this.model);
                break;
            case "trueRandomWalk":
                result = trueRandomWalk(this.model);
                break;
            case "astar":
                result = astar(this.model);
                break;
            default:
                console.error("Unknown algorithm selected:", algorithm);
                return;
        }
    
        const path = result.path;
        const exploredCells = result.explored;
    
        // Highlight explored cells
        for (let cell of exploredCells) {
            highlightExplored(this.view.p, cell, this.model.w);
        }
    
        // Introduce a delay before starting the bot's animation to give time for the explored cells to be highlighted
        setTimeout(() => {
            let pathIndex = 0;
            const moveBot = () => {
                if (pathIndex < path.length) {
                    let cell = path[pathIndex++];
                    this.model.bot.move(cell.i, cell.j);
                    setTimeout(moveBot, 100);  // Delay to animate movement
                }
            }
            moveBot();
        }, 1000); // 1 second delay, adjust as necessary
    }    
}

export { MazeController };
