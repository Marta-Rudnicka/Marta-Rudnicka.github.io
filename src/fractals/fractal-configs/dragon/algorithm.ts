import { LineSegment, Point } from "../../../types";

export type Direction = 'N' | 'E' | 'S' | 'W';

type NextDir = { left: Direction, right: Direction };
type NextDirList = Record<Direction, NextDir>;

export function getDirection(line: LineSegment): Direction {
  if (line.a[1] === line.b[1]) {
    return line.a[0] > line.b[0] ? 'W' : 'E';
  }
  return line.a[1] > line.b[1] ? 'N' : 'S';
}

export function addIteration(turns: boolean[]): boolean[] {
  return [true, ...turns.map(t => !t).reverse()];
}

function withinBounds(
  edges: Record<Direction, number>,
  size: number,
): boolean {
  if (edges.N < 0 || edges.W < 0 || edges.E > size || edges.S > size) {
    return false;
  }
  return true;
}

export function centreImageCoords(
  edges: Record<Direction, number>,
  size: number,
): { x: number, y: number } {
  let x = 0;
  let y = 0;
  if (withinBounds(edges, size)) {
    return {x, y};
  }
  if ( edges.S > size ){
    y = size - edges.S - 2;
  }
  if ( edges.E > size ){
    x = size - edges.E - 2;
  }
  if ( edges.N < 0 ){
    y = - edges.N + 2;
  }
  if ( edges.W < 0 ){
    x = - edges.W + 2;
  }

  return {x, y};
}

export class Dragon {
  ctx: CanvasRenderingContext2D;
  iterations: number;
  length: number;
  lastLine: LineSegment;
  path: Path2D;
  turns: boolean[];
  size: number;
  edges: Record<Direction, number>;

  constructor(
    ctx: CanvasRenderingContext2D,
    i: number,
    length: number,
    start: Point,
    firstDirection: Direction,
    size: number,
  ) {
    this.ctx = ctx;
    this.iterations = i;
    this.length = length;
    this.size = size;
    this.edges = { 'E': 0, 'N': 0, "S": 0, 'W': 0 }
    this.lastLine = ({ a: start, b: start });
    this.turns = this.getTurns();
    this.path = new Path2D();
    this.path.moveTo(...start);
    this.addLine(firstDirection);
    this.getFullPath();
  }

  nextDir: NextDirList = {
    'N': {left: 'W', right: 'E'},
    'E': {left: 'N', right: 'S'},
    'S': {left: 'E', right: 'W'},
    'W': {left: 'S', right: 'N'},
  }

  getTurns() {
    if (this.iterations === 0) return [];
    let turns = [true];
    if (this.iterations === 1) {
      return turns;
    };
    for(let i = 1; i < this.iterations; i++) {
      const newTurns = addIteration(turns);
      turns = turns.concat(newTurns);
    }
    return turns;
  }

  getEnd(start: Point, direction: Direction): Point {
    let end: Point = [0, 0];

    if (direction === "E") {
      end = [start[0] + this.length, start[1]];
      this.edges.E = Math.max(end[0], this.edges.E)
    } else if (direction === "W") {
      end = [start[0] - this.length, start[1]];
      this.edges.W = Math.min(end[0], this.edges.W);
    } else if (direction === "S") {
      end = [start[0], start[1] + this.length];
      this.edges.S = Math.max(end[1], this.edges.S)
    } else {
      end = [start[0], start[1] - this.length];
      this.edges.N = Math.min(end[1], this.edges.N)
    }
    return end;
  }

  addLine(direction: Direction) {
    const end  = this.getEnd(this.lastLine.b, direction)
    this.path.lineTo(...end);
    this.lastLine = ({ a: this.lastLine.b, b: end })
  }

  getFullPath() {
    for (let turn of this.turns) {
      const last = getDirection(this.lastLine);
      const currentTurn = turn ? 'right' : 'left';
      const next = this.nextDir[last][currentTurn];
      this.addLine(next);
    }
  }
  getTranslationCoords() {
    let x = 0;
    let y = 0;
    if (this.edges.E && ! this.edges.W) {
      x = Math.floor(-this.edges.E) - 2;
    }
    if (this.edges.W && ! this.edges.E) {
      x = Math.floor(this.edges.W) + 2;
    }
    if (this.edges.N && ! this.edges.S) {
      y = Math.floor(this.edges.N) + 2;
    }
    if (this.edges.S && ! this.edges.N) {
      y = Math.floor(-this.edges.S) - 2;
    }
    return {x, y};
  }
}

type IterationImage = {
  turns: boolean[],
  path: Path2D,
}

export class ColouredDragon {
  ctx: CanvasRenderingContext2D;
  iterations: number;
  firstDirection: Direction;
  iterationImages: IterationImage[];
  length: number;
  lastLine: LineSegment;
  size: number;
  edges: Record<Direction, number>;
  turns: boolean[];

