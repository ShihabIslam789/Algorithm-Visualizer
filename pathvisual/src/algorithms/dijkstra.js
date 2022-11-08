import * as utils from "./algorithmUtils.js";

export default function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = utils.getAllNodes(grid);