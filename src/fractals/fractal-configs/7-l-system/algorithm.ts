import { CArray, cArr } from "../../../config/colours";
import { Point } from "../../../types";

type startBranch = {
  end: Point,
  angle: number,
  length: number,
  path: Path2D,
}

type Iteration = {
  i: number,
  paths: Path2D[],
}

type BranchPosition = "left" | "right" | "middle";

function changeColour(rgb: CArray, change: number): CArray {
  rgb.forEach(c => {
    const newValue = c + change;
    if (newValue > 255 || newValue < 0) {
      return rgb;
    }
  });
  return rgb.map(v => v + change) as CArray;
}

export function getMaxIterations(branches: number) {
  if (branches < 3) return 16;
  if (branches < 4) return 12;
  return 8;
}

class Tree {
  ctx: CanvasRenderingContext2D;
  angle: number;
  lengthRatio: number;
  size: number;
  iterations: Iteration[];
  branchesNumber: number;
  colourStep: number;
  cpXDist: number;
  cpRatio: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    angle: number,
    lengthRatio: number,
    size: number,
    branchesNumber: number,
    cpXDist: number,
    cpRatio: number,
  ) {
    this.ctx = ctx;
    this.size = size;
    this.lengthRatio = lengthRatio;
    this.branchesNumber = branchesNumber;
    this.cpXDist = cpXDist;
    this.cpRatio = cpRatio;
    this.angle = Math.PI / 180 * angle;
    this.iterations = [{ i: 0, paths: [] }];
    this.colourStep = this.getColourStep();
  }

  offset(start: Point, length: number) {
    return {
      distance: Math.floor(length * this.cpRatio),
      point: [start[0], start[1] + this.cpXDist] as Point,
    }
  }

  getX(start: Point, angle: number, length: number): number {
    const width = Math.floor(Math.sin(angle) * length);
    return start[0] - width;
  }

  getY(start: Point, angle: number, length: number): number {
    const height = Math.floor(Math.cos(angle) * length);
    return start[1] - height;
  }

  getColourStep() {
    // based on what looks good in practice
    if (this.branchesNumber === 2) return 13;
    if (this.branchesNumber > 3) return 26;
    return 20;
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
    this.iterations[0].paths.push(trunk);
    return { end, angle: 0, length, path: trunk };
  }

  addBranch(
    oldBranch: startBranch,
    angle: number,
    position: BranchPosition
  ): startBranch {
    const length = Math.floor(oldBranch.length * this.lengthRatio);
    const branch = new Path2D();
    branch.moveTo(...oldBranch.end);

    const x = this.getX(oldBranch.end, angle, length);
    const y = this.getY(oldBranch.end, angle, length);
    if (position === "middle" || this.cpXDist === 0) {
      branch.lineTo(x, y);
    } else {

      const offset = this.offset(oldBranch.end, length);

      const offsetAngle = position === "left" ? angle : angle - this.angle;
      const cPx = this.getX(offset.point, offsetAngle, offset.distance);
      const cPy = this.getY(offset.point, offsetAngle, offset.distance)
      branch.quadraticCurveTo(cPx, cPy, x, y);
    }
    return { end: [x, y], angle, length, path: branch };
  }

  addBranches(branch: startBranch): startBranch[] {
    const branches = [];
    if (this.branchesNumber % 2 === 1) {
      const b0 = this.addBranch(branch, branch.angle, "middle");
      branches.push(b0);
    }
    const b1 = this.addBranch(branch, branch.angle + this.angle, "left");
    const b2 = this.addBranch(branch, branch.angle - this.angle, "right");
    branches.push(b1, b2);
    if (this.branchesNumber > 3) {
      const b3 = this.addBranch(branch, branch.angle + 2 * this.angle, "left");
      const b4 = this.addBranch(branch, branch.angle - 2 * this.angle, "right");
      branches.push(b3, b4);
    }
    return branches;
  }

  addIteration(branches: startBranch[]) {
    const lastIter = this.iterations.length - 1;
    const newBranches = branches.map(b => this.addBranches(b)).flat();
    this.iterations.push({ i: lastIter, paths: newBranches.map(b => b.path) });
    return newBranches;
  }

  draw(paths: Path2D[]) {
    paths.forEach(p => {
      this.ctx.stroke(p)
    });
  }

  drawAll(animate: boolean) {
    const startColour = changeColour(cArr.GREEN, 70);
    for (const iter of this.iterations) {
      setTimeout(() => {
        const colour = changeColour(startColour, -this.colourStep * iter.i);
        this.ctx.strokeStyle = `rgb(${colour})`;
        this.draw(iter.paths);
      }, animate ? iter.i * 100 : 0
      )
    };
  }
}

export function generate(
  iterations: number,
  angle: number,
  size: number,
  animate: boolean,
  branchesNumber: number,
  ctx: CanvasRenderingContext2D,
): void {
  const tree = new Tree(ctx, angle, 0.8, size, branchesNumber, 5, 0.25);
  if (getMaxIterations(tree.branchesNumber) < iterations) return;
  const trunk = tree.drawTrunk()
  if (iterations === 0) return;
  let branches = [trunk];
  for (let i = 0; i < iterations; i++) {
    branches = tree.addIteration(branches);
  }
  tree.drawAll(animate)
}
