import { CArray, cArr } from "../../../config/colours";
import { Point } from "../../../types";
import { CanvasFigure } from "../../Components/CanvasFigure/CanvasFigure";
import { findLineEnd, getQuadraticCurveParams } from "../../utils";

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

class Tree extends CanvasFigure{
  angle: number;
  lengthRatio: number;
  branchesNumber: number;
  colourStep: number;
  cpXDistRatio: number;
  cpYRatio: number;
  iterationFigures: Iteration[];

  constructor(
    ctx: CanvasRenderingContext2D,
    iterations: number,
    size: number,
    angle: number,
    lengthRatio: number,
    branchesNumber: number,
    cpXDistRatio: number,
    cpyRatio: number,
  ) {
    super(ctx, iterations, size)
    this.lengthRatio = lengthRatio;
    this.branchesNumber = branchesNumber;
    this.cpXDistRatio = cpXDistRatio;
    this.cpYRatio = cpyRatio;
    this.angle = Math.PI / 180 * angle;
    this.iterationFigures = [{ i: 0, paths: [] }];
    this.colourStep = this.getColourStep();
  }

  getColourStep() {
    // values based on aesthetics
    if (this.branchesNumber === 2) return 13;
    if (this.branchesNumber > 3) return 26;
    return 20;
  }

  drawTrunk(
  ): startBranch {
    const length = Math.floor(this.size * 0.4);
    const trunk = new Path2D()
    const start: Point = [this.size / 2, this.size  - 2];
    const end: Point = [this.size / 2, this.size - length - 2];
    trunk.moveTo(...start);
    trunk.lineTo(...end);
    this.iterationFigures[0].paths.push(trunk);
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

    const [x, y] = findLineEnd(oldBranch.end, angle, length);
    this.updateEdges([x, y]);
    if (position === "middle" || this.cpXDistRatio === 0) {
      branch.lineTo(x, y);
    } else {
      const [cPx, cPy, x, y] = getQuadraticCurveParams(
        oldBranch.end,
        angle,
        length,
        this.cpYRatio,
        this.cpXDistRatio,
        position
      );
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
    const lastIter = this.iterationFigures.length - 1;
    const newBranches = branches.map(b => this.addBranches(b)).flat();
    this.iterationFigures.push({ i: lastIter, paths: newBranches.map(b => b.path) });
    return newBranches;
  }

  draw(paths: Path2D[]) {
    paths.forEach(p => {
      this.ctx.stroke(p)
    });
  }

  drawAll(animate: boolean) {
    const startColour = changeColour(cArr.GREEN, 70);
    for (const iter of this.iterationFigures) {
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
  lRatio: number,
  size: number,
  animate: boolean,
  branchesNumber: number,
  curveRatio: number,
  curveDistanceRatio: number,
  ctx: CanvasRenderingContext2D,
): void {
  const tree = new Tree(
    ctx,
    iterations,
    size,
    angle,
    lRatio,
    branchesNumber,
    curveDistanceRatio,
    curveRatio
  );
  console.log(curveDistanceRatio, curveRatio)
  if (getMaxIterations(tree.branchesNumber) < iterations) return;
  const trunk = tree.drawTrunk()
  if (iterations === 0) return;
  let branches = [trunk];
  for (let i = 0; i < iterations; i++) {
    branches = tree.addIteration(branches);
  }
  const trans = tree.centreImageCoords();
  const scaleRatio = tree.scaleRatio()
  ctx.scale(scaleRatio, scaleRatio);
  ctx.translate(trans.x, trans.y);
  tree.drawAll(animate)
}

