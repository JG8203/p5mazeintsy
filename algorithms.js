import { getIndex } from './model.js';

function BFS(model) {
    const start = model.grid[0];
    const goal = model.grid[model.grid.length - 1];
    let queue = [];
    let visited = new Set();
    let cameFrom = new Map();

    queue.push(start);

    while (queue.length > 0) {
        let current = queue.shift();

        if (current === goal) {
            return reconstructPath(cameFrom, start, goal);
        }

        let neighbors = getValidNeighbors(current, model);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
                cameFrom.set(neighbor, current);
            }
        }
    }

    // Return empty path if no path found
    return [];
}

function getValidNeighbors(cell, model) {
    const directions = [
        {i: 0, j: -1},  // North
        {i: 1, j: 0},   // East
        {i: 0, j: 1},   // South
        {i: -1, j: 0}   // West
    ];
    let neighbors = [];

    directions.forEach((dir, index) => {
        if (!cell.walls[index]) {  // Check if wall is not present in that direction
            const ni = cell.i + dir.i;
            const nj = cell.j + dir.j;
            const neighbor = model.grid[getIndex(ni, nj, model.rows)];
            if (neighbor) neighbors.push(neighbor);
        }
    });

    return neighbors;
}

function reconstructPath(cameFrom, start, goal) {
    let path = [];
    let current = goal;

    while (current !== start) {
        path.unshift(current);
        current = cameFrom.get(current);
    }
    path.unshift(start);  // Add start to the path

    return path;
}

export { BFS };
