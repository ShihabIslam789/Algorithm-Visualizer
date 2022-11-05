import * as utils from "./algorithmUtils.js";

export default function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const nodeStack = [];