import { MazeController } from './controller.js';
import { Maze } from './model.js';
import { MazeView } from './view.js';

const sketch = (p) => {
    let mazeController;

    p.setup = function() {
        let canvas = p.createCanvas(900, 900);
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
            if(!isNaN(newSize) && newSize > 0) {
                initializeMaze(newSize);
            } else {
                console.log("Invalid maze size input");
            }
        });
        document.getElementById('punchHoles').addEventListener('click', () => {
            mazeController.punchHoles();
            console.log("Punch Holes button clicked!");
        });
    };

    // Function to initialize or reinitialize the maze with a given size
    function initializeMaze(size) {
        const model = new Maze(size, p.width);
        const view = new MazeView(p, model);
        mazeController = new MazeController(model, view); 
        p.frameRate(144);
    }

    p.draw = function() {
        p.background(9, 107, 108, 255);
        mazeController.update();
        
        // Draw a black background for the text
        p.fill(0); // Set fill color to black
        let textWidth = p.textWidth(`Blocks traversed: ${mazeController.model.bot.getCounter()}`);
        p.rect(10, p.height - 30, textWidth + 20, 20); // Adjust the position and size as needed
        
        // Display the text on top of the black background
        p.fill(255); // Set text color to white
        p.text(`Blocks traversed: ${mazeController.model.bot.getCounter()}`, 10, p.height - 10);
    };    
};

let myp5 = new p5(sketch);
