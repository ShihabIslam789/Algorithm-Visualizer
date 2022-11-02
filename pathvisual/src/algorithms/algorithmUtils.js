export function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  export function sortedNodes(unvisitedNodes) {
    return unvisitedNodes.sort((a, b) => a.distance - b.distance);
  }
  export function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) {
      neighbors.push(grid[row - 1][col]);
    }
    if (col < grid[0].length - 1) {
      neighbors.push(grid[row][col + 1]);
    }