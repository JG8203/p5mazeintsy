import { NORTH, EAST, SOUTH, WEST } from './model.js';

function renderMaze(p, maze) {
    let allCells = maze.getAllCells();
    let currentCell = maze.getCurrentCell();

    // Render each cell
    for (let cell of allCells) {
        drawCell(p, cell);
    }

    // Highlight explored cells (NOTE: This is new!)
    // It uses the bot's internal store of visited cells for the highlighting.
    let exploredCells = maze.bot.getExplored(); // Assuming you added a getExplored() method to the bot
    for (let cell of exploredCells) {
        highlightExplored(p, cell, maze.w);
    }

    // Render the bot's path
    let botPath = maze.bot.getPath();
    for (let cell of botPath) {
        highlightPath(p, cell, maze.w);
    }
    
    // Render the bot at its current position
    drawBot(p, maze.bot, maze.w);
}


function drawBot(p, bot, cellWidth) {
    let x = bot.i * cellWidth;
    let y = bot.j * cellWidth;
    p.textSize(20);
    p.text("🤖", x + 5, y + 20); // A simple robot emoji representation
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

function highlightPath(p, cell, cellWidth) {
    let x = cell.i * cellWidth;
    let y = cell.j * cellWidth;

    console.log(`Highlighting Path cell at (${x}, ${y})`);

    p.noStroke();
    p.fill(255, 255, 0, 150);  // Yellow color for the path
    p.rect(x, y, cellWidth, cellWidth);
}

function renderExplored(p, cell, maze) {
    highlightExplored(p, cell, maze.w);
}

function highlightExplored(p, cell, cellWidth) {
    let x = cell.i * cellWidth;
    let y = cell.j * cellWidth;
    console.log(`Highlighting Explored cell at (${x}, ${y})`);
    // Setting a color (for example, light blue) to show explored cells.
    p.noStroke();
    p.fill(173, 216, 230, 150);  // light blue color with some transparency
    p.rect(x, y, cellWidth, cellWidth);
}


export { renderMaze, highlightExplored, renderExplored };
