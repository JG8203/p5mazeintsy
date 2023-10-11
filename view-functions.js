import { NORTH, EAST, SOUTH, WEST } from './model.js';

function renderMaze(p, maze) {
    let allCells = maze.getAllCells();
    for (let cell of allCells) {
        drawCell(p, cell);
    }
    let currentCell = maze.getCurrentCell();
    highlightCell(p, currentCell);
}


function drawCell(p, cell) {
    let x = cell.i * cell.w;
    let y = cell.j * cell.w;
    let wallThickness = 1;

    // Determine the rectangle dimensions and position based on the walls
    let rectX = cell.walls[WEST] ? x + wallThickness : x;
    let rectY = cell.walls[NORTH] ? y + wallThickness : y;
    let rectW = cell.w - (cell.walls[WEST] ? wallThickness : 0) - (cell.walls[EAST] ? wallThickness : 0);
    let rectH = cell.w - (cell.walls[NORTH] ? wallThickness : 0) - (cell.walls[SOUTH] ? wallThickness : 0);

    if (cell.visited) {
        p.noStroke();
        p.fill(188,193,155,255);
        p.rect(rectX, rectY, rectW, rectH);
    }

    p.stroke(100);
    p.strokeWeight(wallThickness);

    if (cell.walls[NORTH]) p.line(x, y, x + cell.w, y);
    if (cell.walls[EAST]) p.line(x + cell.w, y, x + cell.w, y + cell.w);
    if (cell.walls[SOUTH]) p.line(x, y + cell.w, x + cell.w, y + cell.w);
    if (cell.walls[WEST]) p.line(x, y, x, y + cell.w);
}



function highlightCell(p, cell) {
    let x = cell.i * cell.w;
    let y = cell.j * cell.w;
    p.noStroke();
    p.fill(154,85,72,255);
    p.rect(x, y, cell.w, cell.w);
}


export { renderMaze };