  constructor(
    ctx: CanvasRenderingContext2D,
    i: number,
    length: number,
    start: Point,
    firstDirection: Direction,
    size: number,
  ) {
    this.ctx = ctx;
    this.iterations = i;
    this.length = length;
    this.size = size;
    this.firstDirection = firstDirection;
    this.turns = [];
    this.edges = { 'E': 0, 'N': 0, "S": 0, 'W': 0 }
    this.lastLine = ({ a: start, b: start });
    this.iterationImages = [];
    this.addIterationImages()
  }

  nextDir: NextDirList = {
    'N': {left: 'W', right: 'E'},
    'E': {left: 'N', right: 'S'},
    'S': {left: 'E', right: 'W'},
    'W': {left: 'S', right: 'N'},
  }

  colours = ['red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow','red', 'green', 'blue', 'yellow','red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow','red', 'green', 'blue', 'yellow','red', 'green', 'blue', 'yellow', ]

  addIterationImage(i: number) {
    const newImage = {
      turns: addIteration(this.turns),
      path: new Path2D(),
    }
    this.turns = this.turns.concat(newImage.turns);
    newImage.path.moveTo(...this.lastLine.b)
    this.getPath(newImage.path, newImage.turns);
    this.iterationImages.push(newImage);
    this.ctx.strokeStyle = this.colours[i];
    this.ctx.stroke(newImage.path);
  }

  addIterationImages() {
    let newImage: IterationImage = { path: new Path2D(), turns: []};
    newImage.path.moveTo(...this.lastLine.b);
    this.addLine(this.firstDirection, newImage.path);
    this.ctx.stroke(newImage.path)
    this.iterationImages.push(newImage)
    if (this.iterations === 0) return;

    newImage = { path: new Path2D(), turns: [true]};
    newImage.path.moveTo(...this.lastLine.b);
    this.getPath(newImage.path, newImage.turns)
    this.ctx.stroke(newImage.path)
    this.iterationImages.push(newImage);


    for (let i = 2; i <= this.iterations; i ++) {
      this.addIterationImage(i)
    }
  }

  getEnd(start: Point, direction: Direction): Point {
    let end: Point = [0, 0];

    if (direction === "E") {
      end = [start[0] + this.length, start[1]];
      this.edges.E = Math.max(end[0], this.edges.E)
    } else if (direction === "W") {
      end = [start[0] - this.length, start[1]];
      this.edges.W = Math.min(end[0], this.edges.W);
    } else if (direction === "S") {
      end = [start[0], start[1] + this.length];
      this.edges.S = Math.max(end[1], this.edges.S)
    } else {
      end = [start[0], start[1] - this.length];
      this.edges.N = Math.min(end[1], this.edges.N)
    }
    return end;
  }

  addLine(direction: Direction, path: Path2D) {
    const end  = this.getEnd(this.lastLine.b, direction)
    path.lineTo(...end);
    this.lastLine = ({ a: this.lastLine.b, b: end })
  }

  getPath(path: Path2D, turns: boolean[]) {
    let i = 0;
    for (let turn of turns) {
      const last = getDirection(this.lastLine);
      const currentTurn = turn ? 'right' : 'left';
      const next = this.nextDir[last][currentTurn];
      this.addLine(next, path);
      i++
    }
  }
  getTranslationCoords() {
    let x = 0;
    let y = 0;
    if (this.edges.E && ! this.edges.W) {
      x = Math.floor(-this.edges.E) - 2;
    }
    if (this.edges.W && ! this.edges.E) {
      x = Math.floor(this.edges.W) + 2;
    }
    if (this.edges.N && ! this.edges.S) {
      y = Math.floor(this.edges.N) + 2;
    }
    if (this.edges.S && ! this.edges.N) {
      y = Math.floor(-this.edges.S) - 2;
    }
    return {x, y};
  }
}

function getLength(size: number, iterations: number) {
  let length = Math.floor(size * 0.6);
  length = length / Math.pow(2, iterations/2);


  if (length < 0) {
    length = 1
  }
  return length;
}

function getLineWidth(iterations: number) {
  if (iterations < 5) return 3;
  if (iterations < 10) return 2;
  return 1;
}

export function drawDragon(
  ctx: CanvasRenderingContext2D,
  size: number,
  iterations: number,
) {
  const length = getLength(size, iterations);
  const start: Point = [Math.floor(0.5 * size), Math.floor(0.5 * size)];
  ctx.strokeStyle = "white";
  ctx.lineWidth = getLineWidth(iterations);
  ctx?.clearRect(0, 0, size, size);
  const dragon = new ColouredDragon(ctx, iterations, length, start, 'N', size);
  const trans = centreImageCoords(dragon.edges, size);
  ctx.translate(trans.x, trans.y);
}
