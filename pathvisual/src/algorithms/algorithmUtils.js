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