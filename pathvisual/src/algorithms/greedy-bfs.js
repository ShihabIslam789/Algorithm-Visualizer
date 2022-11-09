import * as utils from "./algorithmUtils.js";

export default function greedyBfs(grid, startNode, finishNode, heuristic) {
    const visitedNodesInOrder = [];
    const nodePQ = [];