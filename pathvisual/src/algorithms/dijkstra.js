import * as utils from "./algorithmUtils.js";

export default function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = utils.getAllNodes(grid);
  startNode.distance = 0;
  while (!!unvisitedNodes.length) {
    const minNode = utils.sortedNodes(unvisitedNodes).shift();