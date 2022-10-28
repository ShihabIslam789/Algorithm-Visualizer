export default function aStar(grid, startnode, finishNode, heuristic) {
    const visitedNodesInOrder = []
    const openList = [];
  openList.push(startNode);
  while (!!openList.length) {
    let lowestIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    const currentNode = openList[lowestIndex];

        currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) return visitedNodesInOrder;
    openList.splice(lowestIndex, 1);
    const neighbors = aStarGetNeighbors(currentNode, grid);
    for (let neighbor of neighbors) {
      const gScore = currentNode.g + 1;
      let gScoreIsBest = false;
      if (neighbor in visitedNodesInOrder || neighbor.isWall) continue;
      if (!neighbor.isVisited) {
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor, finishNode);
        neighbor.isVisited = true;
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }
      if (gScoreIsBest) {
        neighbor.previousNode = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }
  return visitedNodesInOrder;
}
}