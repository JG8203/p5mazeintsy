import { MazeController } from './controller.js';
import { Maze } from './model.js';
import { MazeView } from './view.js';

const sketch = (p) => {

    let mazeController;

    p.setup = function() {
        p.createCanvas(400, 400);
        const model = new Maze(10, p.width);
        const view = new MazeView(p, model);
        mazeController = new MazeController(model, view);
        p.frameRate(144);
    };

    p.draw = function() {
        p.background(9,107,108,255);
        mazeController.update();
    };
};

let myp5 = new p5(sketch);
