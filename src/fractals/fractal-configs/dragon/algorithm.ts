import { LineSegment, Point } from "../../../types";

type Direction = 'N' | 'E' | 'S' | 'W';

type NextDir = { left: Direction, right: Direction };
type NextDirList = Record<Direction, NextDir>;

export function getDirection(line: LineSegment): Direction {
  if (line.a[1] === line.b[1]) {
    return line.a[0] > line.b[0] ? 'W' : 'E';
  }
  return line.a[1] > line.b[1] ? 'N' : 'S';
}

export function addIteration(turns: boolean[]): boolean[] {
  const end = turns.map(t => !t).reverse();
  return [true, ...end];
}

export class Dragon {
  iterations: number;
  length: number;
  lastLine: LineSegment;
  path: Path2D;
  turns: boolean[];

  constructor(i: number, length: number, start: Point, firstDirection: Direction) {
    this.iterations = i;
    this.length = length;
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
      console.log({turns, newTurns})
      turns = turns.concat(newTurns);
    }
    return turns;
  }

  getEnd(start: Point, direction: Direction): Point {
    if (direction === "E") {
      return [start[0] + this.length, start[1]];
    } else if (direction === "W") {
      return [start[0] - this.length, start[1]];
    } else if (direction === "S") {
      return [start[0], start[1] + this.length];
    } else {
      return [start[0], start[1] - this.length];
    }
  }

  addLine(direction: Direction) {
    const end  = this.getEnd(this.lastLine.b, direction)
    this.path.lineTo(...end);
    this.lastLine = ({ a: this.lastLine.b, b: end })
  }

  getFullPath() {
    console.log(this.turns);
    for (let turn of this.turns) {
      const last = getDirection(this.lastLine);
      const currentTurn = turn ? 'right' : 'left';
      const next = this.nextDir[last][currentTurn];
      this.addLine(next);
    }
  }
}

export function drawDragon(
  ctx: CanvasRenderingContext2D,
  size: number,
  iterations: number,
) {

  const length = Math.floor(size/ ((10 * iterations)));
  const start: Point = [size/2, size/2];

  const dragon = new Dragon(iterations, length, start, 'N')
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx?.clearRect(0, 0, size, size);
  ctx.stroke(dragon.path);
}



// export function generate(
//   sq: CanvasRectangle,
//   iterations: number,
//   ctx: CanvasRenderingContext2D,
// ): void {
//   if (iterations === 1) { return };

//   const leftovers = divideSquare(sq, ctx)
//   leftovers.forEach(smallSquare => {
//     generate2d(smallSquare, iterations - 1, ctx)
//   })
// }
