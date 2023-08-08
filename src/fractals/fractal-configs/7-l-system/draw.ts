import { c } from "../../../config/colours";
import { DrawFuncArgs } from "../../../types";
import { generate } from "./algorithm";

type LSystemParameters = {
  iterations: number;
  angle: number;
  lRatio: number;
  animate: string;
  branches: number;
  curveRatio: number;
  curveDistanceRatio: number;
}


export function draw(
  args: DrawFuncArgs,
): void {
  const { canvas, size } = args;
  const parameters = args.parameters as LSystemParameters;
  const ctx = canvas.getContext("2d");
  canvas.style.background = "black";

  if (ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx?.clearRect(0, 0, size, size);
    ctx.lineWidth = 1;
    ctx.strokeStyle = c.GREEN;
    ctx.beginPath();
    const animate = parameters.animate === "on";
    generate(
      parameters.iterations,
      parameters.angle,
      parameters.lRatio,
      size,
      animate,
      parameters.branches,
      parameters.curveRatio,
      parameters.curveDistanceRatio,
      ctx,
    );
    ctx.closePath();
  }
}
