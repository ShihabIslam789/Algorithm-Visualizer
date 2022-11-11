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
    const node = this.state.grid[row][col];
    if (node.isStart) {
      const newGrid = createNewGridWithStartNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({
        grid: newGrid,
        mouseIsPressed: true,
        specialNodePressed: "start",
      });
    } else if (node.isFinish) {
        const newGrid = createNewGridWithFinishNodeToggled(
          this.state.grid,
          row,
          col
        );
        this.setState({
          grid: newGrid,
          mouseIsPressed: true,
          specialNodePressed: "finish",
        });
      } else {
        const newGrid = createNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({ grid: newGrid, mouseIsPressed: true });
      }
    }
  
    handleMouseEnter(row, col) {
        const button = document.getElementById("viz-btn");
        if (!this.state.mouseIsPressed || button.disabled === true) return;
        if (this.state.specialNodePressed === "start") {
          const newGrid = createNewGridWithStartNodeToggled(
            this.state.grid,
            row,
            col
          );
          this.setState({ grid: newGrid });
    } else if (this.state.specialNodePressed === "finish") {
      const newGrid = createNewGridWithFinishNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
    } else {
      const newGrid = createNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp(row, col) {
    if (this.state.specialNodePressed === "start") {
      const newGrid = createNewGridWithStartNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
    } else if (this.state.specialNodePressed === "finish") {
      const newGrid = createNewGridWithFinishNodeToggled(
        this.state.grid,
        row,
        col
      );
      this.setState({ grid: newGrid });
    }
    this.setState({ mouseIsPressed: false, specialNodePressed: "none" });
  }

  updateStartNode() {}

  toggleInputs(disable = false) {
    const navbar = document.getElementById("navbar");
    const buttons = navbar.getElementsByTagName("button");
    if (disable === true) {
      for (let button of buttons) {
        button.disabled = true;
      }
    } else {
      for (let button of buttons) {
        button.disabled = false;
      }
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        // console.log(node);
        if (nodesInShortestPathOrder.length > 1) {
          if (i === 0) {
            document.getElementById(
              `node (${node.row},${node.col})`
            ).className = "node start-node-shortest-path";
        } else if (i === nodesInShortestPathOrder.length - 1) {
            document.getElementById(
              `node (${node.row},${node.col})`
            ).className = "node finish-node-shortest-path";
            this.toggleInputs(false);
          } else {
            document.getElementById(
              `node (${node.row},${node.col})`
            ).className = "node node-shortest-path";
          }
        } else {
          this.toggleInputs(false);
        }
      }, 30 * i);
    }
  }
