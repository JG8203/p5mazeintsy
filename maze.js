import { MazeController } from './controller.js';
import { Maze } from './model.js';
import { MazeView } from './view.js';
import { highlightExplored } from './view-functions.js';

const sketch = (p) => {
    let mazeController;

    p.setup = function() {
        let canvas = p.createCanvas(900, 900);
        canvas.id('myCanvas');
        const initialSize = 5;
        initializeMaze(initialSize);

        document.getElementById('play').addEventListener('click', () => {
            mazeController.model.bot.reset();
            console.log("Play button clicked!");  
            mazeController.traverseMaze();
        });

        // Adding event listener for the "Generate Maze" button
        document.getElementById('generate').addEventListener('click', () => {
            const newSize = parseInt(document.getElementById('mazeSize').value);
            if(!isNaN(newSize) && newSize > 0) {
                initializeMaze(newSize);
            } else {
                console.log("Invalid maze size input");
            }
        });
    };

    // Function to initialize or reinitialize the maze with a given size
    function initializeMaze(size) {
        const model = new Maze(size, p.width);
        const view = new MazeView(p, model);
        mazeController = new MazeController(model, view); 
        console.log("mazeController initialized", mazeController);
        p.frameRate(144);
    }

    p.draw = function() {
        p.background(9,107,108,255);   // Clear the background
    
        mazeController.update();   // This will handle maze generation and display the maze
    
        highlightExplored(p, mazeController.model.bot.getExplored());  // Highlight explored paths
        p.text(`Blocks traversed: ${mazeController.model.bot.getCounter()}`, 10, p.height - 10);
    };
    
};

let myp5 = new p5(sketch);
