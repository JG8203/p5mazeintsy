import { MazeController } from './controller.js';
import { Maze } from './model.js';
import { MazeView } from './view.js';

let mazeController;

const sketch = (p) => {

    let mazeController;

    p.setup = function() {
        p.createCanvas(400, 400);
        const model = new Maze(64, p.width);
        const view = new MazeView(p, model);
        mazeController = new MazeController(model, view); 
        console.log("mazeController initialized", mazeController);
        p.frameRate(144);
        document.getElementById('play').addEventListener('click', () => {
            mazeController.model.bot.reset();
            console.log("Play button clicked!");  
            mazeController.traverseMaze();
        });
    };

    p.draw = function() {
        p.background(9,107,108,255);
        mazeController.update();
        p.text(`Blocks traversed: ${mazeController.model.bot.getCounter()}`, 10, p.height - 10);
    };
};

let myp5 = new p5(sketch);
