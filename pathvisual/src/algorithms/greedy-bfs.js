import * as utils from "./algorithmUtils.js";

export default function greedyBfs(grid, startNode, finishNode, heuristic) {
    const visitedNodesInOrder = [];
    const nodePQ = [];
    nodePQ.push(startNode);
  while (!!nodePQ.length) {
    const currentNode = nodePQ.shift();
    if (currentNode.isWall) continue;