import { MazeController } from './controller.js';
import { Maze } from './model.js';
import { MazeView } from './view.js';

const sketch = (p) => {
    let mazeController;

    p.setup = function() {
        let canvas = p.createCanvas(570, 570);
        canvas.id('myCanvas');
        const initialSize = 10;
        initializeMaze(initialSize);

        document.getElementById('play').addEventListener('click', () => {
            mazeController.model.bot.reset();
            console.log("Play button clicked!");  
            mazeController.traverseMaze();
        });

        // Adding event listener for the "Generate Maze" button
        document.getElementById('generate').addEventListener('click', () => {
            const newSize = parseInt(document.getElementById('mazeSize').value);
            if(!isNaN(newSize) && newSize >= 8 && newSize <= 64) {
                initializeMaze(newSize);
            } else {
                alert("Invalid maze size input. Please enter a number between 8 and 64.");
            }
        });
        document.getElementById('punchHoles').addEventListener('click', () => {
            mazeController.punchHoles();
            console.log("Punch Holes button clicked!");
        });
    };

    function initializeMaze(size) {
        const model = new Maze(size, p.width);
        model.generateCompleteMaze();
        const view = new MazeView(p, model);
        mazeController = new MazeController(model, view); 
    }
    

    p.draw = function() {
        p.background(9, 107, 108, 255);
        mazeController.update();

        p.fill(0);
        p.text(`Blocks traversed: ${mazeController.model.bot.getCounter()}`, 10, p.height - 10);
    };    
};

let myp5 = new p5(sketch);
