import { CArray, c, cArr } from "../../../config/colours";
import { Point } from "../../../types";

type startBranch = {
  end: Point,
  angle: number,
  length: number,
  path: Path2D,
}

function changeColour(rgb: CArray, change: number): CArray {
  rgb.forEach(c => {
    const newValue = c + change;
    if(newValue > 255 || newValue < 0) {
      return rgb;
    }
  });
  return rgb.map(v => v + change) as CArray;
}

class Tree {
  ctx: CanvasRenderingContext2D;
  angle: number;
  lengthRatio: number;
  size: number;
  iterations: Path2D[][]
  constructor(
    ctx: CanvasRenderingContext2D,
    angle: number,
    lengthRatio: number,
    size: number,
  ) {
    this.ctx = ctx;
    this.size = size;
    this.lengthRatio = lengthRatio;
    this.angle = Math.PI / 180 * angle;
    this.iterations = [[]]
  }

  getX(start: Point, angle: number, length: number): number {
    const width = Math.floor(Math.sin(angle) * length);
    return start[0] - width;
  }

  getY(start: Point, angle: number, length: number): number {
  const height = Math.floor(Math.cos(angle) * length);
  return start[1] - height;
  }

  drawTrunk(
  ): startBranch {
    const length = Math.floor(this.size / 6);
    const trunk = new Path2D()
    const start: Point = [this.size / 2, this.size - 2];
    const end: Point = [this.size / 2, this.size - 2 - length]
    trunk.moveTo(...start);
    trunk.lineTo(...end);
    this.ctx.stroke(trunk);
    this.iterations.push([trunk]);
    return { end, angle: 0, length, path: trunk};
  }

  addBranch(oldBranch: startBranch, angle: number): startBranch {
    const length = Math.floor(oldBranch.length * this.lengthRatio);
    const branch = new Path2D();
    branch.moveTo(...oldBranch.end);
    const x = this.getX(oldBranch.end, angle, length);
    const y = this.getY(oldBranch.end, angle, length);
    branch.lineTo(x, y);
    return { end: [x, y], angle, length, path: branch };
  }

  addBranches(branch: startBranch): startBranch[] {
    const b1 = this.addBranch(branch, branch.angle + this.angle);
    const b2 = this.addBranch(branch, branch.angle - this.angle);
    return [b1, b2];
  }

  addIteration(branches: startBranch[]) {
    const newBranches = branches.map(b => this.addBranches(b)).flat();
    this.iterations.push(newBranches.map(b=>b.path));
    // this.draw(newBranches.map(b => b.path));
    return newBranches;
  }

  draw(paths: Path2D[]){
    paths.forEach(p => {
      this.ctx.stroke(p)
    });
  }

  drawAll(){
    let colour = cArr.GREEN;
    colour = changeColour(colour, 70);

    this.iterations.forEach(i => {
      this.ctx.strokeStyle = `rgb(${colour})`;
      this.draw(i);
      colour = changeColour(colour, -13);
    })
  }
}

export function generate(
  iterations: number,
  size: number,
  ctx: CanvasRenderingContext2D,
): void {
  const tree = new Tree(ctx, 20, 0.8, size);
  const trunk = tree.drawTrunk()
  if (iterations === 0) return ;
  let branches = [trunk];
  for (let i = 0; i < iterations; i++ ) {
    branches = tree.addIteration(branches);
  }
  tree.drawAll()
}
