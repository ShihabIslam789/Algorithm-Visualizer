import * as utils from "./algorithmUtils.js";

export default function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const nodeQueue = [];
    nodeQueue.push(startNode);