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

function heuristic(a, b) {
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
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

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(node, priority) {
        this.elements.push({node, priority});
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift().node;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

function UCS(model) {
    const start = model.grid[0];
    const goal = model.grid[model.grid.length - 1];
    let queue = new PriorityQueue();
    let visited = new Set();
    let cameFrom = new Map();
    let gScore = new Map();

    queue.enqueue(start, 0);
    gScore.set(start, 0);

    while (!queue.isEmpty()) {
        let current = queue.dequeue();

        if (current === goal) {
            return reconstructPath(cameFrom, start, goal);
        }

        let neighbors = getValidNeighbors(current, model);
        for (let neighbor of neighbors) {
            // Assuming each move between neighbors has a cost of 1
            // Adjust if your model has different costs
            let tentativeGScore = gScore.get(current) + 1;

            if (!visited.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                queue.enqueue(neighbor, tentativeGScore);
                visited.add(neighbor);
            }
        }
    }

    // Return empty path if no path found
    return [];
}

function DFS(model) {
    const start = model.grid[0];
    const goal = model.grid[model.grid.length - 1];
    let stack = [];
    let visited = new Set();
    let cameFrom = new Map();

    stack.push(start);

    while (stack.length > 0) {
        let current = stack.pop();

        if (current === goal) {
            return reconstructPath(cameFrom, start, goal);
        }

        let neighbors = getValidNeighbors(current, model);
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
                visited.add(neighbor);
                cameFrom.set(neighbor, current);
            }
        }
    }

    // Return empty path if no path found
    return [];
}

function randomWalk(model) {
    const start = model.grid[0];
    const goal = model.grid[model.grid.length - 1];
    let current = start;
    let visited = new Set();
    let cameFrom = new Map();

    while (current !== goal) {
        visited.add(current);
        
        let neighbors = getValidNeighbors(current, model);
        let unvisitedNeighbors = neighbors.filter(neighbor => !visited.has(neighbor));

        // If there are no unvisited neighbors, backtrack
        if (unvisitedNeighbors.length === 0) {
            current = cameFrom.get(current); // backtrack
            if (!current) {  // if no place to backtrack, exit (this is a trapped scenario)
                return [];   // return empty path indicating failure
            }
            continue;
        }
        
        let next = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        cameFrom.set(next, current);
        current = next;
    }

    return reconstructPath(cameFrom, start, goal);
}   

function trueRandomWalk(model) {
    const start = model.grid[0];
    const goal = model.grid[model.grid.length - 1];
    let current = start;
    let path = [start];  // Store the sequence of cells for visualization

    while (current !== goal) {
        let neighbors = getValidNeighbors(current, model);
        
        // Do not filter out visited neighbors, allowing for random movement in any direction
        let next = neighbors[Math.floor(Math.random() * neighbors.length)];
        path.push(next);  // Record this step in the path
        current = next;
    }

    return path;
}

function astar(model) {
    const start = model.grid[0];
    const goal = model.grid[model.grid.length - 1];
    let openSet = new PriorityQueue();
    let closedSet = new Set();
    let cameFrom = new Map();
    let gScore = new Map();
    
    gScore.set(start, 0);
    openSet.enqueue(start, heuristic(start, goal));

    while (!openSet.isEmpty()) {
        let current = openSet.dequeue();

        if (current === goal) {
            return reconstructPath(cameFrom, start, goal);
        }

        closedSet.add(current);
        
        let neighbors = getValidNeighbors(current, model);
        for (let neighbor of neighbors) {
            if (closedSet.has(neighbor)) continue;

            let tentativeGScore = gScore.get(current) + 1; // Assuming each move between neighbors has a cost of 1

            if (!openSet.elements.some(e => e.node === neighbor) || tentativeGScore < gScore.get(neighbor)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                
                let fScore = tentativeGScore + heuristic(neighbor, goal);
                openSet.enqueue(neighbor, fScore);
            }
        }
    }

    // Return empty path if no path found
    return [];
}



export { BFS, UCS, DFS, randomWalk, trueRandomWalk, astar };