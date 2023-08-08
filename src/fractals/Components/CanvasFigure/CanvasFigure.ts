import { Direction, Point } from "../../../types";

export class CanvasFigure {
  ctx: CanvasRenderingContext2D;
  iterations: number;
  size: number;
  edges: Record<Direction, number>;

  constructor(
    ctx: CanvasRenderingContext2D,
    iterations: number,
    size: number,
  ) {
    this.ctx = ctx;
    this.iterations = iterations;
    this.size = size;
    this.edges = { 'E': 0, 'N': 0, "S": 0, 'W': 0 }
  }


  withinBounds(): boolean {
    if (this.edges.N < 0 || this.edges.W < 0 || this.edges.E > this.size || this.edges.S > this.size) {
      return false;
    }
    return true;
  }

  centreImageCoords(
  ): { x: number, y: number } {
    let x = 0;
    let y = 0;
    if (this.withinBounds()) {
      return { x, y };
    }
    if (this.edges.S > this.size) {
      y = this.size - this.edges.S - 2;
    }
    if (this.edges.E > this.size) {
      x = this.size - this.edges.E - 2;
    }
    if (this.edges.N < 0) {
      y = - this.edges.N + 2;
    }
    if (this.edges.W < 0) {
      x = - this.edges.W + 2;
    }
    return { x, y };
  }

  updateEdges(
    p: Point,
  ) {
    if (p[0] < this.edges.W) {
      this.edges.W =  Math.min(p[0], this.edges.W);
    }
    if (p[0] > this.size) {
      this.edges.E = Math.max(p[0], this.edges.E);
    }
    if (p[1] < this.edges.N) {
      this.edges.N =  Math.min(p[1], this.edges.N);
    }
    if (p[1] > this.size) {
      this.edges.S =  Math.max(p[1], this.edges.S);
    }
  }

  scaleRatio() {
    if (this.withinBounds()) return 1;
    const height = this.edges.S - this.edges.N;
    const width = this.edges.E - this.edges.W;
    return this.size / Math.max(height, width);
  }
}