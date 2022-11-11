import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import dijkstra from "../algorithms/dijkstra";
import dfs from "../algorithms/dfs";
import bfs from "../algorithms/bfs";
import greedyBfs from "../algorithms/greedy-bfs";
import getNodesInShortestPathOrder, {
  manhattanDistance,
} from "../algorithms/algorithmUtils";
import aStar from "../algorithms/a-star";

let START_NODE_ROW = 10;
let START_NODE_COL = 10;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 40;

const GRID_HEIGHT = 20;
const GRID_WIDTH = 50;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      specialNodePressed: "none",
      currentAlgorithm: "dijkstra", // default
    };
  }
  componentDidMount() {
    const grid = createInitialGrid();
    this.setState({ grid });
  }
  handleMouseDown(row, col) {
    // if buttons are disabled, don't produce walls either
    const button = document.getElementById("viz-btn");
    if (button.disabled === true) {
      return;
    }